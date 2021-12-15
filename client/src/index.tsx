import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css'

import { User, UserContext } from './contexts/UserContext'

import Navbar from './elements/Navbar'

import Home from './pages/Home'
import Notes from './pages/dashboard/Notes'
import CreateNote from './pages/dashboard/CreateNote'
import Login from './pages/login/Login'
import Register from './pages/login/Register'

ReactDOM.render(
  <BrowserRouter>
    <UserContext.Provider value={ new User() }>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />

        <Route path="/create_note" element={<CreateNote />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
