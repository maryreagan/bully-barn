import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

function Nav() {
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    // Clear the token and reset the login state
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("administrator");
    location.reload()
    };

    return token ? (
      <nav>
      <Link to="/" id='bb-logo'>Bully Barn</Link>
      <Link onClick={handleLogout}>Logout</Link>
      <Link to= "/add-dog">Add Dog</Link>
      </nav>
  ) : (
    <nav>
    <Link to="/" id='bb-logo'>Bully Barn</Link>
    <Link to='/auth'>Login</Link>
    <Link to= "/add-dog">Add Dog</Link>
    </nav>
  )
}

export default Nav