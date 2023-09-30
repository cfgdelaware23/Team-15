import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Decision from './pages/Decision'
import AddEvent from './pages/AddEvent'
import AdminHome from './pages/AdminHome';
import UserSignup from './pages/UserSignup'
import UserSignIn from './pages/UserSignIn'
import Description from './pages/Description';
import EventDashboard from "./pages/EventDashboard";
import EventDetails from "./pages/EventDetails";
import AdminSignup from './pages/AdminSignup';
import AdminVerifyDash from './pages/AdminVerifyDash';
import AdminVerifyDetails from './pages/AdminVerifyDetails';
import Logout from './pages/Logout';
import AIChat from './pages/AIChat.js';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Description />} />
          <Route path="/UserSignUp" element={<UserSignup />} />
          <Route path="/UserSignIn" element={<UserSignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/UserSignIn" element={<UserSignup />} />
          <Route path="/Decision/:userId" element={<Decision />} />
          <Route path="/AddEvent/:userId" element={<AddEvent />} />
          <Route path="/AdminHome/:userId" element={<AdminHome />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/EventDashboard/:userId" element={<EventDashboard />} />
          <Route path="/events/:eventTitle/:userId" element={<EventDetails />} />
          <Route path="/tentEventDashboard/:userId" element={<AdminVerifyDash />} />
          <Route path="/tentEvents/:tentTitle" element={<AdminVerifyDetails />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/AiChat" element={<AIChat />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
