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
import EditNote from '../pages/dashboard/EditNote'
import AcceptInvite from '../pages/dashboard/AcceptInvite'

const App = () => {
    const [ resource ] = useAsyncResource(syncUser, [])
    const syncedData = resource()
    const [ user, setUser ] = useState<User>(syncedData ? syncedData as User : new User())

    return (
        <UserContext.Provider value={ { user, setUser } } >
            <Navbar />
            
            <div className="app-holder">
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/shared_notes" element={<AuthenticatedRoute><Notes shared={ true } /></AuthenticatedRoute>} />
                    <Route path="/notes" element={<AuthenticatedRoute><Notes shared={ false } /></AuthenticatedRoute>} />
                    <Route path="/notes/:id" element={<AuthenticatedRoute><ViewNote /></AuthenticatedRoute>} />
                    <Route path="/notes/edit/:id" element={<AuthenticatedRoute><EditNote /></AuthenticatedRoute>} />
                    <Route path="/notes/create" element={<AuthenticatedRoute><CreateNote /></AuthenticatedRoute>} />
                    <Route path="/notes/invite/:id" element={<AuthenticatedRoute><AcceptInvite /></AuthenticatedRoute>} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<ForgotPassword />} />
                    <Route path="*" element={<ForgotPassword />} />
                </Routes>
            </div>
        </UserContext.Provider>
    )
}

export default App