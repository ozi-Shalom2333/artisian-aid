import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'; 
import '../../../styles/artisanSecurity.css';

const ArtisanSecurity = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic
      const response = await axios.post(
        'https://artisanaid.onrender.com/v1/change/password', 
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Password changed successfully!');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert('Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sec">
      <h4>Security & Privacy</h4>
      <div className="password-container">
        <h2>Change Password</h2>
        <p className="subtitle">Update your password to keep your account secure</p>

        <form className="password-form" onSubmit={handleSubmit}>
          <label>Current Password</label>
          <div className="input-group">
            <input
              type={showPassword.current ? 'text' : 'password'}
              placeholder="Enter your current password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => togglePassword('current')}>
              {showPassword.current ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label>New Password</label>
          <div className="input-group">
            <input
              type={showPassword.new ? 'text' : 'password'}
              placeholder="Enter your new password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => togglePassword('new')}>
              {showPassword.new ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <label>Confirm New Password</label>
          <div className="input-group">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              placeholder="Confirm your new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span onClick={() => togglePassword('confirm')}>
              {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtisanSecurity;