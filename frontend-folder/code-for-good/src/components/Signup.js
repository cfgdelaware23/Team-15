import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/Signup.css';

import { db } from '../firebase-config.js';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';

const options = [
  { value: '1', label: 'Entertainment' },
  { value: '2', label: 'Sports' },
  { value: '3', label: 'Educational' },
];

function Signup() {
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
    }

    const temp1 = collection(db, "users");
    try {
        addDoc(temp1, data);
    } catch (e) {
        console.log(e); 
    }

  };

  return (
    <div>
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
            <input type="password" required />
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
  );
}

export default Signup;
