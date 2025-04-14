import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../../../styles/privacy.css'

const Privacy = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <p className="change-password-sub-heading">Update your password to keep your account secure</p>

      <div className="input-group">
        <label htmlFor="currentPassword" className="input-label">Current Password</label>
        <div className="input-wrapper">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            id="currentPassword"
            className="password-input"
            placeholder="Enter your current password"
          />
          <span className="password-icon" onClick={toggleCurrentPasswordVisibility}>
            {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="newPassword" className="input-label">New Password</label>
        <div className="input-wrapper">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            className="password-input"
            placeholder="Confirm your New password"
          />
          <span className="password-icon" onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="confirmNewPassword" className="input-label">Confirm New Password</label>
        <div className="input-wrapper">
          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            id="confirmNewPassword"
            className="password-input"
            placeholder="Confirm your New password"
          />
          <span className="password-icon" onClick={toggleConfirmNewPasswordVisibility}>
            {showConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      </div>

      <button className="save-changes-button">Save Changes</button>
    </div>
  );
};

export default Privacy;