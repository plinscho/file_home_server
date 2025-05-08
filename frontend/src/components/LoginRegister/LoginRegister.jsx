import React from "react";
import './LoginRegister.css'
import user_icon from '../../assets/user.png'
import pwd_icon from '../../assets/password.png'

const LoginRegister = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input" placeholder="Username">
          <img src={user_icon} alt="" />
          <input type="text" />
        </div>
        <div className="input" placeholder="Password">
          <img src={pwd_icon} alt="" />
          <input type="password" />
        </div>
      </div>
      <div className="forgot-password">Forgot password? <span>Click here</span></div>
      <div className="submit-container">
        <div className="submit">Sign Up</div>
        <div className="submit">Login</div>
      </div>
    </div>
  )
}

export default LoginRegister