import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import Navbar from './elements/Navbar'

import Home from './pages/Home';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />

      <Route path="/create_note" element={<CreateNote />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
