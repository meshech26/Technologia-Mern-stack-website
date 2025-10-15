import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect target from location state (if any)
  const redirectTo = location.state?.redirectTo || '/repair';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token); // ✅ Store token
      alert('Login successful!');
      navigate(redirectTo); // ✅ Go to intended page
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>

  );
};

export default Login;