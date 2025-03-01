import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MyGroupsPage from './pages/MyGroupsPage'
import ExploreAsanasPage from './pages/ExploreAsanasPage'
import ChallengesPage from './pages/ChallengesPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-groups" element={<MyGroupsPage />} />
        <Route path="/explore-asanas" element={<ExploreAsanasPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App