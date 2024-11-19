import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../App.css'; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import interviewAnimation from '../assets/interview_image1.json'; 
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });
      message.success('Login Successfull!', 2);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.name);
      navigate('/'); 

    } catch (error) {
      console.error('Login error:', error);
      Modal.error({
        title: 'Incorrect email or password!',
        icon: <ExclamationCircleOutlined />,
        content: error.response ? error.response.data : error.message,
        okText: 'Close',
      });
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
              style={{ width: "400px", fontSize: "16px"}}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
              required
            />
          </div>
          <button className="login-btn" type="submit"  style={{ width: "430px", fontSize: "16px" }}>Login</button>
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
          style={{ height: '500px', width: '600px', marginRight: '-100px' }}
        />
      </div>
    </div>
  );
};

export default Login;
