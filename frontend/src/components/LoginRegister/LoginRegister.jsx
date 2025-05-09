import React, { useState } from "react";
import './LoginRegister.css'
import user_icon from '../../assets/user.png'
import pwd_icon from '../../assets/password.png'

const LoginRegister = () => {

  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signUp() {
    if (!username || !password) return;

    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("Error signing up: ", err));
  }

  function logIn() {
    if (!username || !password) return;

    fetch('/api/users/login', {
      method:'POST',
      headers: {
        'Content-type':'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error("Error loggin in: ", err));
  }


  return (

    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input 
            type="text" 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input" >
          <img src={pwd_icon} alt="" />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot password? <span>Click here</span></div>}
      <div className="submit-container">
        <div 
          className={action==="Login"?"submit gray":"submit"} 
          onClick={()=>{
            setAction("Sign Up");
            if (action === "Sign Up") signUp();
          }}>Sign Up
        </div>
        <div 
          className={action==="Sign Up"?"submit gray":"submit"} 
          onClick={()=>{
            setAction("Login");
            if (action === "Login") logIn();
          }}>Login
        </div>
      </div>
    </div>
  )
}

export default LoginRegister