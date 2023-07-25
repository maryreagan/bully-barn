import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

function Nav() {
  return (
    <nav>
    <Link to="/" id='bb-logo'>Bully Barn</Link>
    <Link to='/auth'>Login</Link>
    <Link to= "/add-dog">Add Dog</Link>

  </nav>
  )
}

export default Nav