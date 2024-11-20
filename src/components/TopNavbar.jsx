import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const TopNavbar = ({ username }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nextInterview, setNextInterview] = useState(null);
  const [timerDropdownOpen, setTimerDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleProfileRedirect = () => {
    navigate('/profile');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleTimerDropdown = () => setTimerDropdownOpen(!timerDropdownOpen);

  //username
  const getUsernameInitials = () => {
    let name = username || 'User';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  //upcoming interview
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateTimeLeft = (targetDateTime) => {
    try {
      const now = new Date();
      const difference = targetDateTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        return `${days} days ${hours} hrs ${minutes} mins`;
      } else {
        return 'Time has passed';
      }
    } catch (error) {
      console.error('Error calculating time left:', error);
      return 'Invalid time format';
    }
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/interview/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const upcomingInterviews = response.data
          .filter((interview) => {
            const [hours, minutes] = interview.time.split(':');
            const interviewDateTime = new Date(interview.date);
            interviewDateTime.setUTCHours(hours, minutes, 0, 0);

            return new Date() < interviewDateTime && !interview.completionStatus;
          })
          .sort((a, b) => {
            const aDateTime = new Date(a.date);
            aDateTime.setUTCHours(...a.time.split(':').map(Number));
            const bDateTime = new Date(b.date);
            bDateTime.setUTCHours(...b.time.split(':').map(Number));
            return aDateTime - bDateTime;
          });

        setNextInterview(upcomingInterviews.length > 0 ? upcomingInterviews[0] : null);
      } catch (error) {
        console.error('Error fetching interviews:', error.response || error.message);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    if (nextInterview) {
      const interviewDateTime = new Date(`${nextInterview.date.split('T')[0]}T${nextInterview.time}:00Z`);

      console.log(`Corrected Interview DateTime for Countdown: ${interviewDateTime}`);

      const interval = setInterval(() => {
        setTimeLeft(calculateTimeLeft(interviewDateTime));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [nextInterview]);

  return (
    <div className="app-header">
      <style>
        {`
          @keyframes flash {
            0%, 100% { color: #000000; } /* Black */
            50% { color: #ff0000; } /* Red */
          }
          .flash {
            animation: flash 1s infinite;
          }
        `}
      </style>
      <div className="app-header-left">
        <p className="app-icon">📝 Interview Manager</p>
      </div>

      <div className="app-header-right flex items-center space-x-4">
        <div className="relative">
          <button onClick={toggleTimerDropdown} className="flex items-center space-x-2 cursor-pointer">
            <span className="text-lg">⏳</span>
            {nextInterview && <span className="text-sm font-semibold flash">{timeLeft}</span>}
          </button>
          {timerDropdownOpen && nextInterview && (
           <div className="absolute right-0 w-60 bg-white text-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200">
           <p className="px-4 text-lg font-bold text-indigo-800">Upcoming Interview</p>
           <div className="px-4 py-1">
             <p className="text-sm text-black">
               {nextInterview.title}
             </p>
             <p className="text-sm ">
                {formatDate(nextInterview.date)} at {nextInterview.time} 
             </p>
             <p className="text-sm">
              Signed up by {nextInterview.interviewerName}
             </p>
           </div>
         </div>
         
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative z-50">
          <button onClick={toggleDropdown} className="flex items-center space-x-2 cursor-pointer">
            <span className="text-black font-bold">{username}</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {getUsernameInitials(username)}
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
              <button onClick={handleProfileRedirect} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
