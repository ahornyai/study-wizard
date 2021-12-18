import { Route, Routes } from 'react-router-dom'
import { useAsyncResource } from 'use-async-resource'

import { syncUser, UserContext } from '../contexts/UserContext'

import Navbar from './Navbar'

import Home from '../pages/Home'
import Notes from '../pages/dashboard/Notes'
import CreateNote from '../pages/dashboard/CreateNote'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'

const App = () => {
    const [ user ] = useAsyncResource(syncUser, [])

    return (
        <UserContext.Provider value={ user() } >
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<Notes />} />

                <Route path="/create_note" element={<CreateNote />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="*" element={<ForgotPassword />} />
            </Routes>
        </UserContext.Provider>
    )
}

export default App