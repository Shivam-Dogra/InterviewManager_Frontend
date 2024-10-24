import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import '../App.css';
import axios from 'axios';

const ScheduleInterview = () => {
  // State for form fields
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
    signedUp: true,
    completionStatus: false
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle intervieweesName input change (comma-separated to array)
  const handleIntervieweesNameChange = (e) => {
    const value = e.target.value;
    const intervieweesArray = value.split(',').map(name => name.trim()); // Convert to array of strings
    setFormData({
      ...formData,
      intervieweesName: intervieweesArray
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data
      const response = await axios.post('http://localhost:3000/api/interview/schedule', formData);
      alert('Interview Scheduled Successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      alert('Error scheduling interview');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navbar */}
      <TopNavbar />

      {/* Sidebar and Content */}
      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="content-area">
          <h3>Schedule Interview</h3>

          {/* Schedule Interview Form */}
          <form className="schedule-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Interview Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interviewerName">Interviewer Name</label>
              <input
                type="text"
                name="interviewerName"
                value={formData.interviewerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="interviewerEmail">Interviewer Email</label>
              <input
                type="email"
                name="interviewerEmail"
                value={formData.interviewerEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="intervieweesName">Interviewees (comma-separated)</label>
              <input
                type="text"
                name="intervieweesName"
                value={formData.intervieweesName.join(', ')} // Display as comma-separated string
                onChange={handleIntervieweesNameChange}
                placeholder="Enter names separated by commas"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skillset">Skillset (comma-separated)</label>
              <input
                type="text"
                name="skillset"
                value={formData.skillset}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (in minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Interview Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Interview Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Schedule Interview</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterview;
