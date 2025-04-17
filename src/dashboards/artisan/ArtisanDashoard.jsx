import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import '../../styles/admindashboard.css';
import { MdCurrencyExchange } from "react-icons/md";
import { RiHomeFill } from "react-icons/ri";
import ArtisanInfo from './pages/ArtisanInfo';
import ArtisanVerification from './pages/ArtisanVerification';
// import ArtisanUpload from './pages/ArtisanUpload';
import ArtisanNotification from './pages/ArtisanNotification';
import ArtisanSecurity from './pages/ArtisanSecurity';
import { BsFillQuestionCircleFill } from "react-icons/bs";
import ArtisanSubscription from './pages/ArtisanSubscription';
import { CiLogout } from "react-icons/ci";

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    setUserData(storedUserData);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(
        'https://artisanaid.onrender.com/v1/logout', 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Logout successful!');
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/login'; 
      } else {
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out. Please try again.');
    } finally {
      setShowLogoutModal(false); 
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">ArtisanAid.</div>

        {/* Optional: Show user's name and profile picture */}
        {userData && (
          <div className="user-profile">
            <img src={userData.profilePic?.image_url} alt="Profile" className="profile-pic" />
            <h4>{userData.fullname}</h4>
            <p>{userData.category}</p>
          </div>
        )}

        <nav>
          <ul>
            <li className="admin-management-header">
              <RiHomeFill size={20} />
              My Profile
            </li>
            <li
              className={`nav-link ${activeTab === 'personal-info' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('personal-info')}
            >
              Personal Information
            </li>
            <li
              className={`nav-link ${activeTab === 'account' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('account')}
            >
              Account Verification
            </li>
            <li className="admin-management-header">
              <RiHomeFill size={20} />
              Job Management
            </li>
            <li
              className={`nav-link ${activeTab === 'job-post' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('job-post')}
            >
              Upload Job Post
            </li>
            <li
              className={`nav-link ${activeTab === 'notification' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('notification')}
            >
              Job Notification
            </li>
            <li className="admin-management-header">
              <MdCurrencyExchange size={20} />
              Subscription
            </li>
            <li
              className={`nav-link ${activeTab === 'subscription' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('subscription')}
            >
              Subscription Plan
            </li>
          </ul>
        </nav>

        <div className="logout">
          <p 
            className={`nav-link ${activeTab === 'security' ? 'nav-link-active' : ''}`}
            onClick={() => handleTabClick('security')}
            style={{ color: 'white', fontSize: '14px', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <BsFillQuestionCircleFill size={20} />
            Security & Privacy
          </p>
          <p
            className="nav-link"
            style={{ display: 'flex', alignItems: 'center', color: 'red', gap: '10px' }}
            onClick={() => setShowLogoutModal(true)} 
          >
            <CiLogout size={20} />
            Log out
          </p>
        </div>
      </div>

      <div className="main-content">
        {activeTab === 'security' && <ArtisanSecurity />}
        {activeTab === 'personal-info' && <ArtisanInfo />}
        {activeTab === 'account' && <ArtisanVerification />}
        {activeTab === 'job-post' && <ArtisanUpload />}
        {activeTab === 'notification' && <ArtisanNotification />}
        {activeTab === 'subscription' && <ArtisanSubscription />}
      </div>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions">
              <button onClick={() => setShowLogoutModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanDashboard;
