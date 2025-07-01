using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SmartFeedback.API.Models
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Message { get; set; }

        public string? ImagePath { get; set; }  // For now keep null

        public string Sentiment { get; set; } = "Pending";
        public double SentimentScore { get; set; } = 0.0;

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

        // Foreign Key
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public IdentityUser? User { get; set; }
    }
}
