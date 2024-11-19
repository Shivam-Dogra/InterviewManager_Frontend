import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Avatar, Box, Typography } from '@mui/material';
import TopNavbar from '../components/TopNavbar'; 
import Sidebar from '../components/Slidebar'; 
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/interview/John Doe');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, []);
  
    const handleSaveChanges = async () => {
        try {
          console.log('Updated user:', user); // Log user before sending
          const token = localStorage.getItem('token'); 
      
          const response = await axios.put(
            `http://localhost:3000/api/interview/update-profile/${user._id}`,
            user,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          message.success('Your profile is updated!', 2);
          setUser(response.data.user);
          setEditMode(false);
        } catch (error) {
          console.error('Error updating profile:', error);
          Modal.error({
            title: 'Failed to save changes!',
            icon: <ExclamationCircleOutlined />,
            content: error.response ? error.response.data : error.message,
            okText: 'Close',
          });
          setError('Failed to save changes');
        }
      };
      
     
      
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
  
    return (
        <div className="dashboard-container">
          {/* Top Navbar */}
          <div className="app-header">
            <TopNavbar />
          </div>
    
          {/* Sidebar and Content */}
          <div className="main-content flex">
            {/* Sidebar */}
            <Sidebar />
    
            {/* Profile Form */}
            <div className="content-area flex justify-center items-center w-full h-screen bg-gray-100">
              <div className="container mx-auto my-4 px-4 lg:px-20">
                <div className="w-full p-8 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mx-auto rounded-2xl shadow-2xl bg-white relative" style={{ top: '-70px' }}>
                  <h1 className="font-bold uppercase text-5xl text-black mb-6 text-center">Profile</h1>
                     
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      value={user.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Profile Name*"
                      disabled={!editMode}
                    />
                    <input
                      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="email"
                      value={user.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email*"
                      disabled={!editMode}
                    />
                    <input
                      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      value={user.position || ''}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      placeholder="Position*"
                      disabled={!editMode}
                    />
                    <select
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  value={user.department || ''}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!editMode}
                >
                  <option value="" disabled>
                    Select Department*
                  </option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Engineering">Engineering</option>
                </select>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="url"
                  value={user.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="LinkedIn Profile URL"
                  disabled={!editMode}
                />
                <TextField
                  label="Skills"
                  type="text"
                  placeholder="e.g., JavaScript, React"
                  value={user.skills || ''}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  fullWidth
                  disabled={!editMode}
                />
                  </div>
                 
                  <textarea
                    placeholder="About Me"
                    className="w-full h-32 bg-gray-100 text-gray-900 p-3 mt-4 rounded-lg focus:outline-none focus:shadow-outline"
                    value={user.about || ''}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    disabled={!editMode}
                  ></textarea>
                 
    
                  <div className="mt-6 w-1/2 lg:w-1/4 mx-auto">
                    {editMode ? (
                      <button
                        onClick={handleSaveChanges}
                        className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:bg-blue-800 transition duration-200"
                      >
                        Save Changes
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-white p-3 rounded-lg w-full focus:outline-none focus:shadow-outline hover:bg-blue-800 transition duration-200"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
  
  export default ProfilePage;
