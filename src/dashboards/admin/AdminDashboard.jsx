import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../../styles/admindashboard.css'
import PendingVerification from './pages/PendingVerification';
import ApprovedUsers from './pages/ApprovedUsers';
import DeclinedUsers from './pages/DeclinedUsers';
import ReportedUsers from './pages/ReportedUsers';



const AdminDashboard = () => {
  return (
    <Router>
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">ArtisanAid.</div>
        <nav>
          <ul>
            <li className="admin-management-header">
      
                Admin Management
                </li>
            <li>
              <Link to="/pending-verification" className="nav-link">
                Pending User Verification
              </Link>
            </li>
            <li>
              <Link to="/approved-users" className="nav-link">
                Approved Users
              </Link>
            </li>
            <li>
              <Link to="/declined-users" className="nav-link">
                Declined Users
              </Link>
            </li>
            <li>
              <Link to="/reported-users" className="nav-link">
                Reported Users
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logout">
          <Link to="/logout" className="nav-link">
            Log out
          </Link>
        </div>
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
