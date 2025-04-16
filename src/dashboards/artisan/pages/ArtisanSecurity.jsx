import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../../styles/artisanSecurity.css'

const ArtisanSecurity = () => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
      });
    
      const togglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
      };
  return (
   <div className=''>
     <div className="password-container">
    <h4>Security & Privacy</h4>
    <h2>Change Password</h2>
    <p className="subtitle">Update your password to keep your account secure</p>

    <form className="password-form">
      <label>Current Password</label>
      <div className="input-group">
        <input
          type={showPassword.current ? "text" : "password"}
          placeholder="Enter your current password"
        />
        <span onClick={() => togglePassword("current")}>{
          showPassword.current ? <FaEyeSlash /> : <FaEye />
        }</span>
      </div>

      <label>New Password</label>
      <div className="input-group">
        <input
          type={showPassword.new ? "text" : "password"}
          placeholder="Confirm your New password"
        />
        <span onClick={() => togglePassword("new")}>{
          showPassword.new ? <FaEyeSlash /> : <FaEye />
        }</span>
      </div>

      <label>Confirm New Password</label>
      <div className="input-group">
        <input
          type={showPassword.confirm ? "text" : "password"}
          placeholder="Confirm your New password"
        />
        <span onClick={() => togglePassword("confirm")}>{
          showPassword.confirm ? <FaEyeSlash /> : <FaEye />
        }</span>
      </div>

      <button type="submit" className="save-btn">Save Changes</button>
    </form>
  </div>
   </div>
  )
}

export default ArtisanSecurity