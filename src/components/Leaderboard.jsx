import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/interview/top');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch leaderboard data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/analytics');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="leaderboard-container">
      <main className="leaderboard-main">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">Interview Champs</h1>
          <button className="leaderboard-share" onClick={handleClick}>
            <i className="ph ph-share-network">🏆</i>
          </button>
        </div>
        <div className="leaderboard-content">
          <div className="leaderboard-ribbon"></div>
          <table className="leaderboard-table">
            <tbody>
              {data.map((user, index) => (
                <tr key={user.name} className="leaderboard-row">
                  <td className="leaderboard-cell leaderboard-number">{index + 1}</td>
                  <td className="leaderboard-cell leaderboard-name">
                    <div className="leaderboard-initials">
                      {getInitials(user.name)}
                    </div>
                    {user.name}
                  </td>
                  <td className="leaderboard-cell leaderboard-points">
                    {user.count} {user.count > 1 ? 'interviews' : 'interview'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;