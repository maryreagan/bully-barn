import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from './components/Dog/Dog'
import Nav from "./components/Nav/Nav";
import AdoptionFeePage from "./components/Adoption-Fee/AdoptionFee"
import PaymentStatusPage from './components/Adoption-Fee/PaymentStatusPage'


const renderNav = (Component) => {
  return (
    <>
    <Nav />
    <Component />
    </>
  )
}

import ForgotPwd from "./components/Auth/ForgotPwd";


function App() {
  const renderNav = (Component) => {
    return (
      <>
      <Nav />
      <Component />
      </>
    )
  }

    return (
      <Router>
    <Routes>
      <Route path='/' element={renderNav(Dog)}/>
      <Route path="/auth" element={<Auth />} />
      <Route path="/adoption-fee" element={<AdoptionFeePage />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
      <Route path="/forgot-password" element={<ForgotPwd />} />
      </Routes>
  </Router>
  
    );
}

export default App;
