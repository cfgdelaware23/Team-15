import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

const EventDetails = () => {
  const { eventTitle } = useParams();

  const [eventData, setEventData] = useState(null); // Use null instead of []
  const [loading, setLoading] = useState(true);

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
    <div className="eventDetails">
      <article>
        <h2>{eventData.title}</h2>
        <p>Date is on {eventData.date}</p>
        <p>This event occurs every {eventData.recurringDays} days</p>
        <p>Categories: {eventData.interests.join(", ")}</p>
        <p>Zoom Link: {eventData.zoom}</p>
      </article>
    </div>
  );
};

export default EventDetails;