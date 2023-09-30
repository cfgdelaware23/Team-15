import React from 'react';
import logo from '../assets/ACBlogo.png';  
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';

const Header = () => {
  return (
      <header className="header-container">
          <div className="logo-container">
              <img src={logo} alt="Website Logo" />
          </div>
          <div className="button-container">
              <Link className="nav-link mx-4" to="/UserSignup">
                  <button type="button" className="signup-button">
                      Sign up
                  </button>
              </Link>
          </div>
      </header>
  );
};


export default Header;
