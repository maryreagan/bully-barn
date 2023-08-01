import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import './Auth.css'

function ForgotPwd() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  const handleSend = async () => {
    const url = "http://127.0.0.1:4000/auth/forgot-password"
    const body = await { email }
    setError("")

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        setMsg(data.message)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Server error.")
    }
  }

  const renderMsg = () => {
    return error
      ? error && <p className="error-message">{error}</p>
      : msg && <p className="login-success">{msg}</p>
  }

  return (
    <>
      <div className="background-wrapper">
      <Link to={'/'}><img className="barn-logo" src='https://freesvg.org/img/1401952018.png' /></Link>
      <div className="auth-container">
        <div className="login-container">
          <div>
          <IconButton style={{ bottom: '25px', right: '30px' }} onClick={() => navigate('/auth')}>
          <ArrowBackIcon />
          </IconButton>
            <h2>Forgot Password?</h2>
            <p id="reset-info">
              We will send you an email with a link that you can use to reset
              your password.
            </p>
            {renderMsg()}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className='auth-button' onClick={handleSend}>Send Email</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ForgotPwd