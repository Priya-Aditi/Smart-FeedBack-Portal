import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const FeedbackForm = () => {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const token = localStorage.getItem('token') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitFeedback({ category, text }, token);
    alert('Feedback submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your feedback" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
