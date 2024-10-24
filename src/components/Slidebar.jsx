import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/schedule">Schedule Interview</Link></li>
        <li><Link to="/past-interviews">Past Interviews</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
