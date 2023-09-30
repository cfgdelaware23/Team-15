import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import Header2 from "../components/Header2";
import '../styles/EventDetails.css'

const EventDetails = () => {
  const { eventTitle, userId } = useParams();

  const [eventData, setEventData] = useState(null); // Use null instead of []
  const [loading, setLoading] = useState(true);
  
  const addUser = async () => {
    try {
      const userDocRef = collection(db, "users");
      const userDocSnapshot = await getDocs(userDocRef);
        
      let isAdmin = false;
  
      userDocSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.admin === true) {
          isAdmin = true;
        }
      });
  
      const eventDocRef = collection(db, "events");
      const eventDocSnapshot = await getDocs(eventDocRef);
  
      eventDocSnapshot.forEach((doc1) => {
        const documentData = doc1.data();
        if (documentData.title === eventTitle) {
          // Ensure volunteers and attendees are initialized as arrays
          documentData.volunteers = documentData.volunteers || [];
          documentData.attendees = documentData.attendees || [];
  
          if (isAdmin === true) {
            if (!documentData.volunteers.includes(userId)){
              documentData.volunteers.push(userId);

            }
          } else {
            if (!documentData.attendees.includes(userId)){
              documentData.attendees.push(userId);
            }
          }

          documentData.volunteers = documentData.volunteers || [];
          documentData.attendees = documentData.attendees || [];
  

          const docRef = doc(db, "events", doc1.id);
          updateDoc(docRef, {
            attendees: documentData.attendees,
            volunteers: documentData.volunteers,
          });
        }
        window.location.href = `/Decision/${userId}`
      });
    } catch (e) {
      console.log(e);
    }
  };
  

  useEffect(() => {
    // Fetch event data from Firestore inside a useEffect hook
    const fetchData = async () => {
      try {
        const eventDocRef = collection(db, "events");
        const eventDocSnapshot = await getDocs(eventDocRef);

        eventDocSnapshot.forEach((doc) => {
            const documentData = doc.data();

            if (documentData.title === eventTitle){
                setEventData(documentData)
            }
        })

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [eventTitle]); 

  if (loading) {
    // Render a loading state while data is being fetched
    return <div>Loading...</div>;
  }

  if (!eventData) {
    // Render an error message if event data is not found
    return <div>Event not found</div>;
  }

  return (
    <div className="background" id="eventDet">
      <Header2 />
      <div className="padding">
        <div className="details-container">
          <article>
            <h2>{eventData.title}</h2>
            <div className="eventDetails">
              <table className="details-table">
                <tbody>
                  <tr>
                    <td>Date:</td>
                    <td>{eventData.date}</td>
                  </tr>
                  <tr>
                    <td>Recurring Days:</td>
                    <td>{eventData.recurringDays}</td>
                  </tr>
                  <tr>
                    <td>Categories:</td>
                    <td>{eventData.interests.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>Zoom Link:</td>
                    <td>{eventData.zoom}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button onClick={addUser}>Add Event</button>
          </article>
        </div>
      </div>
    </div>
  );
};


export default EventDetails;

