import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import '../../styles/admindashboard.css'
import PendingVerification from './pages/PendingVerification';
import ApprovedUsers from './pages/ApprovedUsers';
import DeclinedUsers from './pages/DeclinedUsers';
import ReportedUsers from './pages/ReportedUsers';
import { RiHomeFill } from "react-icons/ri";

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('/pending-verification'); // Initialize with the default active tab

  return (
    <Router>

      <div className="dashboard-container">
      <div className="sidebar">
          <div className="logo">ArtisanAid.</div>
          <nav>
            <ul>
              <li className="admin-management-header">
                <RiHomeFill size={20}/>
                Admin Management
              </li>
              <li>
                <NavLink
                  to="/pending-verification"
                  className={activeTab === '/pending-verification' ? 'nav-link-active' : 'nav-link'}
                  onClick={() => setActiveTab('/pending-verification')}
                >
                  Pending User Verification
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/approved-users"
                  className={activeTab === '/approved-users' ? 'nav-link-active' : 'nav-link'}
                  onClick={() => setActiveTab('/approved-users')}
                >
                  Approved Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/declined-users"
                  className={activeTab === '/declined-users' ? 'nav-link-active' : 'nav-link'}
                  onClick={() => setActiveTab('/declined-users')}
                >
                  Declined Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reported-users"
                  className={activeTab === '/reported-users' ? 'nav-link-active' : 'nav-link'}
                  onClick={() => setActiveTab('/reported-users')}
                >
                  Reported Users
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* <div className="logout">
            <NavLink to="/logout" className="nav-link">
              Log out
            </NavLink>
          </div> */}
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/pending-verification" element={<PendingVerification/>} />
            <Route path="/approved-users" element={<ApprovedUsers />} />
            <Route path="/declined-users" element={<DeclinedUsers/>} />
            <Route path="/reported-users" element={<ReportedUsers />} />
            <Route path="/" element={<PendingVerification />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default AdminDashboard