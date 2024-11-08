import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Slidebar';
import TopNavbar from '../components/TopNavbar';
import { Box, Typography, Grid, Card, Divider } from '@mui/material';

const InterviewAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const colors = ['#fee4cb', '#e9e7fd', '#ffd3e2', '#c8f7dc', '#d5deff'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/interview/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        return <Typography variant="h6" style={{ fontFamily: 'DM Sans, sans-serif' }}>Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error" style={{ fontFamily: 'DM Sans, sans-serif' }}>{error}</Typography>;
    }

    return (
        <div className="dashboard-container" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            <TopNavbar />
            <div className="main-content">
                <Sidebar />
                <div className="content-area" style={{ padding: '20px' }}>
                    <Typography variant="h4" style={{
                        color: '#3f51b5',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '20px',
                        fontWeight: 600
                    }}>
                        Analytics
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                backgroundColor: colors[0],
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}>
                                <Typography variant="h6" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>
                                    Total Interviews
                                </Typography>
                                <Divider />
                                <Typography variant="h5" style={{
                                    color: 'green',
                                    textAlign: 'center',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 500,
                                }}>
                                    {data.totalInterviews}
                                </Typography>
                                <Divider />
                                <Typography variant="body1" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontSize: '1.2rem'
                                }}>
                                    Average Duration: <span style={{ color: 'blue' }}>{data.averageDuration} minutes</span>
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                backgroundColor: colors[1],
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}>
                                <Typography variant="h6" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}>
                                    Department Counts
                                </Typography>
                                <Divider />
                                <ul style={{
                                    paddingLeft: '20px',
                                    fontSize: '1rem',
                                    fontFamily: 'DM Sans, sans-serif',
                                    color: 'black',
                                    paddingTop: '10px'
                                }}>
                                    {data.departmentCounts.map((dept, index) => (
                                        <li key={index} style={{
                                            color: 'black',
                                            fontFamily: 'DM Sans, sans-serif',
                                            fontSize: '1.2rem',
                                        }}>
                                            {`${dept._id} - ${dept.count}`}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                backgroundColor: colors[2],
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}>
                                <Typography variant="h6" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>
                                    Interview Champs
                                </Typography>
                                <Divider />
                                <ul style={{
                                    paddingLeft: '20px',
                                    fontSize: '1rem',
                                    fontFamily: 'DM Sans, sans-serif',
                                    color: 'black',
                                    paddingTop: '10px'
                                }}>
                                    {data.topInterviewers.map((interviewer, index) => (
                                        <li key={index} style={{
                                            fontFamily: 'DM Sans, sans-serif',
                                            fontSize: '1.2rem'
                                        }}>
                                            {`${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''} ${interviewer._id}: ${interviewer.count}`}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                backgroundColor: colors[3],
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}>
                                <Typography variant="h6" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>
                                    Top Scheduled Interviews
                                </Typography>
                                <Divider />
                                <ul style={{
                                    paddingLeft: '20px',
                                    fontSize: '1.2rem',
                                    fontFamily: 'DM Sans, sans-serif',
                                    color: 'black',
                                    paddingTop: '10px'
                                }}>
                                    {data.topScheduledInterviews.map((interview, index) => (
                                        <li key={index}>{`${interview._id}: ${interview.count}`}</li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                backgroundColor: colors[4],
                                boxShadow: 3,
                                padding: 2,
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6,
                                }
                            }}>
                                <Typography variant="h6" style={{
                                    color: 'black',
                                    fontFamily: 'DM Sans, sans-serif',
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>
                                    Top 5 Skills Checked
                                </Typography>
                                <Divider />
                                <ul style={{
                                    paddingLeft: '20px',
                                    fontSize: '1rem',
                                    fontFamily: 'DM Sans, sans-serif',
                                    color: 'black',
                                    paddingTop: '10px'
                                }}>
                                    {data.skillCounts.map((skill, index) => (
                                        <li key={index} style={{
                                            fontFamily: 'DM Sans, sans-serif',
                                            fontSize: '1.2rem'
                                        }}>
                                            {`${skill._id} - ${skill.count}`}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default InterviewAnalytics;
