import React from 'react'
import '../styles/Decision.css'
import styled from 'styled-components';

const Button = styled.button`
  background-color: green;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
`;


function Decision() {
  return (
    <div>
      <h1>Choose to join an event or add an event</h1>
      <Button>
        Add Event 
      </Button>

      <Button >
        Join Event 
      </Button>



    </div>

    

  )
}


export default Decision