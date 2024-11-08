import React, { useState } from 'react';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import '../App.css';
import axios from 'axios';



const ScheduleInterview = () => {
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
      console.log('Response:', response.data);
    } catch (error) {
      alert('Error scheduling interview');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
        <div className="dashboard-container">
      {/* Top Navbar */}
        <div className="app-header">
      <TopNavbar />
      </div>

      {/* Sidebar and Content */}
      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="content-area">
         <div className="flex justify-center items-center  h-screen">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        {/* Left Section (Form) */}
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl bg-white">
          <div className="flex">
            <h1 className="font-bold uppercase text-5xl text-black">Schedule an Interview</h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Interview Title*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="interviewerName"
              value={formData.interviewerName}
              onChange={handleChange}
              placeholder="Candidate Name*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              name="interviewerEmail"
              value={formData.interviewerEmail}
              onChange={handleChange}
              placeholder="Candidate Email*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="intervieweesName"
              value={formData.intervieweesName.join(', ')}
              onChange={handleIntervieweesNameChange}
              placeholder="Interviewer(s)*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="skillset"
              value={formData.skillset}
              onChange={handleChange}
              placeholder="Skillset (e.g., JavaScript, React)*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (in minutes)*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Interview Date*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Interview Time*"
              required
            />

            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department*"
              required
            />

            <select
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
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

          <div className="my-4">
            <textarea
              placeholder="Additional Notes"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              onClick={handleSubmit}
              className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
            >
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Right Section (Sidebar) */}
   <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
  <div className="flex flex-col text-white">
    <h1 className="font-bold uppercase text-4xl my-4">Help in Scheduling</h1>
    <p className="text-gray-400">
      To arrange an interview or for further assistance, please contact our scheduling team at our office or by phone.
    </p>

    <div className="flex my-4 w-2/3 lg:w-1/2">
      <div className="flex flex-col">
        <i className="fas fa-map-marker-alt pt-2 pr-2"></i>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl">Scheduling Office</h2>
        <p className="text-gray-400">1234 Interview St, Interview City, IC 12345</p>
      </div>
    </div>

    <div className="flex my-4 w-2/3 lg:w-1/2">
      <div className="flex flex-col">
        <i className="fas fa-phone-alt pt-2 pr-2"></i>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl">Contact Us</h2>
        <p className="text-gray-400">Tel: 111-222-3333</p>
        <p className="text-gray-400">Fax: 111-222-3334</p>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
        </div>
      </div>
    </div>
  
  );
};

export default ScheduleInterview;
