import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";


const EventDashboard = () => {
    const events = [
      {
        id: 1,
        title: "Shuffleboard",
        date: "October 26, 2022",
        recurring: 7,
        category: ["Entertainment", "Sports"],
        zoomLink: "https://al;aejfonajkl;la.com",
      },
      {
        id: 2,
        title: "basketball",
        date: "October 21, 2023",
        recurring: 14,
        category: ["Education"],
        zoomLink: "https://al;aejf.com",
      },
      {
        id: 3, 
        title: "movie",
        date: "December 5, 2021",
        recurring: 7,
        category: ["Sports"],
        zoomLink: "https://al;aejfonajhfadehj;fa.com",
      }
    ];

    return (
      <div className="eventDash">
        {events.map((event) => (
          <div className="event-preview" key = {event.id}>
            <Link to={`/events/${event.id}`}>
                <h2>{event.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    );
}

export default EventDashboard;