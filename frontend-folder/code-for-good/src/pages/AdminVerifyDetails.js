import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import styles from "../styles/AdminVerifyDetails.css";
import Header2 from "../components/Header2.js"

const AdminVerifyDetails = () => {
  const { tentTitle } = useParams();

  const [tentEventData, setTentEventData] = useState(null); // Use null instead of []
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event data from Firestore inside a useEffect hook
    const fetchData = async () => {
      try {
        const eventDocRef = collection(db, "tentative-events");
        const eventDocSnapshot = await getDocs(eventDocRef);

        eventDocSnapshot.forEach((doc) => {
          const documentData = doc.data();

          if (documentData.title === tentTitle) {
            setTentEventData(documentData);
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [tentTitle]);

  if (loading) {
    // Render a loading state while data is being fetched
    return <div>Loading...</div>;
  }

  if (!tentEventData) {
    // Render an error message if event data is not found
    return <div>Event not found</div>;
  }

  const handleApprove = async () => {
    console.log("approved");
    let data = {
      title: tentEventData.title,
      date: tentEventData.date,
      recurring: tentEventData.recurring,
      recurringDays: tentEventData.recurringDays,
      interests: tentEventData.interests,
      zoom: tentEventData.zoom,
    };

    const temp1 = collection(db, "events");
    try {
      // Add the document to the 'events' collection
      await addDoc(temp1, data);

      const collectionRef = collection(db, "tentative-events");
      const querySnapshot = await getDocs(collectionRef);

      const tentEventId = [];
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();

        if (documentData.title === tentEventData.title) {
          tentEventId.push(doc.id);
        }
      });

      // Check if a matching document was found
      if (tentEventId.length > 0) {
        // Delete the document from 'tentative-events'
        await deleteDoc(doc(db, "tentative-events", tentEventId[0]));
      } else {
        console.log("No matching document found to delete.");
      }

      // Redirect only if the delete operation was successful
      window.location.href = `/TentEventDashboard/${tentTitle}`;
    } catch (e) {
      console.error("Error:", e);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="tentEventDetails">
      <Header2 />
      <article>
        <h2>{tentEventData.title}</h2>
        <p>Date is on {tentEventData.date}</p>
        <p>This event occurs every {tentEventData.recurringDays} days</p>
        <p>Categories: {tentEventData.interests.join(", ")}</p>
        <p>Zoom Link: {tentEventData.zoom}</p>
      </article>
      <button
        onClick={() => {
          handleApprove();
        }}
      >
        Approve
      </button>
    </div>
  );
};

export default AdminVerifyDetails;
