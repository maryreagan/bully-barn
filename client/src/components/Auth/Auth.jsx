import React, { useState, useEffect } from "react";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true); // New state for login/register mode
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for handling login status

    useEffect(() => {
        // Check if the user already has a valid token on component mount
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiration");
        if (token && tokenExpiration) {
            const currentTime = new Date().getTime();
            if (currentTime < tokenExpiration) {
                setIsLoggedIn(true);
            } else {
                // Token has expired, clear it from local storage
                localStorage.removeItem("token");
                localStorage.removeItem("tokenExpiration");
            }
        }
    }, []);

    const handleLogin = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login successful
                console.log("Login successful:", data);
                // Save the token and its expiration time to local storage
                const expirationTime =
                    new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours in milliseconds
                localStorage.setItem("token", data.token);
                localStorage.setItem("tokenExpiration", expirationTime);
                setIsLoggedIn(true);
            } else {
                // Login failed
                setError(data.message);
            }
        } catch (err) {
            setError("An error occurred while logging in.");
        }

        setIsLoading(false);
    };

    const handleLogout = () => {
        // Clear the token and reset the login state
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    };

    const handleRegister = async () => {
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch(
                "http://localhost:4000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Registration successful, switch to login mode
                setIsLoginMode(true);
            } else {
                // Registration failed
                setError(data.message);
            }
        } catch (err) {
            setError("An error occurred while registering.");
        }

        setIsLoading(false);
    };

    const handleToggleMode = () => {
        // Toggle between login and register mode
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2>Welcome! You are logged in.</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </>
            ) : (
                <>
                    <h2>{isLoginMode ? "Login" : "Register"}</h2>
                    {!isLoginMode && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    {isLoginMode ? (
                        <>
                            <button onClick={handleLogin} disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Log in"}
                            </button>
                            <p>
                                Don't have an account?{" "}
                                <button onClick={handleToggleMode}>
                                    Register
                                </button>
                            </p>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleRegister}
                                disabled={isLoading}
                            >
                                {isLoading ? "Registering..." : "Sign up"}
                            </button>
                            <p>
                                Already have an account?{" "}
                                <button onClick={handleToggleMode}>
                                    Log in
                                </button>
                            </p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default LoginComponent;
