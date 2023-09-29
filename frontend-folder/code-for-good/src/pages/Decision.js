import React from 'react'
import styled from 'styled-components';

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
`;


function Decision() {
  return (
    <div>Decision
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