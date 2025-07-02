import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ userName, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      res.data.role === 'Admin' ? navigate('/dashboard') : navigate('/feedback');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
