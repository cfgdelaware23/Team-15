import React, { useState } from 'react';
import styles from "../styles/JoinEvent.css";

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, QuerySnapshot } from 'firebase/firestore';

const JoinEvent = () => {


    return (
        <div className={styles.createEvent}>
        </div>
    );
};

export default JoinEvent;
