import React, { useState } from 'react';
import '../../../styles/artisanInfo.css';
import { MdVerified } from "react-icons/md";
import { FaCamera } from "react-icons/fa";

const ArtisanInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State for main-pic

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Set the uploaded profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result); // Set the uploaded main image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-warning">
        <div className="warning-header">
          <MdVerified size={20} color="blue" /> ATTENTION REQUIRED
        </div>
        <div className="warning-text">
          <strong>Complete Profile Verification</strong>
          <p>
            Your profile is currently hidden from potential employers. Complete verification to make your profile visible and start receiving job requests.
          </p>
        </div>
        <button className="verify">Complete Verification</button>
      </div>

      <h2>Your Personal Information</h2>

      <div className="profile-banner">
        <div className="profile-pic-container">
          <img
            src={profileImage || ""}
            alt="Profile Preview"
            className="profile-pic"
          />
          <label htmlFor="profileImageInput" className="camera-icon">
            <FaCamera size={20} />
          </label>
          <input
            type="file"
            id="profileImageInput"
            onChange={handleProfileImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="main-pic-container">
          <img
            src={mainImage || ""}
            alt="Main Preview"
            className="main-pic"
          />
          <label htmlFor="mainImageInput" className="camera-icon main-camera-icon">
            <FaCamera size={20} />
          </label>
          <input
            type="file"
            id="mainImageInput"
            onChange={handleMainImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <form className="profile-form">
        <div className="form-row">
          <input type="text" placeholder="Full Name" defaultValue="Adeaze Jane" />
          <input type="text" placeholder="Business Name" defaultValue="Adeaze Jane" />
          <input type="email" placeholder="Email Address" defaultValue="adeazejane025@gmail.com" />
        </div>

        <div className="form-row">
          <select>
            <option>Select L.G.A</option>
          </select>
          <input type="text" placeholder="State" defaultValue="Lagos State" />
        </div>

        <div className="form-row">
          <input type="text" placeholder="Social Media URL" />
        </div>

        <div className="form-row">
          <input type="text" placeholder="Tag" />
        </div>

        <div className="form-row">
          <textarea placeholder="Type here"></textarea>
        </div>

        <button className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default ArtisanInfo;