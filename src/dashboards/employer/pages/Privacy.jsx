import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import '../../../styles/privacy.css';

const Privacy = () => {
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Toggle password visibility
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Submit function triggered');
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords don't match");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }
    console.log(handleSubmit)

    try {
      // Get authToken directly from localStorage
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        toast.error("Please login again");
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://artisanaid.onrender.com/v1/change/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({
          password: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password changed successfully");
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });
        setShowSuccessModal(true); // Show success popup
      } else {
        switch (data.message) {
          case 'Incorrect password':
            toast.error("The current password you entered is incorrect");
            break;
          case 'Account not found':
            toast.error("User account not found. Please login again");
            break;
          case 'Error changing password':
            toast.error("An error occurred while changing your password. Please try again");
            break;
          default:
            toast.error(data.message || "Error changing password");
        }
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("An error occurred while changing password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <p className="change-password-sub-heading">Update your password to keep your account secure</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="currentPassword" className="input-label">Current Password</label>
          <div className="input-wrapper">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              className="password-input"
              placeholder="Enter your current password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              required
              autoComplete="current-password"
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
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              minLength="8"
            />
            <span className="password-icon" onClick={toggleNewPasswordVisibility}>
              {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          <p className="password-hint">Password must be at least 8 characters long</p>
        </div>

        <div className="input-group">
          <label htmlFor="confirmNewPassword" className="input-label">Confirm New Password</label>
          <div className="input-wrapper">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              className="password-input"
              placeholder="Confirm your new password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              required
              autoComplete="new-password"
              minLength="8"
            />
            <span className="password-icon" onClick={toggleConfirmNewPasswordVisibility}>
              {showConfirmNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button 
          type="submit" 
          className="save-changes-button"
          disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword}
        >
          {isLoading ? 'Changing...' : 'Save Changes'}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay-password">
          <div className="modal-password">
            <h3 className='privacy-password'>Password Changed</h3>
            <p className='privacy-text'>Your password has been updated successfully.</p>
            <button className='Privacy-button' onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Privacy;
