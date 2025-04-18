// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../../styles/admindashboard.css';
import { RiHomeFill, RiMenuLine, RiCloseLine } from "react-icons/ri";
import Logout from '../../components/modals/Logout';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";


const AdminDashboard = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Check if path matches for active styling
  const isActive = (path) => {
    return location.pathname === `/admindashboard/${path}` || 
           (location.pathname === '/admindashboard' && path === 'pending-verification');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {showLogoutModal && (
        <Logout
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <div className="logo">ArtisanAid.</div>
        <nav>
          <ul>
            <li className="admin-management-header">
              <RiHomeFill size={20}/>
              Admin Management
            </li>
            <li>
              <Link
                to="pending-verification"
                className={`nav-link ${isActive('pending-verification') ? 'nav-link-active' : ''}`}
              >
                Pending User Verification
              </Link>
            </li>
            <li>
              <Link
                to="approved-users"
                className={`nav-link ${isActive('approved-users') ? 'nav-link-active' : ''}`}
              >
                Approved Users
              </Link>
            </li>
            <li>
              <Link
                to="declined-users"
                className={`nav-link ${isActive('declined-users') ? 'nav-link-active' : ''}`}
              >
                Declined Users
              </Link>
            </li>
            <li>
              <Link
                to="reported-users"
                className={`nav-link ${isActive('reported-users') ? 'nav-link-active' : ''}`}
              >
                Reported Users
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logout">
        <p 
          className="nav-link logout-text" 
          onClick={() => setShowLogoutModal(true)}
          style={{ cursor: 'pointer' }}
        >
          <FiLogOut/>
          <span>Log out</span>
        </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Fixed Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Welcome back, Admin</h1>
            <p>here is your dashboard</p>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;











// import React from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import '../../styles/admindashboard.css';
// import { RiHomeFill } from "react-icons/ri";

// const AdminDashboard = () => {
//   const location = useLocation();

//   // Function to check if path matches
//   const isActive = (path) => {
//     return location.pathname === `/admindashboard/${path}` || 
//            (location.pathname === '/admindashboard' && path === 'pending-verification');
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="logo">ArtisanAid.</div>
//         <nav>
//           <ul>
//             <li className="admin-management-header">
//               <RiHomeFill size={20}/>
//               Admin Management
//             </li>
//             <li>
//               <Link
//                 to="pending-verification"
//                 className={`nav-link ${isActive('pending-verification') ? 'nav-link-active' : ''}`}
//               >
//                 Pending User Verification
//               </Link>
//             </li>
//             {/* Repeat for other links */}
//           </ul>
//         </nav>
//         <div className="logout">
//           <p className="nav-link">Log out</p>
//         </div>
//       </div>

//       {/* Main Content with Header */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="header-content">
//             <h1>Welcome back, Admin</h1>
//             <p>here is your dashboard</p>
//           </div>
//         </header>
        
//         {/* Page Content */}
//         <div className="content-wrapper">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;










// import React, { useState } from 'react';
// import '../../styles/admindashboard.css';
// import PendingVerification from './pages/PendingVerification';
// import ApprovedUsers from './pages/ApprovedUsers';
// import DeclinedUsers from './pages/DeclinedUsers';
// import ReportedUsers from './pages/ReportedUsers';
// import { RiHomeFill } from "react-icons/ri";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('pending-verification'); 

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <div className="logo">ArtisanAid.</div>
//         <nav>
//           <ul>
//             <li className="admin-management-header">
//               <RiHomeFill size={20}/>
//               Admin Management
//             </li>
//             <li
//               className={`nav-link ${activeTab === 'pending-verification' ? 'nav-link-active' : ''}`}
//               onClick={() => handleTabClick('pending-verification')}
//             >
//               Pending User Verification
//             </li>
//             <li
//               className={`nav-link ${activeTab === 'approved-users' ? 'nav-link-active' : 'nav-link'}`}
//               onClick={() => handleTabClick('approved-users')}
//             >
//               Approved Users
//             </li>
//             <li
//               className={`nav-link ${activeTab === 'declined-users' ? 'nav-link-active' : 'nav-link'}`}
//               onClick={() => handleTabClick('declined-users')}
//             >
//               Declined Users
//             </li>
//             <li
//               className={`nav-link ${activeTab === 'reported-users' ? 'nav-link-active' : 'nav-link'}`}
//               onClick={() => handleTabClick('reported-users')}
//             >
//               Reported Users
//             </li>
//           </ul>
//         </nav>
//         <div className="logout">
//           <p className="nav-link" onClick={() => console.log('Logout functionality here')}> 
//             Log out
//           </p>
//         </div>
//       </div>
//       <div className="main-content">
//         {activeTab === 'pending-verification' && <PendingVerification />}
//         {activeTab === 'approved-users' && <ApprovedUsers />}
//         {activeTab === 'declined-users' && <DeclinedUsers />}
//         {activeTab === 'reported-users' && <ReportedUsers />}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;