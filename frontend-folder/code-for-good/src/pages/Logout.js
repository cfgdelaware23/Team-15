import React from "react";
import "../styles/Home.css";
import AddEvent from "./AddEvent";
import Decision from "./Decision";
import UserSignup from "./UserSignup";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className={"pageLayout"}>
      <h1>Home Page</h1>
      <p>
        <center>
          Thanks For Using Our Site!
          <div className="button-container">
            <Link className="nav-link mx-4" to="/">
              <button type="button" className="signup-button">
                Home
              </button>
            </Link>
          </div>
        </center>{" "}
      </p>
    </div>
  );
}

export default Home;
