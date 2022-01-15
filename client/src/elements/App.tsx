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
import UserContextRoute from './UserContextRoute'
import ViewNote from '../pages/dashboard/ViewNote'
import EditNote from '../pages/dashboard/EditNote'
import AcceptInvite from '../pages/dashboard/AcceptInvite'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const App = () => {
    const [ resource ] = useAsyncResource(syncUser, [])
    const syncedData = resource()
    const [ user, setUser ] = useState<User>(syncedData ? syncedData as User : new User())

    return (
        <UserContext.Provider value={ { user, setUser } } >
            <Navbar />
            
            <GoogleReCaptchaProvider reCaptchaKey={ process.env.REACT_APP_RECAPTCHA_SITE_KEY || "" } >
                <div className="app-holder">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        <Route path="/shared_notes" element={<UserContextRoute><Notes shared={ true } /></UserContextRoute>} />
                        <Route path="/notes" element={<UserContextRoute><Notes shared={ false } /></UserContextRoute>} />
                        <Route path="/notes/:id" element={<UserContextRoute><ViewNote /></UserContextRoute>} />
                        <Route path="/notes/edit/:id" element={<UserContextRoute><EditNote /></UserContextRoute>} />
                        <Route path="/notes/create" element={<UserContextRoute><CreateNote /></UserContextRoute>} />
                        <Route path="/notes/invite/:id" element={<UserContextRoute><AcceptInvite /></UserContextRoute>} />
                        
                        
                        <Route path="/login" element={<UserContextRoute redirectWhenAuthenticated={ true }><Login /></UserContextRoute>} />
                        <Route path="/register" element={<UserContextRoute redirectWhenAuthenticated={ true }><Register /></UserContextRoute>} />
                        <Route path="/forgot" element={<UserContextRoute redirectWhenAuthenticated={ true }><ForgotPassword /></UserContextRoute>} />

                        <Route path="*" element={<UserContextRoute redirectWhenAuthenticated={ true }><ForgotPassword /></UserContextRoute>} />
                    </Routes>
                </div>
            </GoogleReCaptchaProvider>
        </UserContext.Provider>
    )
}

export default App