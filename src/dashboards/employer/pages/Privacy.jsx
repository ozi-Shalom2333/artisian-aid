import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import '../../../styles/privacy.css';

const Privacy = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters with uppercase, lowercase, number, and special character");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      setIsLoading(false);
      // console.log("New passwords don't match");
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      setIsLoading(false);
      return;
    }

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error("Please login again");
      setIsLoading(false);
      return;
    }

    console.log(formData.newPassword)

    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://artisanaid.onrender.com/v1/change/password',
        {
          password: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      console.log(data)    
      toast.success(data.message || "Password changed successfully");
      setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setShowSuccessModal(true);

    } catch (err) {
      console.log(err);
      const errorMessage = err?.response?.data?.errors || err.response.message || "Error changing password";
      
      const errorHandlers = {
        'Incorrect password': "The current password you entered is incorrect",
        'Account not found': "User account not found. Please login again",
        'Authentication failed: Account is not logged in': () => {
          localStorage.removeItem('authToken');
          return "Your session has expired. Please log in again.";
        }
      };

      const handler = errorHandlers[errorMessage] || (() => errorMessage);
      toast.error(typeof handler === 'function' ? handler() : handler);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <p className="change-password-sub-heading">
        Update your password to keep your account secure
      </p>

      <form onSubmit={handleSubmit}>
       
        <div className="input-group">
          <label htmlFor="currentPassword" className="input-label">
            Current Password
          </label>
          <div className="input-wrapper">
            <input
              type={passwordVisibility.current ? 'text' : 'password'}
              id="currentPassword"
              className="password-input"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
            />
            <span 
              className="password-icon" 
              onClick={() => toggleVisibility('current')}
              aria-label={passwordVisibility.current ? "Hide password" : "Show password"}
            >
              {passwordVisibility.current ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

     
        <div className="input-group">
          <label htmlFor="newPassword" className="input-label">
            New Password
          </label>
          <div className="input-wrapper">
            <input
              type={passwordVisibility.new ? 'text' : 'password'}
              id="newPassword"
              className="password-input"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              minLength="8"
            />
            <span 
              className="password-icon" 
              onClick={() => toggleVisibility('new')}
              aria-label={passwordVisibility.new ? "Hide password" : "Show password"}
            >
              {passwordVisibility.new ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

        </div>

        <div className="input-group">
          <label htmlFor="confirmNewPassword" className="input-label">
            Confirm New Password
          </label>
          <div className="input-wrapper">
            <input
              type={passwordVisibility.confirm ? 'text' : 'password'}
              id="confirmNewPassword"
              className="password-input"
              placeholder="Confirm your new password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              minLength="8"
            />
            <span 
              className="password-icon" 
              onClick={() => toggleVisibility('confirm')}
              aria-label={passwordVisibility.confirm ? "Hide password" : "Show password"}
            >
              {passwordVisibility.confirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="save-changes-button"
          // disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword}
          // aria-busy={isLoading}
          style={
            isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword ?
            {backgroundColor: "lightgrey"} : {backgroundColor: "#1e3a8a"}
          }
        >
          {isLoading ? 'Changing...' : 'Save Changes'}
        </button>
      </form>

   
      {showSuccessModal && (
        <div className="modal-overlay-password">
          <div className="modal-password">
            <h3 className="privacy-password">Password Changed</h3>
            <p className="privacy-text">
              Your password has been updated successfully.
            </p>
            <button 
              className="Privacy-button" 
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close success message"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Privacy;
