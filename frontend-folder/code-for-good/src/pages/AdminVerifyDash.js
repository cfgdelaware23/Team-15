import React, { useState, useEffect } from "react";
import "../styles/AdminVerifyDash.css";
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
       <table>
        <thead>
          <tr>
            <th className="categories">Categories</th>
            <th className="title">Title</th>
            <th className="date">Date</th>
          </tr>
        </thead>
        <tbody>
      {tentEventData.map((event) => (
        <tr key={event.id}>
        <td>{event.interests.join(", ")}</td>
        <td>
          <Link to={`/tentEvents/${event.title}`}>{event.title}</Link>
        </td>
        <td>{event.date}</td>
      </tr>
      ))}
      </tbody>
      </table>
    </div>
  );
};

export default AdminVerifyDash;