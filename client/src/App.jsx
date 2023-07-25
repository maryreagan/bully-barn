import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from "./components/Dog/Dog";
import Nav from "./components/Nav/Nav";
import ForgotPwd from "./components/Auth/ForgotPwd";



const renderNav = (Component) => {
  return (
    <>
    <Nav />
    <Component />
    </>
  )
}


import ResetPwd from "./components/Auth/ResetPwd";
import Form from "./components/Form/Form";
import AdminDash from "./components/Admin-Dash/Admin-Dash";
import AdoptionFeePage from "./components/Adoption-Fee/AdoptionFee";
import AddDog from "./components/Dog/AddDog";



const renderNav = (Component) => {
    return (
        <>
          <Nav />
          <Component />
        </>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={renderNav(Dog)} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/adoption-fee" element={<AdoptionFeePage />} />
                <Route path="/payment-status" element={<PaymentStatusPage />} />
                <Route path="/forgot-password" element={<ForgotPwd />} />
                <Route path="/add-dog" element={<AddDog />} />
                <Route path="/reset-password/:token" element={<ResetPwd />} />
            </Routes>
        </Router>
    );
}

export default App;
