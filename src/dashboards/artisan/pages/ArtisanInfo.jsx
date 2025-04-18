import React, { useState, useEffect } from "react";
import "../../../styles/artisanInfo.css";
import { MdVerified } from "react-icons/md";
import { MdOutlineCameraAlt } from "react-icons/md";
import axios from "axios";

const ArtisanInfo = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const BaseUrl = "https://artisanaid.onrender.com";
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/v1/user/${userData._id}`);
        setUserData(response.data.data);
        console.log("User data fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Profile image loaded:", reader.result);
        setProfileImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);

      // Upload the image to the server
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const myToken = localStorage.getItem("authToken");
        console.log(myToken) // Retrieve the token from localStorage
        const response = await axios.post(
          `${BaseUrl}/v1/update/profile`, 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${myToken}`, 
            },
          }
        );

        if (response.status === 200) {
          alert("Profile picture updated successfully!");
          // Update the user data with the new profile image URL
          setUserData((prev) => ({
            ...prev,
            profilePic: { image_url: response.data.image_url },
          }));
        } else {
          alert("Failed to update profile picture. Please try again.");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
        alert("An error occurred while updating the profile picture.");
      }
    }
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Main image loaded:", reader.result);
        setMainImage(reader.result);
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
            src={profileImage || userData?.profilePic?.image_url || "/default-profile.png"}
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
            src={mainImage || userData?.coverPhoto?.image_url || "/default-cover.png"}
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

      <form className="profile-form">
        <div className="form-row">
          <p>{userData?.fullname || "Full Name"}</p>
          <p>{userData?.businessName || "Business Name"}</p>
          <p>{userData?.email || "Email Address"}</p>
        </div>

        <div className="form-row">
          <select>
            <option>Select L.G.A</option>
            <option value="Agege">Agege</option>
            <option value="Ajeromi-Ifelodun">Ajeromi-Ifelodun</option>
            <option value="Alimosho">Alimosho</option>
            <option value="Amuwo-Odofin">Amuwo-Odofin</option>
            <option value="Apapa">Apapa</option>
            <option value="Badagry">Badagry</option>
            <option value="Epe">Epe</option>
            <option value="Eti-Osa">Eti-Osa</option>
            <option value="Ibeju-Lekki">Ibeju-Lekki</option>
            <option value="Ifako-Ijaiye">Ifako-Ijaiye</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Ikorodu">Ikorodu</option>
            <option value="Kosofe">Kosofe</option>
            <option value="Lagos Island">Lagos Island</option>
            <option value="Lagos Mainland">Lagos Mainland</option>
            <option value="Mushin">Mushin</option>
            <option value="Ojo">Ojo</option>
            <option value="Oshodi-Isolo">Oshodi-Isolo</option>
            <option value="Shomolu">Shomolu</option>
            <option value="Surulere">Surulere</option>
          </select>
          <input type="text" placeholder="..." readOnly />
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