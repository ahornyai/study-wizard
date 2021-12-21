import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAsyncResource } from 'use-async-resource'

import { syncUser, User, UserContext } from '../contexts/UserContext'

import Navbar from './Navbar'

import Home from '../pages/Home'
import Notes from '../pages/dashboard/Notes'
import CreateNote from '../pages/dashboard/CreateNote'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import AuthenticatedRoute from './AuthenticatedRoute'
import ViewNote from '../pages/dashboard/ViewNote'

const App = () => {
    const [ resource ] = useAsyncResource(syncUser, [])
    const syncedData = resource()
    const [ user, setUser ] = useState<User>(syncedData ? syncedData as User : new User())

    return (
        <UserContext.Provider value={ { user, setUser } } >
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/notes" element={<AuthenticatedRoute><Notes /></AuthenticatedRoute>} />
                <Route path="/notes/:id" element={<AuthenticatedRoute><ViewNote /></AuthenticatedRoute>} />

                <Route path="/create_note" element={<AuthenticatedRoute><CreateNote /></AuthenticatedRoute>} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="*" element={<ForgotPassword />} />
            </Routes>
        </UserContext.Provider>
    )
}

export default App