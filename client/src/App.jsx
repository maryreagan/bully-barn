import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Auth from "./components/Auth/Auth";import Dog from './components/Dog/Dog'

function App() {
  return (
    <>
    <Dog />
    </>
  )
    return (
        <>
            <Auth />
        </>
    );
}

export default App;
