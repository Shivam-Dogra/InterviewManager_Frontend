import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import Past from './components/Past';
import InterviewAnalytics from './components/InterviewAnalytics';
import Calendar from './components/Calendar'
import Profile from './components/Profile'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/past" element={<Past />} />
          <Route path="/analytics" element={<InterviewAnalytics />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;