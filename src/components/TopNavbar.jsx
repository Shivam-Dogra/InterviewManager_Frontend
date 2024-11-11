import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const TopNavbar = ({ username }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const getUsernameInitials = () => {
    let name = localStorage.getItem('username');
    console.log(name);
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="app-header">
      <div className="app-header-left">
  <p className=" app-icon">📝 Interview Manager</p>
</div>

      <div className="app-header-right">
        <button className="mode-switch" title="Switch Theme">
          <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </button>
        
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className='text-black font-bold'>{username}</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
              {getUsernameInitials(username)}
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-lg shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
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
