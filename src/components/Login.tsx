import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/Api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      setMessage('Login successful');
      navigate('/points');
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Codigo Point</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <a href="#" onClick={() => navigate('/register')}>Register here</a>
      </p>
    </div>
  );
};

export default Login;
