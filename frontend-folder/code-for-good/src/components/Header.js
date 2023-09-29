import React from 'react';
import logo from '../assets/ACBlogo.png';  
import '../styles/Header.css';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Website Logo" />
        </header>
    );
};

export default Header;
