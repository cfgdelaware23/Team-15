import React from "react";
import "../styles/Description.css"
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Description = () => {
    return (
        <div className="description">
        <h1>Our Project</h1>
        <h1 className="text">
            Our project aims to help ACB expand and maintain their virtual
            volunteer-led programming, while maintaining accessibility for the blind
            and low vision community. Sign up to create, attend, and be a part of our amazing community!
        </h1>
        <h1>
            Select your user type to get started!
        </h1>
        <Link to="/Home">
            <button className="button">
                Sign up!
            </button>
        </Link>


        </div>
    );
    };

export default Description;