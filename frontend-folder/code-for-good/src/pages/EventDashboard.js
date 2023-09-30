import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link, useParams } from "react-router-dom";
import { db } from '../firebase-config.js';
import { doc, collection, getDocs, getDoc } from 'firebase/firestore'
import "../styles/EventDashboard.css";


const EventDashboard = () => {
  const userId = useParams().userId
  //const [userData, setUserData] = useState(null);
  const [userInterests, setUserInterests] = useState([]);

  const [eventData, setEventData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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

        const documentRef = doc(db, "users", userId);

        
        getDoc(documentRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const documentData = docSnapshot.data();
              //console.log("Document data:", documentData);
              //setUserData(documentData)
              setUserInterests(documentData.interests)
            } else {
              console.log("Document does not exist.");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
          });
        
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
          {filteredData.map((event) => (
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
