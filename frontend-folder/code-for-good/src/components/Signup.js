import React from 'react'
import Select from 'react-select';
import '../styles/Signup.css'

const options = [
  { value: '1', label: 'Entertainment' },
  { value: '2', label: 'Sports' },
  { value: '3', label: 'Educational' },
];

function Signup() {
  return (
    <div>
      <h1>Create Account</h1>
      <form >
        <div className='fieldContainer'>
          <label>
            First Name:
            <input type="text" required />
          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Last Name:
            <input type="text" required />
          </label>
        </div>
        <div className='fieldContainer'>
          <label>
            Email:
            <input type="email"  required />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Phone Number:
            <input type="text" required />
          </label>
        </div>
        <div className='fieldContainerLong'>
          <label>
            Password:
            <input type="password" required />
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
          classNamePrefix="select"/>
            </div>
        
    
        <button className="btn btn-primary mt-10" type="submit">Create Account</button>
      </form>

    </div>
  )
}

export default Signup