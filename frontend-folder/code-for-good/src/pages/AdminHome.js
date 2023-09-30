import React from 'react'
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Header2 from '../components/Header2'

const Button = styled.button`
background-color: lightblue;
color: #fff;
font-size: 18px;
border: none;
border-radius: 4px;
cursor: pointer;
padding: 10px 60px;
border-radius: 5px;
margin: 10px;

&:hover {
  background-color: darkblue;
}
`;

function AdminHome() {
  const userId = useParams().userId;
  return (
    <div>
      <Header2 />
      <div className="background" id="decision">
        <h1 id="title">Choose to join an event or add an event</h1>
        <div className="flexDecision">
          <button
            className="addEvent"
            onClick={() => {
              window.location.href = `/AddEvent/${userId}`;
            }}
          >
            Add Event
          </button>
          <div id="vl"></div>
          <button
            className="addEvent"
            onClick={() => {
              window.location.href = `/EventDashboard/${userId}`;
            }}
          >
            Join Event
          </button>
          <div id="vl"></div>
          <button
            className="addEvent"
            onClick={() => {
              window.location.href = `/tentEventDashboard/${userId}`;
            }}
          >
            Verify Events Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome