import React, { useEffect, useState } from 'react';
import { getMyFeedback } from '../services/api';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    getMyFeedback(token).then((res) => setFeedbacks(res.data));
  }, []);

  return (
    <div>
      <h2>Your Feedback</h2>
      <ul>
        {feedbacks.map((fb: any) => (
          <li key={fb.id}>
            <b>{fb.category}</b>: {fb.text} (Sentiment: {fb.sentiment})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackList;
