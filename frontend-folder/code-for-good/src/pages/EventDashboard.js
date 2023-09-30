import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Link, useParams } from "react-router-dom";
import { db } from '../firebase-config.js';
import { doc, collection, getDocs, getDoc } from 'firebase/firestore'
import "../styles/EventDashboard.css";
import Header2 from "../components/Header2"
import Event from "../components/Event";



const EventDashboard = () => {
  const userId = useParams().userId
  //const [userData, setUserData] = useState(null);
  const [userInterests, setUserInterests] = useState([]);

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
        const documentRef = doc(db, "users", userId);

        
        getDoc(documentRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              // Document exists, you can access its data using docSnapshot.data()
              const documentData = docSnapshot.data();
              console.log("Document data:", documentData);
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



  let filteredEvents = eventData.filter((event) =>
    event.interests.some(
      (element) =>
        Array.isArray(userInterests) && userInterests.includes(element)
    )
  );
  
  if (filteredEvents.length === 0) {
    filteredEvents = eventData;
  }

return (
    <div className="background" id="dashboard">
    <Header2 />
      <table className="table">
        <thead>
          {/*<tr>
            <th className="categories">Categories</th>
            <th className="title">Title</th>
            <th className="date">Date</th>
          </tr>*/}
        </thead>
        <div className="flexDashboard">
          <tbody className="table">
            {filteredEvents.slice(0,3).map((event, index) => (
              <tr key={event.id}>
                {/*<td>{event.interests.join(", ")}</td>
                <td>
                  <Link to={`/events/${event.title}`}>{event.title}</Link>
                </td>
                <td>{event.date}</td>*/}
                <span onClick={() => {
                  window.location.href = `/events/${event.title}/${userId}`;
                }}><Event title={event.title} categories={"Categories: " + event.interests.join(", ")} date={"Date: " + event.date} /></span>
              </tr>
            ))}
          </tbody>
          <tbody className="table">
            {filteredEvents.slice(3,6).map((event, index) => (
              <tr key={event.id}>
                {/*<td>{event.interests.join(", ")}</td>
                <td>
                  <Link to={`/events/${event.title}`}>{event.title}</Link>
                </td>
                <td>{event.date}</td>*/}
                <span onClick={() => {
                  window.location.href = `/events/${event.title}/${userId}`;
                }}><Event title={event.title} categories={"Categories: " + event.interests.join(", ")} date={"Date: " + event.date} /></span>
              </tr>
            ))}
          </tbody>
          <tbody className="table">
            {filteredEvents.slice(6, 9).map((event, index) => (
              <tr key={event.id}>
                {/*<td>{event.interests.join(", ")}</td>
                <td>
                  <Link to={`/events/${event.title}`}>{event.title}</Link>
                </td>
                <td>{event.date}</td>*/}
                <span onClick={() => {
                  window.location.href = `/events/${event.title}/${userId}`;
                }}><Event title={event.title} categories={"Categories: " + event.interests.join(", ")} date={"Date: " + event.date} /></span>
              </tr>
            ))}
          </tbody>
        </div>
      </table>
    </div>
  
);
};

export default EventDashboard;
