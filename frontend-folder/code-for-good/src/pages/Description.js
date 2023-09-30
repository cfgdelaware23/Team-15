import React from "react";
import "../styles/Description.css"
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Description = () => {
    return (
        <div className="background">
        <div className="description">
            <h1 id="title">Our Project</h1>
            <h1 className="text" id="homeText">
                Our project aims to help ACB expand and maintain their virtual
                volunteer-led programming, while maintaining accessibility for the blind
                and low vision community. Sign up to create, attend, and be a part of our amazing community!
            </h1>
            <h1>
                Click below to join our community or log in instead!
            </h1>
            <div className="buttonContainer">
                <Link to="/UserSignup">
                    <button type="button" className="signup_button">
                        Sign up
                    </button>
                </Link>
                <Link to="/UserSignIn">
                    <button type="button" className="signup_button">
                        Log In
                    </button>
                </Link>
            </div>
        </div>
        </div>
    );
    };

export default Description;