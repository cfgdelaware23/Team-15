import React, {useState, useEffect} from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

import {db} from '../firebase-config.js';
import {collection, getDocs} from 'firebase/firestore'

const EventDashboard = () => {
  const [eventData, setEventData] = useState([]); // Use state to store event data

  useEffect(() => {
    // Fetch event data from Firestore inside a useEffect hook
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "events");
        const querySnapshot = await getDocs(collectionRef);

        const eventData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEventData(eventData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []); // Pass an empty dependency array to run the effect only once

  return (
    <div className="eventDash">
      {eventData.map((event) => (
        <div className="event-preview" key={event.id}>
          <Link to={`/events/${event.id}`}>
            <h2>{event.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default EventDashboard;