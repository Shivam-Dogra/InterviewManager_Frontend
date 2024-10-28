import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import interviewAnimation from '../assets/interview_image1.json'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
        picture,
        position,
        department,
      });
      alert('Registration Successful!');
      console.log(response.data);
      navigate('/'); 
      
    } catch (error) {
      alert('Registration Failed!');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
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
          <div className="input-group">
            <label>Profile Picture URL</label>
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
            />
          </div>
          <div className="input-group">
            <label>Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
              required
            />
          </div>
          <div className="input-group">
            <label>Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ width: "400px", fontSize: "16px" }}
              required
            />
          </div>
          <button className="login-btn" type="submit"  style={{ width: "430px", fontSize: "16px" }}>Register</button>
        </form>
        <p className="sign-up-link">
          Already have an account? <a href="/login">Login</a>
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

export default Register;
