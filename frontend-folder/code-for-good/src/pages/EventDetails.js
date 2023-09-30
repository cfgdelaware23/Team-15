import { useParams } from "react-router-dom";

const EventDetails = () => {

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
      },
    ];
    
    const {id} = useParams()

    const eventId = parseInt(id, 10);

    const thisEvent = events.find((item) => item.id === eventId);

    return (
        <div className="eventDetails">
            <article>
                <h2>{thisEvent.title}</h2>
                <p>Date is on {thisEvent.date} </p>
                <p>This event occurs every {thisEvent.recurring} days </p>
                <p>Categories: {thisEvent.category}</p>
                <p>Zoom Link: {thisEvent.zoomLink}</p>

            </article>
        </div>
    );
    
}

export default EventDetails;