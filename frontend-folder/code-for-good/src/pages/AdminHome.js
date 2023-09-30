import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <div>
      Welcome Admin!
      <div>
        <Link to="/Decision">
          <Button>
            Add/Join Events
          </Button>

        </Link>
        </div>
        <div>
        <Button>
            Approve/Disprove Events
        </Button>
        </div>
      </div>

  )
}

export default AdminHome