import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Slidebar';
import TopNavbar from '../components/TopNavbar';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, CircularProgress } from '@mui/material';
 
const colors = ['#4B0082', '#006400', '#2F4F4F', '#A52A2A', '#808080'];
 
const InterviewAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
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
        return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
    }
 
    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }
 
    // Recharts compatible data
    const departmentData = data.departmentCounts.map((dept, index) => ({
        name: dept._id,
        value: dept.count,
        color: colors[index % colors.length]
    }));
 
    const skillData = data.skillCounts.map(skill => ({
        name: skill._id,
        count: skill.count
    }));
 
    const interviewTrendsData = data.topScheduledInterviews.map(interview => ({
        date: interview._id,
        count: interview.count
    }));
 
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="app-header">
            <TopNavbar />
            </div>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 md:p-8">
                    <h3 className="text-3xl font-bold text-indigo-600 mb-6">Interview Analytics</h3>
 
                    <div className="grid grid-cols-7 grid-rows-7 gap-4">
                        <div className="col-span-2">
                            <div className="small-card">
                                <h5 className="text-sm font-semibold text-gray-700">Total Interviews</h5>
                                <p className="text-green-500 text-xl font-bold">{data.totalInterviews}</p>
                            </div>
                        </div>
                        <div className="col-span-2 col-start-3">
                            <div className="small-card">
                                <h5 className="text-sm font-semibold text-gray-700">Average Duration</h5>
                                <p className="text-blue-500 text-xl font-bold">{data.averageDuration.toFixed(2)} mins</p>
                            </div>
                        </div>
                        <div className="col-span-4 row-span-3 col-start-1 row-start-2">
                            <div className="card chart-card">
                                <h5 className="text-lg font-semibold text-center mb-2 text-gray-700">Interview Trends</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={interviewTrendsData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#3f51b5" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-span-4 row-span-3 col-start-1 row-start-5">
                            <div className="card chart-card">
                                <h5 className="text-lg font-semibold text-center mb-2 text-gray-700">Department Counts</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                                            {departmentData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-span-3 row-span-3 col-start-5 row-start-5">
                            <div className="card chart-card">
                                <h5 className="text-lg font-semibold text-center mb-2 text-gray-700">Top 5 Skills Checked</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={skillData} layout="vertical">
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="col-span-3 row-span-4 col-start-5 row-start-1">
                            <div className="card lg-card text-center">
                                <h5 className="text-lg font-semibold mb-2 text-gray-700">Interviewers</h5>
                                <div className="interviewer-list grid grid-cols-2 gap-2 mt-2">
                                    {data.interviewers.map((interviewer, index) => (
                                        <span key={index} className="interviewer-name">
                                            {interviewer}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <style jsx>{`
                .small-card {
                    background-color: white;
                    padding: 0.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e0e0e0;
                    text-align: center;
                    height: 100px;
                }
                .card {
                    background-color: white;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e0e0e0;
                }
                .chart-card {
                    height: 330px;
                }
                .lg-card {
                    padding: 2rem;
                }
                .interviewer-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem;
                }
                .interviewer-name {
                    background-color: #f0f4f8;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                }
            `}</style>
        </div>
    );
};
 
export default InterviewAnalytics;
 
 