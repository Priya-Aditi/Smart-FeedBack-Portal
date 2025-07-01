using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartFeedback.API.Data;
using SmartFeedback.API.DTOs;
using SmartFeedback.API.Models;
using System.Security.Claims;

namespace SmartFeedback.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public FeedbackController(AppDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST: api/feedback
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SubmitFeedback(FeedbackDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var feedback = new Feedback
            {
                UserId = userId!,
                Category = dto.Category,
                Message = dto.Message,
                Sentiment = "Pending",
                SentimentScore = 0
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback submitted." });
        }

        // GET: api/feedback/my
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyFeedback()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var feedbacks = await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.SubmittedAt)
                .ToListAsync();

            return Ok(feedbacks);
        }

        // DELETE: api/feedback/3
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var feedback = await _context.Feedbacks.FindAsync(id);

            if (feedback == null || feedback.UserId != userId)
                return NotFound("Feedback not found or access denied.");

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Feedback deleted." });
        }

        // GET: api/feedback (ADMIN ONLY)
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllFeedback()
        {
            var all = await _context.Feedbacks.Include(f => f.User).ToListAsync();
            return Ok(all);
        }
    }
}
