import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/Signup.css';

const options = [
  { value: '1', label: 'Entertainment' },
  { value: '2', label: 'Sports' },
  { value: '3', label: 'Educational' },
];

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    interests: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      interests: selectedOptions.map(option => option.label),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
      <div className='fieldContainer'>
          <label>
            First Name:
            <input type="text" name="firstName" required onChange={handleInputChange} />

          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Last Name:
            <input type="text" name="lastName" required onChange={handleInputChange} />

          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Email:
            <input type="email" name="email" required onChange={handleInputChange} />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" required onChange={handleInputChange} />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Password:
            <input type="password" name="password" required onChange={handleInputChange} />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" required onChange={handleInputChange} />
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
