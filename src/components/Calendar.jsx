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
const colors = ['#fee4cb', '#e9e7fd', '#ffd3e2', '#c8f7dc', '#d5deff'];

// Function to get a random color from the colors array
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const CustomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/interview/all", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE5ODQzOTFmZGMxY2VjMzdkMTlmZDkiLCJpYXQiOjE3MzAwNzIyMjV9.21bq6OEC-D6VpS-CwcfOq8Ij_N1Pm5dWjAS2RWqFJh0`
          }
        });

        const apiEvents = response.data.map(interview => ({
          title: interview.title,
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
      <TopNavbar />
      <div className="main-content">
        <Sidebar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 840, width: 1530, borderRadius: '10px', overflow: 'hidden' }}
          defaultView="month"
          views={['month']}
          toolbar
          popup
          onSelectEvent={handleEventClick}
          eventPropGetter={(event) => {
            // Get a random color from the predefined colors array
            const randomColor = getRandomColor();
            return {
              style: {
                backgroundColor: randomColor,
                color: 'black',
                borderRadius: "8px",
                padding: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "0.8em",
                textAlign: "center",
                marginTop: "2px"
              }
            };
          }}
        />
        {selectedEvent && (
  <div className="modal">
    <div className="modal-content">
      <h2 style={{ fontWeight: 'bold' }}>{selectedEvent.title}</h2>
      <p >Signed Up: {selectedEvent.signedUp ? 'Yes' : 'No'}</p>
      <p >Interviewer: {selectedEvent.interviewerName}</p>
      <p >Candidate(s): {selectedEvent.intervieweesName}</p>
      <p >Skills Required: {selectedEvent.skillset}</p>
      <p >Duration: {selectedEvent.duration} minutes</p>
      <p >Time: {selectedEvent.time}</p>
      <p >Department: {selectedEvent.department}</p>
      <p >Notes: {selectedEvent.notes || "No additional notes"}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default CustomCalendar;
