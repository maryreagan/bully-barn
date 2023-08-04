import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminCheck } from '../../helpers/adminCheck'
import './nav.css'

function Nav() {
  const token = localStorage.getItem('token')
  const isAdmin = adminCheck()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear the token and reset the login state
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("administrator");
    navigate('/')
    };

    return token ? (
      <nav>
      <Link to={'/'}><img className="barn-logo" src='https://freesvg.org/img/1401952018.png' /></Link>
      <Link to="/" id='bb-logo'>Bully Barn</Link>
      { isAdmin && <Link to='/chart'>Dashboard</Link>}
      <Link to='/about'>About Us</Link>
      <Link id='nav-logout' onClick={handleLogout}>Logout</Link>
      </nav>
  ) : (
    <nav>
    <Link to={'/'}><img className="barn-logo" src='https://freesvg.org/img/1401952018.png' /></Link>
    <Link to="/" id='bb-logo'>Bully Barn</Link>
    <Link to='/about'>About Us</Link>
    <Link id='nav-logout' to='/auth'>Login</Link>
    </nav>
  )
}

export default Nav