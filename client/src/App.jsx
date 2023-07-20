import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AdoptionFeePage from "./components/Adoption-Fee/AdoptionFee"
import PaymentStatusPage from './components/Adoption-Fee/PaymentStatusPage'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/adoption-fee" element={<AdoptionFeePage />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
