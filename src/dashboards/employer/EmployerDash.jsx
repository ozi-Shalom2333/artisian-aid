import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import '../../styles/admindashboard.css';
import Privacy from './pages/Privacy';
import PersonalInfo from './pages/PersonalInfo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerDash = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    toast.success('You have successfully logged out!');
    navigate('/login');
    setShowLogoutModal(false);
  };

  return (
    <div className="dashboard-container">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} />
      </button>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="logo" onClick={() => navigate('/')}>ArtisanAid.</div>
        <nav>
          <ul>
            <li className="admin-management-header">
              <FaUser size={20} />
              Account Settings
            </li>
            <li
              className={`nav-link ${activeTab === 'personal-info' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('personal-info')}
            >
              Personal Information
            </li>
            <li
              className={`nav-link ${activeTab === 'privacy' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('privacy')}
            >
              Privacy & Security
            </li>
          </ul>
        </nav>
        <div className="logout">
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
        {activeTab === 'personal-info' && <PersonalInfo />}
        {activeTab === 'privacy' && <Privacy />}
      </div>

      {showLogoutModal && (
        <div className="modal-overlay-logout">
          <div className="modal-logout">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions-logout">
              <button onClick={() => setShowLogoutModal(false)} className="cancel-btn-logout">
                Cancel
              </button>
              <button onClick={handleLogout} className="logout-btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDash;
