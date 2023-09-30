import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Decision from './pages/Decision'
import AddEvent from './pages/AddEvent'
import JoinEvent from './pages/JoinEvent'
import AdminHome from './pages/AdminHome';
import UserSignup from './components/UserSignup';

function App() {
  return (
    <div className="App">  
import UserSignup from './pages/UserSignup'
import UserSignIn from './pages/UserSignIn'
import Description from './pages/Description';
import EventDashboard from "./pages/EventDashboard";
import EventDetails from "./pages/EventDetails";


function App() {
  return (
    <div className="App">
      
      <Header />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Description />} />
          <Route path="/UserSignUp" element={<UserSignup />} />
          <Route path="/UserSignIn" element={<UserSignIn />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/UserSignIn" element={<UserSignup />} />
          <Route path="/Decision" element={<Decision />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/JoinEvent" element={<JoinEvent />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/EventDashboard" element={<EventDashboard />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
