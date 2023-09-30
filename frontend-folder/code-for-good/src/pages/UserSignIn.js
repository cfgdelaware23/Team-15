import React, { useState } from 'react';
import "../styles/UserSignIn.css";

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';

function UserSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();

        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);

        const userId = [];

        querySnapshot.forEach((doc) => {
            const documentData = doc.data();

            if (documentData.email === email && documentData.password === password) {
                userId.push(doc.id);
            }
        })
        if (userId.length === 0) {
            console.error('User not found');
            setError("Wrong Password!");
        }
        else {
            window.location.href = `/Decision?id=${userId[0]}`;
        }

        console.log(userId);

    };

    return <div id="formContainer">
        <h1>Sign In</h1>
        <div className="form-container">
            <form onSubmit={ handleClick}>
                <div className="Signin">
                    <div className='fieldContainerLong'>
                        <label>
                            Email:
                            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                    </div>
                    <div className='fieldContainerLong'>
                        <label>
                            Password:
                            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                    </div>
                </div>
                <button className="btn btn-primary mt-10" type="submit">Submit</button>
                <div>{error}</div>
            </form>
        </div>
    </div>;
}

export default UserSignIn;