import React, { useState } from "react";
import { useAuth } from '../AuthProvider/Authprovider';
import './LoginRegister.css';
import user_icon from '../../assets/user.png';
import pwd_icon from '../../assets/password.png';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  function signUp() {
    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }
    setError("");

    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.detail || "Registration failed");
        });
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      setAction("Login");
      setError("Registration successful! Please login.");
    })
    .catch(err => {
      console.error("Error signing up: ", err);
      setError(err.message);
    });
  }

  function logIn() {
    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }
    setError("");

    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.detail || "Login failed");
        });
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      login({ username, id: data.user_id });
      navigate('/home'); // Redirect to home page
    })
    .catch(err => {
      console.error("Error logging in: ", err);
      setError(err.message);
    });
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input 
            type="text" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={pwd_icon} alt="" />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {action === "Login" && (
        <div className="forgot-password">Forgot password? <span>Click here</span></div>
      )}
      <div className="submit-container">
        <div 
          className={action === "Sign Up" ? "submit" : "submit gray"} 
          onClick={() => {
            setAction("Sign Up");
            if (action === "Sign Up") signUp();
          }}
        >
          Sign Up
        </div>
        <div 
          className={action === "Login" ? "submit" : "submit gray"} 
          onClick={() => {
            setAction("Login");
            if (action === "Login") logIn();
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;