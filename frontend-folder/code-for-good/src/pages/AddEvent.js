import React, { useState } from 'react';
import styles from "../styles/AddEvent.css";

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';

const AddEvent = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [zoom, setZoom] = useState("");


    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Title:", title);
        console.log("Date:", date);
        console.log("Recurring:", isRecurring);
        console.log("Zoom Link:", zoom);

        let data = {
            title: title,
            date: date,
            recurring: isRecurring,
            zoom: zoom,
        }

        const temp1 = collection(db, "events");
        try {
            addDoc(temp1, data);
        } catch (e) {
            console.log(e); 
        }
    };

    return (

        <div>
            <h1>Please fill out the details below to add an event!</h1>
            <div className={styles.createEvent}>
                <h1>Hello!</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Date:
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Recurring:
                        <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
                    </label>
                    <br />
                    <label>
                        Zoom Link:
                        <input type="text" value={zoom} onChange={(e) => setZoom(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    );
};

export default AddEvent;
