import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import '../../../styles/artisanInfo.css';
import { MdVerified } from "react-icons/md";
import { MdOutlineCameraAlt } from "react-icons/md";

const ArtisanInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload profile image to the server
      await uploadImage(file, 'profile');
    }
  };

  const handleMainImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload main image to the server
      await uploadImage(file, 'main');
    }
  };

  const uploadImage = async (file, type) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type); // Specify the type (profile or main)

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post(
        'https://artisanaid.onrender.com/v1/update/cover', // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`${type === 'profile' ? 'Profile' : 'Main'} image uploaded successfully!`);
      } else {
        alert(`Failed to upload ${type === 'profile' ? 'profile' : 'main'} image.`);
      }
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
      alert(`An error occurred while uploading the ${type} image. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.put(
        'https://artisanaid.onrender.com/v1/update/profile', // Replace with your API endpoint
        {
          ...formData,
          profileImage,
          mainImage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile. Please try again.');
    } finally {
      setLoading(false);
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
          <label htmlFor="profileImageInput" className="camera-icons">
            <MdOutlineCameraAlt size={30} color="white" />
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
          <label htmlFor="mainImageInput" className="main-camera-icon">
            <MdOutlineCameraAlt size={30} color="white" />
          </label>
          <input
            type="file"
            id="mainImageInput"
            onChange={handleMainImageChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <form className="profile-form" onSubmit={handleProfileUpdate}>
        <div className="form-row">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            readOnly
          />
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleInputChange}
            readOnly
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            readOnly
          />
        </div>

        <div className="form-row">
          <select name="state" value={formData.state} onChange={handleInputChange}>
            <option value="Lagos State">Lagos State</option>
            <option value="Abuja">Abuja</option>
            <option value="Kano">Kano</option>
          </select>
          <input
            type="text"
            name="socialMediaURL"
            placeholder="Social Media URL"
            value={formData.socialMediaURL}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="tag"
            placeholder="Tag"
            value={formData.tag}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <textarea
            name="description"
            placeholder="Type here"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button className="save-btn" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ArtisanInfo;