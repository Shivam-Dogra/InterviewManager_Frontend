import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Past = () => {
  const [interviews, setInterviews] = useState([]);
  const [expandedTile, setExpandedTile] = useState(null);
  const navigate = useNavigate();

  // Fetch interviews on component mount
  useEffect(() => {
    const fetchInterviews = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage
      try {
        const response = await axios.get('http://localhost:3000/api/interview/past', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };
    fetchInterviews();
  }, []);

  // Insert the current date in the specified element
  const insertCurrentDate = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      element.textContent = today;
    }
  };

  // Use useEffect to call insertCurrentDate on mount
  useEffect(() => {
    insertCurrentDate('dynamic-date');
  }, []);

  // Toggle display of additional interview details
  const toggleTile = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  return (
    <div className="dashboard-container">
      <TopNavbar />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <h2 style={{ color: 'black', textAlign: 'center' }}>⏳ Past Interviews Before <span id="dynamic-date" style={{ fontFamily: 'Bungee Tint', fontSize: '1.5rem' }}></span></h2>
          <div className="interview-list">
            {interviews.map((interview) => (
              <div key={interview._id} className="interview-tile">
                <div className="interview-summary">
                  <h4>
                    {interview.title}
                    <span style={{ marginLeft: '10px', color: 'gray' }}>
                      ({new Date(interview.date).toLocaleDateString('en-GB')})
                    </span>
                  </h4>
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
                </div>
                
                {expandedTile === interview._id && (
                  <div className="interview-details">
                    <p><strong>Skillset:</strong> {interview.skillset.join(', ')}</p>
                    <p><strong>Duration:</strong> {interview.duration} minutes</p>
                    <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {interview.time}</p>
                    <p><strong>Notes:</strong> {interview.notes}</p>
                    <p><strong>Department:</strong> {interview.department}</p>
                    <p><strong>Signed Up:</strong> {interview.signedUp ? 'Yes' : 'No'}</p>
                    <p><strong>Completion Status:</strong> {'Completed'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Past;
