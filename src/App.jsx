import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Authentication from './pages/Authentication'
import { createProfile } from './utils/auth'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import CreateProfile from './pages/CreateProfile'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path={'/auth'} element={<Authentication />} />
        <Route path='/edit-profile' element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path='/create-profile' element={
          <ProtectedRoute>
            <CreateProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
