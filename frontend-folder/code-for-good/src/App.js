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
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Decision" element={<Decision />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/JoinEvent" element={<JoinEvent />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/UserSignup" element={<UserSignup />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
