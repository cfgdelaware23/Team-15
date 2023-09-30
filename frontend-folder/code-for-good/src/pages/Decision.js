import React from 'react'
import '../styles/Decision.css'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
background-color: #93C5CD;
color: #fff;
font-size: 18px;
font-family: 'Poppins', sans-serif;
font-weight: 600;
border: none;
border-radius: 4px;
cursor: pointer;
padding: 10px 60px;
border-radius: 5px;
margin: 10px;

&:hover {
  background-color: darkblue;
<<<<<<< HEAD
 
}

&:hover {
  background-color: darkblue;
=======

 

>>>>>>> 3a8a52e278f21fc83e193464859c80afbca61d64
}
`;


function Decision() {
  return (
    <div className="background" id="decision">
      <h1 id="title">Choose to join an event or add an event</h1>
      <div className="flexDecision">
        <button className="addEvent" onClick={() => {
          window.location.href = "/AddEvent";
        }}>
          Add Event 
        </button>
        <div id="vl"></div>
        <button className="addEvent" onClick={() => {
          window.location.href = "/JoinEvent"
        }}>
          Join Event 
        </button>
      </div>
    </div>

    

  )
}


export default Decision