import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import '../App.css';

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]); // State for all interviews
  const [expandedTile, setExpandedTile] = useState(null); // State to track expanded tiles
  const [editMode, setEditMode] = useState(null); // State to track which tile is in edit mode
  const [formData, setFormData] = useState({}); // State for form data for editing

  // Fetch interviews on component mount
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/interview/interviews');
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };
    fetchInterviews();
  }, []);

  // Toggle between expanding/collapsing the tile
  const toggleTile = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  // Toggle between view and edit mode
  const toggleEditMode = (id) => {
    if (editMode === id) {
      setEditMode(null); // Exit edit mode
    } else {
      const interviewToEdit = interviews.find((interview) => interview._id === id);
      setFormData(interviewToEdit); // Set form data to the selected interview
      setEditMode(id); // Enter edit mode
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Save updated interview data
  const handleSave = async (id) => {
    try {
      // Send updated interview data to the backend
      const response = await axios.put(`http://localhost:3000/api/interview/update/${id}`, formData);
      
      // Notify user of successful update
      alert('Interview Updated Successfully');
      
      // Update the interviews array with the new updated data
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview._id === id ? response.data : interview
        )
      );

      // Exit edit mode after saving
      setEditMode(null);
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Error updating interview');
    }
  };

  return (
    <div className="dashboard-container">
      <TopNavbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h3>See all interviews..</h3>

          <div className="interview-list">
            {interviews.map((interview) => (
              <div key={interview._id} className="interview-tile">
                <div className="interview-summary">
                  <h4>{interview.title}</h4>
                  <h4 style={{ color: interview.signedUp ? 'green' : 'red' }}>
                    Signed Up: {interview.signedUp ? 'Yes' : 'No'}
                  </h4>
                  <p>Candidate: {interview.interviewerName}</p>
                  <p>Interviewer: {interview.interviewees.length}</p>
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
                </div>

                {expandedTile === interview._id && (
                  <div className="interview-details">
                    {editMode === interview._id ? (
                      // Edit Mode: Render form fields
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
                          <label>Interviewer Name</label>
                          <input
                            type="text"
                            name="interviewerName"
                            value={formData.interviewerName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Skillset</label>
                          <input
                            type="text"
                            name="skillset"
                            value={formData.skillset.join(', ')}
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
                            value={new Date(formData.date).toISOString().split('T')[0]}
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
                        <button className="save-btn" onClick={() => handleSave(interview._id)}>
                          Save
                        </button>
                      </div>
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
