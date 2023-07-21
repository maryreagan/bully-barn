import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from './components/Dog/Dog'
import Nav from "./components/Nav/Nav";
import ForgotPwd from "./components/Auth/ForgotPwd";
import AddDog from "./components/Dog/AddDog";

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
      <Route path="/forgot-password" element={<ForgotPwd />} />
      <Route path="/add-dog" element={<AddDog />} />
      </Routes>
  </Router>
  
    );
}

export default App;
