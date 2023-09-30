import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/UserSignIn.css";

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import Header from '../components/Header';

function UserSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();

        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);

        const userId = [];
        let adminCheck = false;

        querySnapshot.forEach((doc) => {
            const documentData = doc.data();

            if (documentData.email === email && documentData.password === password) {
                userId.push(doc.id);
                adminCheck = documentData.admin;
            }
        })
        if (userId.length === 0) {
            console.error('User not found');
            setError("Wrong Password!");
        }
        else {
            console.log(adminCheck);
            if (adminCheck) {
                window.location.href = `/AdminHome/${userId[0]}`;
                return;
            }
            window.location.href = `/Decision/${userId[0]}`;
        }

        console.log(userId);

    };

    return (
        <div>
        <Header/>
        <div className='signin-page'>
        <div className='signin-container'>
        <h1 id="title">Sign In</h1>
        <div className="anotherWrapper">
        <div className="form-container">
            <form onSubmit={ handleClick}>
                <div className="Signin">
                    <div className='fieldContainerLong'>
                        <label>
                            Email:
                            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                    </div>
                    <div className='fieldContainerLong'>
                        <label>
                            Password:
                            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                    </div>
                </div>
            
            <div className="wrapperSignIn">
                <button className="btn btn-primary mt-10" type="submit">Submit</button>
                <Link className="create-account-link" to={"/UserSignup"}><strong>Create Account</strong></Link>
            </div>
            <div>{error}</div>
        </form>
        </div>
        </div>
    </div>
    </div>
    </div>
  );
}

export default UserSignIn;