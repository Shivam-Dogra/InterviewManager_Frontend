// import TopNavbar from './TopNavbar';
// import Sidebar from './Slidebar';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Past = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [expandedTile, setExpandedTile] = useState(null);
//   const navigate = useNavigate();

//   // Fetch interviews on component mount
//   useEffect(() => {
//     const fetchInterviews = async () => {
//       const token = localStorage.getItem('token'); // Get the token from local storage
//       try {
//         const response = await axios.get('http://localhost:3000/api/interview/past', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add the Authorization header
//           },
//         });
//         setInterviews(response.data);
//       } catch (error) {
//         console.error('Error fetching interviews:', error);
//       }
//     };
//     fetchInterviews();
//   }, []);

//   // Insert the current date in the specified element
//   const insertCurrentDate = (elementId) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       const today = new Date().toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//       element.textContent = today;
//     }
//   };

//   // Use useEffect to call insertCurrentDate on mount
//   useEffect(() => {
//     insertCurrentDate('dynamic-date');
//   }, []);

//   // Toggle display of additional interview details
//   const toggleTile = (id) => {
//     setExpandedTile(expandedTile === id ? null : id);
//   };

//   return (
//     <div className="dashboard-container">
//       <TopNavbar />
//       <div className="main-content">
//         <Sidebar />
//         <div className="content-area">
//           <h2 style={{ color: 'black', textAlign: 'center' }}>⏳ Past Interviews Before <span id="dynamic-date" style={{ fontFamily: 'Bungee Tint', fontSize: '1.5rem' }}></span></h2>
//           <div className="interview-list">
//             {interviews.map((interview) => (
//               <div key={interview._id} className="interview-tile">
//                 <div className="interview-summary">
//                   <h4>
//                     {interview.title}
//                     <span style={{ marginLeft: '10px', color: 'gray' }}>
//                       ({new Date(interview.date).toLocaleDateString('en-GB')})
//                     </span>
//                   </h4>
//                   <h4 style={{ color: interview.signedUp ? 'green' : 'red' }}>
//                     Signed Up: {interview.signedUp ? 'Yes' : 'No'}
//                   </h4>
//                   <p>Candidate: {interview.interviewerName}</p>
//                   <p>Interviewer: {interview.intervieweesName}</p>
//                   <button
//                     className="view-more-btn"
//                     onClick={() => toggleTile(interview._id)}
//                   >
//                     {expandedTile === interview._id ? 'Hide Details' : 'View More'}
//                   </button>
//                 </div>
                
//                 {expandedTile === interview._id && (
//                   <div className="interview-details">
//                     <p><strong>Skillset:</strong> {interview.skillset.join(', ')}</p>
//                     <p><strong>Duration:</strong> {interview.duration} minutes</p>
//                     <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
//                     <p><strong>Time:</strong> {interview.time}</p>
//                     <p><strong>Notes:</strong> {interview.notes}</p>
//                     <p><strong>Department:</strong> {interview.department}</p>
//                     <p><strong>Signed Up:</strong> {interview.signedUp ? 'Yes' : 'No'}</p>
//                     <p><strong>Completion Status:</strong> {'Completed'}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Past;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavbar from './TopNavbar';
import Sidebar from './Slidebar';
import '../App.css';

