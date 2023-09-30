import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/UserSignup.css';
import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import emailjs from 'emailjs-com';

const options = [
  { value: '1', label: 'Entertainment' },
  { value: '2', label: 'Sports' },
  { value: '3', label: 'Educational' },
];

//email sender
const sendEmail = (fromEmail, toEmail, subject, body) => {
  // Template parameters
  const templateParams = {
      from_name: fromEmail,
      to_name: toEmail,
      message: body,
  };

  return emailjs.send('service_koh4h1e', 'template_gt1ckdt', templateParams)
      .then((response) => {
          console.log('Email sent successfully:', response.status, response.text);
          return true;
      })
      .catch((error) => {
          console.log('Failed to send the email:', error);
          return false;
      });
}





// Calculate Jaccard similarity coefficient in order to find the most similar user based on interests
const jaccardSimilarity = (a, b) => {
  const intersection = a.filter(value => b.includes(value)).length;
  const union = new Set([...a, ...b]).size;
  return intersection / union;
};


// Find the most similar user based on interests
const findMostSimilarUser = async (currentUserInterests, currentUserEmail) => {
  const usersRef = collection(db, "users");
  const allUsers = await getDocs(usersRef);
  // console.log(allUsers);
  let maxSimilarity = 0;
  let mostSimilarUser = null;
  // console.log(currentUserInterests);
  allUsers.forEach((doc) => {
      const userData = doc.data();

      // Exclude the current user from comparison
      if (userData.email !== currentUserEmail && userData.interests) {
          const similarity = jaccardSimilarity(currentUserInterests, userData.interests);
          // console.log(similarity);
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
  const [attendees, setAttendees] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

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
      attendees: attendees,
      volunteers: volunteers
    }

    const temp1 = collection(db, "users");
    try {
        addDoc(temp1, data);
        // find similar user and send email
        const similarUser = await findMostSimilarUser(data.interests, data.email);

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
        <button className="btn btn-primary mt-10" type="submit">Create Account</button>
      </form>
    </div>
    </div>
  );
}

export default UserSignup;
