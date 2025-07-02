import React, { useEffect, useState } from 'react';
import { getAllFeedback } from '../services/api';

const Dashboard = () => {
  const [allFeedback, setAllFeedback] = useState([]);
  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    getAllFeedback(token).then((res) => setAllFeedback(res.data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {allFeedback.map((fb: any) => (
          <li key={fb.id}>
            <b>{fb.category}</b> | {fb.text} | <i>{fb.sentiment}</i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
