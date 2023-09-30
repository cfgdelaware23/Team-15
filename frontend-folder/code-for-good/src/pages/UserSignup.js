import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Select from 'react-select';
import '../styles/UserSignup.css';
import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import Header from '../components/Header';

const options = [
  { value: "1", label: "Entertainment" },
  { value: "2", label: "Sports" },
  { value: "3", label: "Educational" },
  { value: "4", label: "Cooking" },
  { value: "5", label: "Music" },
  { value: "6", label: "Business" },
  { value: "7", label: "Politics" },
  { value: "8", label: "News" },
  { value: "9", label: "Board Games" },
  { value: "10", label: "Literature" },
];

//email sender
const sendEmail = (from_name, toEmail, subject, body) => {
  // Template parameters
    const templateParams = {
      from_name: from_name,
      to_name: toEmail,
      message: body,
    };

    return emailjs.send('service_koh4h1e', 'template_0zr93pf', templateParams, 'p7NFUElMtjchq9ahb')
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text);
            return true;
        })
        .catch((error) => {
            console.log('Failed to send the email:', error);
            return false;
        });
}






// Calculate Jaccard similarity coefficient
const jaccardSimilarity = (a, b) => {
  const intersection = a.filter(value => b.includes(value)).length;
  const union = new Set([...a, ...b]).size;
  return intersection / union;
};



const findMostSimilarUser = async (currentUserInterests, currentUserEmail) => {
  const usersRef = collection(db, "users");
  const allUsers = await getDocs(usersRef);

  let maxSimilarity = 0;
  let mostSimilarUser = null;

  allUsers.forEach((doc) => {
      const userData = doc.data();

      // Exclude the current user from comparison
      if (userData.email !== currentUserEmail && userData.interests) {
          const similarity = jaccardSimilarity(currentUserInterests, userData.interests);
          
          if (similarity > maxSimilarity) {
              maxSimilarity = similarity;
              mostSimilarUser = userData;
          }
      }
  });

  return mostSimilarUser;
}





function UserSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setInterests(selectedOptions.map(option => option.label))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      interests: interests,
      admin: false,
    }
    

    const temp1 = collection(db, "users");
    try {
        addDoc(temp1, data);
        console.log("try statement");
        
        const collectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(collectionRef);
        const userId = [];
        querySnapshot.forEach((doc) => {
            const documentData = doc.data();

            if (documentData.email === email && documentData.password === password) {
                userId.push(doc.id);
            }
        })

        window.location.href = `/Decision/${userId[0]}`;
        
     } catch (e) {
        console.log(e); 
    }

  };

  return (
    <div><Header/>
    <div className='container'>
      <div className="form-container">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div className='fieldContainer'>
          <label>
            First Name:
            <input type="text" onChange={(e) => setFirstName(e.target.value)} required />
          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Last Name:
            <input type="text" onChange={(e) => setLastName(e.target.value)} required />
          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Email:
            <input type="email" onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Phone Number:
            <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} required />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Password:
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" required/>
          </label>
        </div>
        <div className='fieldContainerLong'>
        <label className="form-label">
          What are your interests?
        </label>
        <Select
          isMulti
          name="interests"
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSelectChange}
        />
            </div>
      <div className="signupFlex">
        <button className="btn btn-primary mt-10" type="submit" >Create Account</button>
      </div>
      </form>
    </div>
    <div className='mt-1'>
          <p>Already a user? <Link to={"/UserSignIn"}><strong>Login here</strong></Link></p>
      </div>
    </div>
    </div>
  );
}

export default UserSignup;
