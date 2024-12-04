import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 
import { Player } from '@lottiefiles/react-lottie-player'; 
import interviewAnimation from '../assets/interview_image1.json'; 
import { useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


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
      message.success('Registered Successfully!', 3);
      console.log(response.data);
      navigate('/login'); 
      
    } catch (error) {
      console.error('Registration error:', error);
      Modal.error({
        title: 'Failed to Register',
        icon: <ExclamationCircleOutlined />,
        content: error.response ? error.response.data : error.message,
        okText: 'Close',
      });
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
  <label htmlFor="department-select" style={{ marginBottom: "5px", display: "block" }}>
    Department
  </label>
  <select
    id="department-select"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    style={{
      width: "400px", // Full width
      fontSize: "16px", // Standard font size for inputs
      marginBottom: "2px", // Space below the element
      padding: "12px", // Consistent padding
      backgroundColor: "#f5f5f5", // Light cream background for inputs
      color: "#333333", // Darker text color for contrast
      border: "1px solid #ccc", // Subtle border
      borderRadius: "5px", // Rounded corners for better aesthetics
      height: "50px"
    }}
    
  >
    <option value="">Select</option>
    <option value="Human Resources">Human Resources</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Marketing">Marketing</option>
    <option value="Accounts">Accounts</option>
    <option value="Engineering">Engineering</option>
  </select>
</div>

          <button className="login-btn" type="submit"  style={{ width: "400px", fontSize: "16px" }}>Register</button>
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
          style={{ height: '500px', width: '600px', marginRight: '-100px' }}
        />
      </div>
    </div>
  );
};

export default Register;
