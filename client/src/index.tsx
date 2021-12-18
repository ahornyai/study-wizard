import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './i18n'

import { User, UserContext } from './contexts/UserContext'

import Navbar from './elements/Navbar'

import Home from './pages/Home'
import Notes from './pages/dashboard/Notes'
import CreateNote from './pages/dashboard/CreateNote'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Loader from 'react-loader-spinner'

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={150}
            width={150}
          />
      </div> } >
      <UserContext.Provider value={ new User() }>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />

          <Route path="/create_note" element={<CreateNote />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
        </Routes>
      </UserContext.Provider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
