import React, { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import '../App.css';
import axios from 'axios';



const ScheduleInterview = () => {
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    interviewerName: '',
    interviewerEmail: '',
    intervieweesName: [],
    skillset: '',
    duration: 0,
    date: '',
    time: '',
    notes: '',
    department: '',
    signedUp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {    
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);

  });

  const handleIntervieweesNameChange = (e) => {
    const value = e.target.value;
    const intervieweesArray = value.split(',').map((name) => name.trim());
    setFormData({
      ...formData,
      intervieweesName: intervieweesArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/api/interview/schedule', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Interview Scheduled Successfully!');
    } catch (error) {
      alert('Error scheduling interview');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <div className="app-header">
        <TopNavbar username={username} />
      </div>
  
      {/* Sidebar and Content */}
      <div className="main-content flex">
        {/* Sidebar */}
        <Sidebar />
  
        {/* Main Content Area */}
        <div className="content-area flex justify-center items-center w-full h-screen bg-gray-100">
          <div className="container mx-auto my-4 px-4 lg:px-20">
            {/* Left Section (Form) */}
            <div className="w-full p-8 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mx-auto rounded-2xl shadow-2xl bg-white relative" style={{ top: '-50px' }}>
              <h1 className="font-bold uppercase text-5xl text-black mb-6">Schedule Interview</h1>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Interview Title*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="interviewerName"
                  value={formData.interviewerName}
                  onChange={handleChange}
                  placeholder="Candidate Name*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="email"
                  name="interviewerEmail"
                  value={formData.interviewerEmail}
                  onChange={handleChange}
                  placeholder="Candidate Email*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="intervieweesName"
                  value={formData.intervieweesName.join(', ')}
                  onChange={handleIntervieweesNameChange}
                  placeholder="Interviewer(s)*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="skillset"
                  value={formData.skillset}
                  onChange={handleChange}
                  placeholder="Skillset (e.g., JavaScript, React)*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration (in minutes)*"
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
  
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
  
  <select
  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
  name="department"
  value={formData.department}
  onChange={handleChange}
  required
>
  <option value="" disabled>
    Select Department
  </option>
  <option value="Human Resources">Human Resources</option>
  <option value="Information Technology">Information Technology</option>
  <option value="Marketing">Marketing</option>
  <option value="Accounts">Accounts</option>
  <option value="Engineering">Engineering</option>
</select>
  
                <select
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  name="signedUp"
                  value={formData.signedUp}
                  onChange={handleChange}
                  required
                >
                  <option value="">Anyone Signed Up?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
  
              <textarea
                placeholder="Additional Notes"
                className="w-full h-32 bg-gray-100 text-gray-900 p-3 mt-4 rounded-lg focus:outline-none focus:shadow-outline"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
  
              <div className="mt-6 w-1/2 lg:w-1/4">
                <button
                  onClick={handleSubmit}
                  className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:bg-blue-800 transition duration-200"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ScheduleInterview;
