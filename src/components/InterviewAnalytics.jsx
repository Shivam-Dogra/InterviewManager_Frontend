import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Slidebar';
import TopNavbar from '../components/TopNavbar';

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider
} 
from '@mui/material';


const InterviewAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const colors = [
        '#4B0082', // Indigo
        '#006400', // Dark Green
        '#2F4F4F', // Dark Slate Gray
        '#A52A2A', // Brown
        '#808080', // Dark Gray 
    ]
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the Bearer token

                const response = await axios.get('http://localhost:3000/api/interview/stats', {
                    headers: {
                        Authorization: `Bearer ${token}` // Set the Bearer token in the headers
                    }
                });
                setData(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <div className="dashboard-container">
            <TopNavbar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area">
                    <h3 style={{ color: '#3f51b5', fontFamily: 'Bungee Tint', fontSize: '2rem'}}>Analytics</h3>

                    <div className="analytics-grid">
                        <div className="analytics-card">
                            <h5 className="total-interviews">
                                Total Interviews: <span style={{ color: 'green', fontFamily: 'Bungee Tint',  }}>{data.totalInterviews}</span>
                            </h5>
                            <hr />
                            <h6 className="average-duration">
                                Average Duration: <span style={{ color: 'blue', fontFamily: 'Bungee Tint' }}>{data.averageDuration} minutes</span> 
                            </h6>
                            <hr />
                            <h6 className="interviewers-title">Interviewers:</h6>
                            <ul>
                                {data.interviewers.map((interviewer, index) => (
                                    <li key={index}>{interviewer}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="analytics-card">
                            <h5 className="department-counts">📊 Department Counts 🎉</h5>
                            <hr />
                            <ul>
                                {data.departmentCounts.map((dept, index) => (
                                    <li key={index} style={{ color: colors[index % colors.length], fontFamily: 'Bungee Tint', fontSize: '1.2rem'}}>
                                        {`${dept._id} - ${dept.count}`}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="analytics-card">
                            <h5 className="top-interviewers">🏆🎤 Interview Champs 🎤🏆</h5>
                            <hr />
                            <ul>
                            {data.topInterviewers.map((interviewer, index) => (
                                 <li key={index}  style = {{fontFamily: 'Bungee Tint', fontSize: '1.2rem'}}>
                                    {`${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} ${interviewer._id}: ${interviewer.count}`}
                                </li>
                            ))}

                            </ul>
                        </div>

                        <div className="analytics-card">
                            <h5 className="top-scheduled-interviews">Top Scheduled Interviews</h5>
                            <ul>
                                {data.topScheduledInterviews.map((interview, index) => (
                                    <li key={index}>{`${interview._id}: ${interview.count}`}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="analytics-card">
                            <h5 className="skills-breakdown">🌟 Top 5 Skills Checked 🌟</h5>
                            <hr />
                            <ul>
                                {data.skillCounts.map((skill, index) => (
                                    <li key={index} style={{ fontFamily: 'Bungee Tint', fontSize: '1.2rem'}} >{`${skill._id} - ${skill.count}`}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

        
export default InterviewAnalytics;
