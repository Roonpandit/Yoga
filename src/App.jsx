import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Signup from "./components/Login/Signup"
import Home from './components/box/Home'
import HomePage from './pages/HomePage'
import MyGroupsPage from './pages/MyGroupsPage'
import ExploreAsanasPage from './pages/ExploreAsanasPage'
import ChallengesPage from './pages/ChallengesPage'
import User from './components/User/User'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<HomePage />} />
        <Route path="/users" element={<User />} />
        <Route path="/my-groups" element={<MyGroupsPage />} />
        <Route path="/explore-asanas" element={<ExploreAsanasPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App