const Past = () => {
  const [projectData, setProjectData] = useState([]);
  const [username, setUsername] = useState('');
  const [filters, setFilters] = useState({
    date: '',
    department: '',
    signedUp: ''
  });



  useEffect(() => {
    const modeSwitch = document.querySelector('.mode-switch');
    const listView = document.querySelector('.list-view');
    const gridView = document.querySelector('.grid-view');
    const projectsList = document.querySelector('.project-boxes');
    const messagesBtn = document.querySelector('.messages-btn');
    const messagesClose = document.querySelector('.messages-close');

    const toggleDarkMode = () => {
      document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    };

    const activateListView = () => {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    };

    const activateGridView = () => {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    };

    const showMessages = () => {
      document.querySelector('.messages-section').classList.add('show');
    };

    const closeMessages = () => {
      document.querySelector('.messages-section').classList.remove('show');
    };

    if (modeSwitch) modeSwitch.addEventListener('click', toggleDarkMode);
    if (listView && gridView && projectsList) {
      listView.addEventListener('click', activateListView);
      gridView.addEventListener('click', activateGridView);
    }
    if (messagesBtn && messagesClose) {
      messagesBtn.addEventListener('click', showMessages);
      messagesClose.addEventListener('click', closeMessages);
    }

    return () => {
      if (modeSwitch) modeSwitch.removeEventListener('click', toggleDarkMode);
      if (listView) listView.removeEventListener('click', activateListView);
      if (gridView) gridView.removeEventListener('click', activateGridView);
      if (messagesBtn) messagesBtn.removeEventListener('click', showMessages);
      if (messagesClose) messagesClose.removeEventListener('click', closeMessages);
    };
  }, []);

  useEffect(() => {
    const fetchInterviews = async () => {
      const token = localStorage.getItem('token');
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername);

      try {
        const response = await axios.get('http://localhost:3000/api/interview/past', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Transform the response data to match the projectData format
        const transformedData = response.data.map((interview) => ({
          date: formatDate(new Date(interview.date)),
          name: interview.title,
          type: interview.department,
          progress: interview.signedUp ? 100 : 0,
          progressColor: interview.signedUp ? '#28a745' : '#ff4b5c',
          participants: interview.intervieweesName,
          daysLeft: calculateDaysLeft(interview.date),
          skillset: interview.skillset,
          time: interview.time,
          duration: interview.duration,
          _id: interview._id,
        }));

        setProjectData(transformedData);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const calculateDaysLeft = (date) => {
    const interviewDate = new Date(date);
    const today = new Date();
    const differenceInTime = interviewDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  const filteredData = projectData.filter((project) => {
    const matchesDate = filters.date ? project.date === formatDate(new Date(filters.date)) : true;
    const matchesDepartment = filters.department ? project.type.includes(filters.department) : true;
    const matchesSignedUp = filters.signedUp ? (filters.signedUp === 'yes' ? project.progress === 100 : project.progress < 100) : true;

    return matchesDate && matchesDepartment && matchesSignedUp;
  });

  return (
<div className="app-container">
  <div className="app-header">
    <TopNavbar username={username} />
  </div>
  <div className="app-content">
    <Sidebar />
    <div className="projects-section">
      <div className="filtercontainer">
        <div className="search-wrapper">
          <input
            type="date"
            className="search-input"
            placeholder="Filter by Date"
            value={filters.date}
            max={new Date().toISOString().split("T")[0]}  // Restrict to past dates
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Filter by Department"
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
          />
        </div>
        <div className="search-wrapper">
          <select
            className="search-input"
            value={filters.signedUp}
            onChange={(e) => setFilters({ ...filters, signedUp: e.target.value })}
          >
            <option value="">Signed Up</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <div className="project-boxes jsGridView">
        {filteredData.map((project, index) => (
          <ProjectBox key={project._id} project={project} index={index} />
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

const ProjectBox = ({ project, index }) => {
  const colors = ['#fee4cb', '#e9e7fd', '#ffd3e2', '#c8f7dc', '#d5deff'];
  const backgroundColor = colors[index % colors.length];
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [formData, setFormData] = useState({});

  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const openEditPopup = () => {
    setFormData({ ...project });
    setShowEditPopup(true);
    setShowDropdown(false);
  };

  const openViewPopup = () => {
    setFormData({ ...project });
    setShowViewPopup(true);
    setShowDropdown(false);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
  };

  const closeViewPopup = () => {
    setShowViewPopup(false);
  };

  const handleSave = async (updatedFormData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://localhost:3000/api/interview/update/${updatedFormData._id}`, updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Updated interview data:', response.data);
      setShowEditPopup(false);
    } catch (error) {
      console.error('Error updating interview:', error);
      alert('Error updating interview');
    }
  };

  return (
    <div className="project-box-wrapper">
      <div className="project-box" style={{ backgroundColor }}>
        <div className="project-box-header">
          <span>{project.date}</span>
          <div className="more-wrapper">
            <span>{project.time}</span>
          </div>
        </div>
        <div className="project-box-content-header">
          <p className="box-content-header">{project.name}</p>
          <p className="box-content-subheader">{project.type}</p>
        </div>
        <div className="skillset-container">
          {project.skillset && project.skillset.length > 0 && project.skillset[0].split(',').map((skill, idx) => (
            <div key={idx} className="skillset-box">{skill.trim()}</div>
          ))}
        </div>
        <div className="project-box-footer">
          <div className="days-left" style={{ color: project.progressColor }}>
            {project.daysLeft} Days Left
          </div>
          <div className="participants">
            {project.participants && project.participants.map((name, idx) => {
              // Check if name is not undefined or null
  if (name) {
    const initials = name.split(' ').map(word => word[0].toUpperCase()).join('');
    return (
      <div key={idx} className="participant-avatar">
        <span className="initials">{initials}</span>
      </div>
    );
  } else {
    return null;  // Return nothing if name is undefined or null
  }
            })}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className="add-participant"
                style={{ color: '#df3670' }}
                onClick={handleButtonClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </button>
              {showDropdown && (
                <div
                  className="dropdown-menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: -60,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    padding: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className="dropdown-item" onClick={openViewPopup} style={{ cursor: 'pointer' }}>
                    View
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showViewPopup && <ViewPopup project={formData} onClose={closeViewPopup} />}
      {showEditPopup && (
        <EditFormPopup
          formData={formData}
          handleSave={handleSave}
          onClose={closeEditPopup}
        />
      )}
    </div>
  );
};

const ViewPopup = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold focus:outline-none transition transform hover:scale-110"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">{project.name}</h2>

        <div className="flex flex-col mb-5 space-y-2">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Type:</span> {project.type}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Date:</span> {project.date}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-blue-600">Time:</span> {project.time}
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-purple-600">Progress:</span>{" "}
            <span
              className="font-bold"
              style={{ color: project.progressColor }}
            >
              {project.progress}%
            </span>
          </p>
          <p className="text-lg font-medium text-gray-700">
            <span className="font-semibold text-purple-600">Days Left:</span>{" "}
            {project.daysLeft}
          </p>
        </div>

        <div className="mb-5">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Skillset:</h3>
          <div className="flex flex-wrap gap-3">
            {project.skillset &&
              project.skillset[0].split(",").map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-green-400 text-white text-sm font-semibold shadow-md"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Participants:</h3>
          <div className="flex flex-wrap gap-3">
            {project.participants &&
              project.participants[0].split(",").map((name, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm font-semibold shadow-md"
                >
                  {name.trim()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const EditFormPopup = ({ formData, handleSave, onClose }) => {
  const [title, setTitle] = useState(formData.name || '');
  const [intervieweesName, setIntervieweesName] = useState(formData.participants ? formData.participants[0] || '' : '');
  const [skillset, setSkillset] = useState(formData.skillset || '');
  const [duration, setDuration] = useState(formData.duration || '');
  const [date, setDate] = useState(formData.date || '');
  const [time, setTime] = useState(formData.time || '');
  const [notes, setNotes] = useState(formData.notes || '');
  const [department, setDepartment] = useState(formData.department || '');
  const [signedUp, setSignedUp] = useState(formData.signedUp || '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      name: title,
      participants: [intervieweesName],
      skillset,
      duration,
      date,
      time,
      notes,
      department,
      signedUp,
    };
    handleSave(updatedFormData);
  };

  return (
    <div className="popup-container">
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <form onSubmit={handleFormSubmit}>
            <div className="edit-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Interviewer</label>
                <input type="text" value={intervieweesName} onChange={(e) => setIntervieweesName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Skillset</label>
                <input type="text" value={skillset} onChange={(e) => setSkillset(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Duration (minutes)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Anyone Signed Up for this interview?</label>
                <select value={signedUp} onChange={(e) => setSignedUp(e.target.value)}>
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
        </div>
      </div>
    </div>
  );
};



export default Past;
