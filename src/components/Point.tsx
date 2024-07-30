import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import api from '../services/Api';

interface Point {
  id: number;
  startTime: string;
  endTime: string;
  lunchStartTime: string | null;
  lunchEndTime: string | null;
}

const Points: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Usando useNavigate

  const fetchPoints = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obter o ID do usuário autenticado
      const response = await api.get(`/points/shifts/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPoints(response.data);
    } catch (error) {
      setMessage('Failed to fetch points');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleStartShift = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obter o ID do usuário autenticado
      await api.post('/points/start-shift', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Shift started successfully');
      fetchPoints();
    } catch (error) {
      setMessage('Failed to start shift');
    }
  };

  const handleEndShift = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obter o ID do usuário autenticado
      await api.post('/points/end-shift', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Shift ended successfully');
      fetchPoints();
    } catch (error) {
      setMessage('Failed to end shift');
    }
  };

  const handleStartLunch = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obter o ID do usuário autenticado
      await api.post('/points/start-lunch', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Lunch started successfully');
      fetchPoints();
    } catch (error) {
      setMessage('Failed to start lunch');
    }
  };

  const handleEndLunch = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // Obter o ID do usuário autenticado
      await api.post('/points/end-lunch', { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Lunch ended successfully');
      fetchPoints();
    } catch (error) {
      setMessage('Failed to end lunch');
    }
  };

  const calculateHoursWorked = (point: Point) => {
    if (!point.startTime || !point.endTime) return 0;
    
    const start = new Date(point.startTime).getTime();
    const end = new Date(point.endTime).getTime();
    
    return (end - start) / (1000 * 60 * 60);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div>
      <h2>Points</h2>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <button onClick={handleStartShift}>Start Shift</button>
      <button onClick={handleEndShift}>End Shift</button>
      <button onClick={handleStartLunch}>Start Lunch</button>
      <button onClick={handleEndLunch}>End Lunch</button>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        {points.map((point) => (
          <li key={point.id}>
            {new Date(point.startTime).toLocaleString('pt-BR')} - {new Date(point.endTime).toLocaleString('pt-BR')}
            <br />
            Lunch: {point.lunchStartTime ? new Date(point.lunchStartTime).toLocaleString('pt-BR') : 'Not started'} - {point.lunchEndTime ? new Date(point.lunchEndTime).toLocaleString('pt-BR') : 'Not ended'}
            <br />
            Hours Worked: {calculateHoursWorked(point).toFixed(2)} hours
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Points;
