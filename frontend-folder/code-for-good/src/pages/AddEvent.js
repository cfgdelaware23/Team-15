import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "../styles/AddEvent.css";

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, getDocs, getDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Header2 from '../components/Header2';
import { useParams  } from 'react-router-dom';

const options = [
    { value: '1', label: 'Entertainment' },
    { value: '2', label: 'Sports' },
    { value: '3', label: 'Educational' },
    { value: '4', label: 'Cooking' },
    { value: '5', label: 'Music'},
    { value: '6', label: 'Business'},
    { value: '7', label: 'Politics'},
    { value: '8', label: 'News'},
    { value: '9', label: 'Board Games'},
    { value: '10', label: 'Literature'}
];

const AddEvent = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringDays, setRecurringDays] = useState("");
    const [zoom, setZoom] = useState("");
    const [interests, setInterests] = useState([]);

    const userId = useParams().userId;
  
    const handleSelectChange = (selectedOptions) => {
      setInterests(selectedOptions.map(option => option.label))
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (interests.length == 0) {
            alert("please select 1 option");
            return;
        }
        console.log("Title:", title);
        console.log("Date:", date);
        console.log("Recurring:", isRecurring);
        console.log("Zoom Link:", zoom);


        let data = {
            title: title,
            date: date,
            recurring: isRecurring,
            recurringDays: isRecurring ? recurringDays : null,
            interests: interests,
            zoom: "https://duke.zoom.us/j/96991984393",
        }
        console.log(data);
        const temp1 = collection(db, "tentative-events");
        try {
            addDoc(temp1, data);
        } catch (e) {
            console.log(e); 
        }

        setTitle("");
        setDate("");
        setIsRecurring(false);
        setRecurringDays("");
        setZoom("");
        setInterests("");

        const documentRef = doc(db, "users", userId);
        getDoc(documentRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              // Document exists, you can access its data using docSnapshot.data()
              const documentData = docSnapshot.data();
              
              if (documentData.admin == true) {
                window.location.href = `/AdminHome/${userId}`;
              }
              else {
                window.location.href = `/decision/${userId}`;
              }
            } else {
              console.log("Document does not exist.");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
        });


    };

    return (
        <div>
        <Header />
        <div className='background'>
            <h1 id='title'>Please fill out the details below to add an event!</h1>
            <div className="addEventWrap">
                <div className = "createEvent">
                <h2>Create Event</h2>
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
                    {isRecurring && (
                        <label>

                            Reoccurs after how many days? (Enter a number):

                            <input type="number" value={recurringDays} onChange={(e) => setRecurringDays(e.target.value)} />
                        </label>
                    )}
                    <label>
                        Zoom Link:
                        <input type="text" value={zoom} onChange={(e) => setZoom(e.target.value)} />
                    </label>
                    <Select
                        isMulti
                        name="interests"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSelectChange}
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                </div>  

            </div>
        </div>
        </div>
    );
};

export default AddEvent;
