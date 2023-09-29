import React, { useState } from 'react';
//import styles from "frontend-folder/code-for-good/src/styles/AddEvent.css";

const AddEvent = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState("");
    const [zoom, setZoom] = useState("");

    return (
        <div>
            <h1>Please fill out the details below to add an event!</h1>
        </div>
    );
};

export default AddEvent;
