import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home'
import AddEvent from './pages/AddEvent'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AddEvent" element={<AddEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
