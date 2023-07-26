import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from "./components/Dog/Dog";
import Nav from "./components/Nav/Nav";
import ForgotPwd from "./components/Auth/ForgotPwd";
import ResetPwd from "./components/Auth/ResetPwd";
import Form from "./components/Form/Form";
import AdminDash from "./components/Admin-Dash/Admin-Dash";
import AdoptionFeePage from "./components/Adoption-Fee/AdoptionFee";
import AddDog from "./components/Dog/AddDog";
import PaymentStatusPage from './components/Adoption-Fee/PaymentStatusPage'
import Footer from "./components/Nav/Footer";



const renderNav = (Component) => {
    return (
        <>
          <Nav />
          <Component />
          <Footer />
        </>
    );
};

const renderFooter = (Component) => {
    return (
        <>
          <Component />
          <Footer />
        </>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={renderNav(Dog)} />
                <Route path="/auth" element={renderFooter(Auth)} />
                <Route path="/adoption-fee" element={renderFooter(AdoptionFeePage)} />
                <Route path="/payment-status" element={<PaymentStatusPage />} />
                <Route path="/forgot-password" element={renderFooter(ForgotPwd)} />
                <Route path="/add-dog" element={renderFooter(AddDog)} />
                <Route path="/reset-password/:token" element={renderFooter(ResetPwd)} />
            </Routes>
        </Router>
    );
}

export default App;
