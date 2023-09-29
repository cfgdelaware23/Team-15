import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/Header'
import Home from './pages/Home'
import Decision from './pages/Decision'
import AddEvent from './pages/AddEvent'

function App() {
  return (
    <div className="App">
       
     
  
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Decision" element={<Decision />} />
          <Route path="/AddEvent" element={<AddEvent />} />
            
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
