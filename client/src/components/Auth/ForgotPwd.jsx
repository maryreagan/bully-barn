import React, { useState } from 'react'
import './Auth.css'

function ForgotPwd() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

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
        });

        const data = await response.json();

        if (response.ok) {
          setMsg(data.message)
        } else  {
          setError(data.message)
        }
        
      } catch (err) {
        setError("Server error.")
      }
  }

  const renderMsg = () => {
    return (
      error ?
      error && <p className='error-message'>{error}</p>
      :
      msg && <p className='login-success'>{msg}</p>
    )
  }

  return (
    <div className="auth-container">
      <div className="login-container">
    <div>
    <h2>Forgot Password?</h2>
    <p id='reset-info'>We will send you an email with a link that you can use to reset your password.</p>
    {renderMsg()}
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
     <button onClick={handleSend}>Send Email</button>
    </div>
    </div>
    </div>
  )
}

export default ForgotPwd