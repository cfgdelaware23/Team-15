import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { db } from '../firebase-config.js';
import { collection, getDocs } from 'firebase/firestore'
import "../styles/EventDashboard.css";


const EventDashboard = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "events");
        const querySnapshot = await getDocs(collectionRef);

        const eventData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEventData(eventData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="eventDash">
      <table>
        <thead>
          <tr>
            <th className="categories">Categories</th>
            <th className="title">Title</th>
            <th className="date">Date</th>
          </tr>
        </thead>
        <tbody>
          {eventData.map((event) => (
            <tr key={event.id}>
              <td>{event.interests.join(", ")}</td>
              <td>
                <Link to={`/events/${event.title}`}>{event.title}</Link>
              </td>
              <td>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventDashboard;
