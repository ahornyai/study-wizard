import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import Navbar from './elements/Navbar'

import Home from './pages/Home';
import Notes from './pages/Notes';

ReactDOM.render(
  <BrowserRouter>
    <div className="bg-gray-900 h-full">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
