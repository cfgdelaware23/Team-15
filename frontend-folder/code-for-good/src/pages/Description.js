import React from "react";
import "../styles/Description.css"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'



const Description = () => {
    return (
        <div>
        <Header />
        <div className="background" id="homePg">
        <div className="description">
            <h1 id="title">Our Project</h1>
            <h1 className="text" id="homeText">
                Our project aims to help ACB expand and maintain their virtual
                volunteer-led programming, while maintaining accessibility for the blind
                and low vision community. Sign up to create, attend, and be a part of our amazing community!
            </h1>
            <h1 id="homeText">
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
                <Link to="/AiChat">
                    <button type="button" className="signup_button">
                        Need Help?
                    </button>
                </Link>
            </div>
        </div>
        <img className="homeMainImage" src="../MomandDaughterSmiling.jpg" alt="image of Mom and daughter"></img>
        </div>
        </div>
    );
};

export default Description;