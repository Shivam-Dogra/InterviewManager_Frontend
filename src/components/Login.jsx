import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import interviewAnimation from '../assets/interview_image1.json'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      alert('Login Successful!');
      console.log(response.data);
    } catch (error) {
      alert('Login Failed!');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Interview Manager</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-btn" type="submit">Login</button>
        </form>
        <p className="sign-up-link">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
      <div className="login-right">
        <Player
          autoplay
          loop
          src={interviewAnimation}
          style={{ height: '400px', width: '500px' }}
        />
      </div>
    </div>
  );
};

export default Login;
