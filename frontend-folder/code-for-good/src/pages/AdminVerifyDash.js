import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

const AdminVerifyDash = () => {
  const [tentEventData, setTentEventData] = useState([]); // Use state to store event data

  useEffect(() => {
    // Fetch event data from Firestore inside a useEffect hook
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "tentative-events");
        const querySnapshot = await getDocs(collectionRef);

        const tentEventData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTentEventData(tentEventData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Pass an empty dependency array to run the effect only once

  return (
    <div className="eventDash">
      {tentEventData.map((event) => (
        <div className="event-preview" key={event.title}>
          <Link to={`/tentEvents/${event.title}`}>
            <h2>{event.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminVerifyDash;
