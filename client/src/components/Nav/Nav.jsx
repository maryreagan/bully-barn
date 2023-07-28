import React from 'react'
import { Link } from 'react-router-dom'
import { adminCheck } from '../../helpers/adminCheck'
import './nav.css'

function Nav() {
  const token = localStorage.getItem('token')
  const isAdmin = adminCheck()

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
      { isAdmin && <Link to='/chart'>Dashboard</Link>}
      <Link id='nav-logout' onClick={handleLogout}>Logout</Link>
      </nav>
  ) : (
    <nav>
    <Link to="/" id='bb-logo'>Bully Barn</Link>
    <Link id='nav-logout' to='/auth'>Login</Link>
    
    </nav>
  )
}

export default Nav