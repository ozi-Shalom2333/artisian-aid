import React, { useState } from "react";
import axios from "axios";
import "../../styles/admindashboard.css";
import { MdCurrencyExchange } from "react-icons/md";
import { RiHomeFill } from "react-icons/ri";
import ArtisanInfo from "./pages/ArtisanInfo";
import ArtisanVerification from "./pages/ArtisanVerification";
import ArtisanUpload from "./pages/ArtisanUpload ";
import ArtisanNotification from "./pages/ArtisanNotification";
import ArtisanSecurity from "./pages/ArtisanSecurity";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import ArtisanSubscription from "./pages/ArtisanSubscription";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState("personal-info");
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://artisanaid.onrender.com/v1/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Logout successful!");
        localStorage.removeItem("authToken");
        navigate("/");
      } else {
        toast.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred while logging out. Please try again.");
    } finally {
      setShowLogoutModal(false);
    }
  };

  return (
    <div className="dashboard-container">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <GiHamburgerMenu size={24} />
      </button>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="logo" onClick={() => navigate("/")}>
          ArtisanAid.
        </div>
        <nav>
          <ul>
            <li className="admin-management-header">
              <FaUser size={20} />
              My Profile
            </li>
            <li
              className={`nav-link ${activeTab === "personal-info" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("personal-info")}
            >
              Personal Information
            </li>
            <li
              className={`nav-link ${activeTab === "account" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("account")}
            >
              Account Verification
            </li>
            <li
              className={`nav-link ${activeTab === "security" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("security")}
            >
              Privacy & Security
            </li>
            <li className="admin-management-header">
              <RiHomeFill size={20} />
              Job Management
            </li>
            <li
              className={`nav-link ${activeTab === "job-post" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("job-post")}
            >
              Upload Job Post
            </li>
            <li
              className={`nav-link ${activeTab === "notification" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("notification")}
            >
              Job Notification
            </li>
            <li className="admin-management-header">
              <MdCurrencyExchange size={20} />
              Subscription
            </li>
            <li
              className={`nav-link ${activeTab === "subscription" ? "nav-link-active" : ""}`}
              onClick={() => handleTabClick("subscription")}
            >
              Subscription Plan
            </li>
          </ul>
        </nav>
        <div className="logout">
          <p
            className="nav-link"
            style={{
              display: "flex",
              alignItems: "center",
              color: "red",
              gap: "10px",
            }}
            onClick={() => setShowLogoutModal(true)}
          >
            <CiLogout size={20} />
            Log out
          </p>
        </div>
      </div>
      <div className="main-content">
        {activeTab === "security" && <ArtisanSecurity />}
        {activeTab === "personal-info" && <ArtisanInfo />}
        {activeTab === "account" && <ArtisanVerification />}
        {activeTab === "job-post" && <ArtisanUpload />}
        {activeTab === "notification" && <ArtisanNotification />}
        {activeTab === "subscription" && <ArtisanSubscription />}
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

export default ArtisanDashboard;
