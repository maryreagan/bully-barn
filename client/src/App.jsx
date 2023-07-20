import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Auth from "./components/Auth/Auth";
import Dog from './components/Dog/Dog'
import Nav from "./components/Nav/Nav";

const renderNav = (Component) => {
  return (
    <>
    <Nav />
    <Component />
    </>
  )
}

function App() {
    return (
      <Router>
    <Routes>
      <Route path='/' element={renderNav(Dog)}/>
      <Route path="/auth" element={<Auth />} />
      </Routes>
  </Router>
  
    );
}

export default App;
