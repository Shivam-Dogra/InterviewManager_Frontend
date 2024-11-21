import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Slidebar";
import TopNavbar from "../components/TopNavbar";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, CircularProgress, Fab } from "@mui/material";
import FunFactsDialog from "../components/FunFactsDialog";

const colors = [
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-indigo")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-green")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-dark-slate")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-brown")
    .trim(),
  getComputedStyle(document.documentElement)
    .getPropertyValue("--color-gray")
    .trim(),
];

const InterviewAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [openFunFacts, setOpenFunFacts] = useState(false);

  const handleFabClick = () => {
    setOpenFunFacts(true);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/interview/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  // Recharts compatible data
  const departmentData = data.departmentCounts.map((dept, index) => ({
    name: dept._id,
    value: dept.count,
    color: colors[index % colors.length],
  }));

  const skillData = data.skillCounts.map((skill) => ({
    name: skill._id,
    count: skill.count,
  }));

  const interviewTrendsData = data.topScheduledInterviews.map((interview) => ({
    date: interview._id,
    count: interview.count,
  }));

  const mostInterviewedDepartment =
    data.departmentCounts.sort((a, b) => b.count - a.count)[0]?._id || "N/A";

  const mostPopularSkill = skillData[0]?.name || "N/A";
  const topInterviewer = data.topInterviewers[0]?._id || "N/A";
  const longestInterviewDuration = data.longestInterview?.duration || 0;
  const quickestHireTime = data.shortestInterview?.duration || 0;
  const topJobRole = data.topScheduledInterviews[0]?._id || "N/A";
  const roleCount = data.topScheduledInterviews[0]?.count || 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="app-header">
        <TopNavbar username={username} />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 md:p-8">
          <h3 className="text-3xl font-bold text-indigo-600 mb-6">
            Interview Analytics
          </h3>

          <div className="grid grid-cols-7 grid-rows-7 gap-4">
            <div className="col-span-2">
              <div className="small-card flex flex-col justify-center items-center">
                <h5 className="text-sm font-semibold text-gray-700">
                  Total Interviews
                </h5>
                <p className="text-green-500 text-xl font-bold">
                  {data.totalInterviews}
                </p>
              </div>
            </div>

            <div className="col-span-2 col-start-3">
              <div className="small-card flex flex-col justify-center items-center">
                <h5 className="text-sm font-semibold text-gray-700">
                  Average Duration
                </h5>
                <p className="text-blue-500 text-xl font-bold">
                  {data.averageDuration.toFixed(2)} mins
                </p>
              </div>
            </div>
            <div className="col-span-4 row-span-3 col-start-1 row-start-2">
  <div className="card chart-card" style={{ height: '400px' }}>
    <h5 className="text-lg font-semibold text-center mb-1 text-gray-700">
      Interview Trends
    </h5>
    <ResponsiveContainer width="100%" height="90%">
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
                <h5 className="text-lg font-semibold text-center mb-2 mt-2 text-gray-700">
                  Department Counts
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
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
                <h5 className="text-sm font-semibold text-center mb-3 mt-2 text-gray-700">
                  Top 5 Skills Checked
                </h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillData} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 13 }}
                    />
                    <Tooltip contentStyle={{ fontSize: 13 }} />
                    <Legend wrapperStyle={{ fontSize: 13 }} />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-3 row-span-4 col-start-5 row-start-1">
              <div className="card lg-card text-center">
                <h5 className="text-lg font-semibold mb-2 text-gray-700">
                  Interviewers
                </h5>
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
          <Fab
  aria-label="fun facts"
  style={{
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 1000,
    width: "70px", // Larger circle
    height: "70px", // Larger circle
    backgroundColor: 'black', // Sleek dark gray
    color: "white", // White icon
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  }}
  onClick={() => {
    const fab = document.getElementById("juggleFab");
    if (fab) {
      fab.classList.add("juggle"); // Add juggle animation
      setTimeout(() => {
        fab.classList.remove("juggle"); // Remove animation after it ends
        handleFabClick(); // Open popup after animation
      }, 500); // Delay matches the animation duration
    }
  }}
  id="juggleFab"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{
      width: "50px",
      height: "50px",
    }}
    fill="white"
  >
    <circle cx="12" cy="12" r="10" fill="#555" /> {/* Outer circle */}
    <path d="M12 7c-1.65 0-3 1.35-3 3h2a1 1 0 0 1 2 0c0 .55-.45 1-1 1-1.1 0-2 .9-2 2v1h2v-1c0-.55.45-1 1-1 1.1 0 2-.9 2-2s-1.35-3-3-3z" />
    <circle cx="11.2" cy="17" r="1" /> {/* Adjusted dot */}
    </svg>
</Fab>


          <style>
            {`
  #juggleFab.juggle {
    animation: juggle 0.6s ease-in-out;
  }

  @keyframes juggle {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2) rotate(10deg);
    }
  }
`}
          </style>

          <FunFactsDialog
            open={openFunFacts}
            onClose={() => setOpenFunFacts(false)}
            mostInterviewedDepartment={mostInterviewedDepartment}
            mostPopularSkill={mostPopularSkill}
            topInterviewer={topInterviewer}
            longestInterviewDuration={longestInterviewDuration}
            quickestHireTime={quickestHireTime}
            topJobRole={topJobRole}
            roleCount={roleCount}
          />
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
