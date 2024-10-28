import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import Filter from './Filter';
import '../App.css';

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [expandedTile, setExpandedTile] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({});
  const [username, setUsername] = useState('');

  const filterInterviews = async (filters = {}) => {
    const token = localStorage.getItem('token');
    try {
      const queryParts = [];
      if (filters.date) queryParts.push(`date=${filters.date}`);
      if (filters.department) queryParts.push(`department=${filters.department}`);
      if (filters.signedUp) queryParts.push(`signedUp=${filters.signedUp}`);
  
      const query = queryParts.length ? `?${queryParts.join('&')}` : '';
      
      const response = await axios.get(`http://localhost:3000/api/interview/search${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setInterviews(response.data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);

      try {
        const response = await axios.get('http://localhost:3000/api/interview/interviews', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };
    fetchInterviews();
  }, []);

  const toggleTile = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  const toggleEditMode = (id) => {
    if (editMode === id) {
      setEditMode(null);
    } else {
      const interviewToEdit = interviews.find((interview) => interview._id === id);
      setFormData({
        title: interviewToEdit.title,
        interviewerName: interviewToEdit.interviewerName,
        interviewerEmail: interviewToEdit.interviewerEmail,
        intervieweesName: interviewToEdit.intervieweesName,
        skillset: interviewToEdit.skillset.join(', ') || '', // Join for input
        duration: interviewToEdit.duration,
        date: new Date(interviewToEdit.date).toISOString().split('T')[0], // Format date for input
        time: interviewToEdit.time,
        notes: interviewToEdit.notes,
        department: interviewToEdit.department,
        signedUp: interviewToEdit.signedUp,
      });
      setEditMode(id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "skillset") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value.split(',').map((skill) => skill.trim()), // Convert to array
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSave = async (id, e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:3000/api/interview/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Updated interview data:', response.data);
      
      // Reload the page after successful update
      window.location.reload();
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Error updating interview');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm("Are you sure you want to delete this interview?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/interview/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Interview deleted successfully');
        window.location.reload(); // Reload the page after deletion
      } catch (error) {
        console.error('Error deleting interview:', error);
        alert('Error deleting interview');
      }
    }
  };


  return (
    <div className="dashboard-container">
      <TopNavbar username={username} />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h3>🔥 All Interviews, Your Way! Filter & Discover!</h3>
          <Filter applyFilters={filterInterviews} />

          <div className="interview-list">
            {interviews.map((interview) => (
              <div key={interview._id} className="interview-tile">
                <div className="interview-summary">
                  <h4>{interview.title}</h4>
                  <h4 style={{ color: interview.signedUp ? 'green' : 'red' }}>
                    Signed Up: {interview.signedUp ? 'Yes' : 'No'}
                  </h4>
                  <p>Candidate: {interview.interviewerName}</p>
                  <p>Interviewer: {interview.intervieweesName}</p>
                  <button
                    className="view-more-btn"
                    onClick={() => toggleTile(interview._id)}
                  >
                    {expandedTile === interview._id ? 'Hide Details' : 'View More'}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => toggleEditMode(interview._id)}
                  >
                    {editMode === interview._id ? 'Cancel Edit' : 'Edit'}
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleDelete(interview._id)}
                  >
                    Delete
                  </button>
                </div>

                {expandedTile === interview._id && (
                  <div className="interview-details">
                    {editMode === interview._id ? (
                      // Edit Mode: Render form fields
                      <form onSubmit={(e) => handleSave(interview._id, e)}>
                        <div className="edit-form">
                          <div className="form-group">
                            <label>Title</label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Candidate Name</label>
                            <input
                              type="text"
                              name="interviewerName"
                              value={formData.interviewerName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Candidate Email</label>
                            <input
                              type="email"
                              name="interviewerEmail"
                              value={formData.interviewerEmail}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Interviewer</label>
                            <input
                              type="text"
                              name="intervieweesName"
                              value={formData.intervieweesName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Skillset</label>
                            <input
                              type="text"
                              name="skillset"
                              value={formData.skillset}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Duration (minutes)</label>
                            <input
                              type="number"
                              name="duration"
                              value={formData.duration}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Date</label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Time</label>
                            <input
                              type="text"
                              name="time"
                              value={formData.time}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Notes</label>
                            <input
                              type="text"
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Department</label>
                            <input
                              type="text"
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Anyone Signed Up for this interview?</label>
                            <select
                              name="signedUp"
                              value={formData.signedUp}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                          <button className="save-btn" type="submit">
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      // View Mode: Render details
                      <>
                        <p><strong>Skillset:</strong> {interview.skillset.join(', ')}</p>
                        <p><strong>Duration:</strong> {interview.duration} minutes</p>
                        <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {interview.time}</p>
                        <p><strong>Notes:</strong> {interview.notes}</p>
                        <p><strong>Department:</strong> {interview.department}</p>
                        <p><strong>Signed Up:</strong> {interview.signedUp ? 'Yes' : 'No'}</p>
                        <p><strong>Completion Status:</strong> {interview.completionStatus ? 'Completed' : 'Pending'}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
