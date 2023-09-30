import React from 'react'
import '../styles/Decision.css'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button;


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