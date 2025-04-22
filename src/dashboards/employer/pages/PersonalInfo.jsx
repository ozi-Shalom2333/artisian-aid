import React, { useEffect, useState } from 'react';
import '../../../styles/employerDashboard.css';
import { FiCamera } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PersonalInfo = () => {
  const BaseUrl = 'https://artisanaid.onrender.com';
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  const [profileImage, setProfileImage] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/v1/user/${userData._id}`);
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileFile(file);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitPic = async () => {
    const formData = new FormData();
    formData.append("profilePic", profileFile);
    try {
      const myToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${BaseUrl}/v1/update/profilepic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${myToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile picture updated successfully!");
        setUserData((prev) => ({
          ...prev,
          profilePic: { image_url: response.data.image_url },
        }));
      } else {
        toast.error("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("An error occurred while updating the profile picture.");
    }
  };

  useEffect(() => {
    if (profileFile) {
      submitPic();
    }
  }, [profileFile]);

  return (
    <div className="user-profile-container">
      <ToastContainer />
      <div className="pack">
        <div className="profile-header">
          <h2>Your Personal Information</h2>
        </div>
        <div className="profile-content">
          <div className="profile-section">
            <div className="profile-image-container">
              <div className="profile-image">
                <img
                  src={profileImage || userData.profilePic.image_url || "/default-profile.png"}
                  alt="Profile"
                />
              </div>
              <label htmlFor="profileImageInput" className="camera-icon">
                <FiCamera size={29} />
              </label>
              <input
                type="file"
                id="profileImageInput"
                onChange={handleProfileImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <hr />

          <div className="info-section">
            <div className="personal-info-card">
              <div className="card-header">
                <h4>Personal Info</h4>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <div className="info-label">Full Name</div>
                  <div className="info-value">{userData.fullname}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Email</div>
                  <div className="info-value">{userData.email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Phone</div>
                  <div className="info-value">{userData.phoneNumber}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
