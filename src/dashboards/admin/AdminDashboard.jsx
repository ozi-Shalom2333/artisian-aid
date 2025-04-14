import React, { useState } from 'react';
import '../../styles/admindashboard.css';
import PendingVerification from './pages/PendingVerification';
import ApprovedUsers from './pages/ApprovedUsers';
import DeclinedUsers from './pages/DeclinedUsers';
import ReportedUsers from './pages/ReportedUsers';
import { RiHomeFill } from "react-icons/ri";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending-verification'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">ArtisanAid.</div>
        <nav>
          <ul>
            <li className="admin-management-header">
              <RiHomeFill size={20}/>
              Admin Management
            </li>
            <li
              className={`nav-link ${activeTab === 'pending-verification' ? 'nav-link-active' : ''}`}
              onClick={() => handleTabClick('pending-verification')}
            >
              Pending User Verification
            </li>
            <li
              className={`nav-link ${activeTab === 'approved-users' ? 'nav-link-active' : 'nav-link'}`}
              onClick={() => handleTabClick('approved-users')}
            >
              Approved Users
            </li>
            <li
              className={`nav-link ${activeTab === 'declined-users' ? 'nav-link-active' : 'nav-link'}`}
              onClick={() => handleTabClick('declined-users')}
            >
              Declined Users
            </li>
            <li
              className={`nav-link ${activeTab === 'reported-users' ? 'nav-link-active' : 'nav-link'}`}
              onClick={() => handleTabClick('reported-users')}
            >
              Reported Users
            </li>
          </ul>
        </nav>
        <div className="logout">
          <p className="nav-link" onClick={() => console.log('Logout functionality here')}> 
            Log out
          </p>
        </div>
      </div>
      <div className="main-content">
        {activeTab === 'pending-verification' && <PendingVerification />}
        {activeTab === 'approved-users' && <ApprovedUsers />}
        {activeTab === 'declined-users' && <DeclinedUsers />}
        {activeTab === 'reported-users' && <ReportedUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;