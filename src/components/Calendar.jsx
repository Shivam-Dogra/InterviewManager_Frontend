import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Slidebar";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

// Predefined color array
const departmentColors = {
  'Human Resources': 'var(--color-hr)',
  'HR': 'var(--color-hr)',
  'Information Technology': 'var(--color-informationtechnology)',
  'IT': 'var(--color-informationtechnology)',
  'Marketing': 'var(--color-marketing)',
  'Accounts': 'var(--color-accounts)',
  'Engineering': 'var(--color-engineering)',
};



const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/interview/all", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE5ODQzOTFmZGMxY2VjMzdkMTlmZDkiLCJpYXQiOjE3MzAwNzIyMjV9.21bq6OEC-D6VpS-CwcfOq8Ij_N1Pm5dWjAS2RWqFJh0`
          }
        });

        const apiEvents = response.data.map(interview => ({
          title: interview.signedUp ? interview.title : `${interview.title} 🚨`, 
          start: new Date(interview.date),
          end: new Date(interview.date),
          interviewerName: interview.interviewerName,
          intervieweesName: interview.intervieweesName.join(", "),
          skillset: interview.skillset.join(", "),
          duration: interview.duration,
          time: interview.time,
          notes: interview.notes,
          department: interview.department,
          signedUp: interview.signedUp
        }));

        setEvents(apiEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="dashboard-container">
      <div className="app-header">
      <TopNavbar username={username} />
      </div>
      <div className="main-content">
        <Sidebar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, width: 1520, borderRadius: '10px', overflow: 'hidden' }}
          defaultView="month"
          views={['month']}
          toolbar
          popup
          onSelectEvent={handleEventClick}
          eventPropGetter={(event) => {
            const departmentColor = departmentColors[event.department] || 'var(--default-color)'; // Fallback to default color if department is not found
            return {
              style: {
                backgroundColor: departmentColor,
                color: 'black', // Adjust text color for better contrast
                borderRadius: "8px",
                padding: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "0.7em",
                textAlign: "center",
                marginTop: "2px"
              }
            };
          }}
          
  
        />
        {selectedEvent && (
 <div className="modal">
 <div className="modal-content">
   <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
     <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      
       <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
         {selectedEvent.title}
       </h2>

       {/* Signed Up Status */}
       <p className="text-lg font-medium text-gray-800 text-center">
         <span className="font-semibold text-indigo-600">Signed Up:</span>{" "}
         {selectedEvent.signedUp ? "Yes" : "No"}
       </p>

       {/* Interviewer */}
       <div className="mb-4 text-center">
         <h3 className="text-lg font-semibold text-indigo-600">Candidate:</h3>
         <div className="flex justify-center flex-wrap gap-3">
           <span className="text-indigo-900 font-medium">
             {selectedEvent.interviewerName}
           </span>
         </div>
       </div>

       {/* Candidates */}
       <div className="mb-4 text-center">
         <h3 className="text-lg font-semibold text-indigo-600 -mt-3">Interviewer:</h3>
         <div className="flex justify-center flex-wrap gap-3">
           {selectedEvent.intervieweesName.split(",").map((candidate, idx) => (
             <span
               key={idx}
              className="text-indigo-900 font-medium"
             >
               {candidate.trim()}
             </span>
           ))}
         </div>
       </div>

       {/* Skills */}
       <div className="mb-4 text-center">
         <h3 className="text-lg font-semibold text-indigo-600 -mt-3">Skills Required:</h3>
         <div className="flex justify-center flex-wrap gap-3 mt-2">
           {selectedEvent.skillset.split(",").map((skill, idx) => (
             <span
               key={idx}
               className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow-md"
             >
               {skill.trim()}
             </span>
           ))}
         </div>
       </div>

       {/* Duration */}
       <p className="text-lg font-medium text-gray-800 text-center">
         <span className="font-semibold text-indigo-600">Duration:</span>{" "}
         {selectedEvent.duration} minutes
       </p>

       {/* Time */}
       <p className="text-lg font-medium text-gray-800 text-center">
         <span className="font-semibold text-indigo-600">Time:</span>{" "}
         {selectedEvent.time}
       </p>

       {/* Department */}
       <p className="text-lg font-medium text-gray-800 text-center">
         <span className="font-semibold text-indigo-600">Department:</span>{" "}
         {selectedEvent.department}
       </p>

       {/* Notes */}
       <p className="text-lg font-medium text-gray-800 text-center">
         <span className="font-semibold text-indigo-600">Notes:</span>{" "}
         {selectedEvent.notes || "No additional notes"}
       </p>
       <button
          onClick={closeModal}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
        >
          Close
        </button>
     </div>
     
   </div>
 </div>
</div>


)}

      </div>
    </div>
  );
};

export default CustomCalendar;
