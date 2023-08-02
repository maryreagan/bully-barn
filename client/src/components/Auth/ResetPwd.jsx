import React, { useState } from "react"
import "./Auth.css"
import { useParams, Link } from "react-router-dom"

function ResetPwd() {
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const { token } = useParams()

  const handleReset = async () => {
    const url = `http://127.0.0.1:4000/auth/reset-password/${token}`
    const body = await { newPwd }
    setError("")

    try {
      const response = await fetch(url, {
        method: "PUT",
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
      setError("Server error")
    }
  }

  const renderMsg = () => {
    return error
      ? error && <p className="error-message">{error}</p>
      : msg && (
          <>
            <p className="login-success">{msg}</p>
            <p className="login-success">
              Go to{" "}
              <Link id="link-to-login" to={"/auth"}>
                Login
              </Link>
            </p>
          </>
        )
  }

  return (
    <>
      <div className="background-wrapper">
      <div className="auth-container">
        <div className="login-container">
          <div>
            <h2>Reset Your Password</h2>
            {!msg && <p id="reset-info">Please enter your new password.</p>}
            {renderMsg()}
            <input
              type="password"
              placeholder="New Password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
            <button className='auth-button' onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ResetPwd
