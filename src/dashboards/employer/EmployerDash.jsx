import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import '../../styles/admindashboard.css';
import Privacy from './pages/Privacy';
import PersonalInfo from './pages/PersonalInfo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployerDash = () => {
   const [activeTab, setActiveTab] = useState('personal-info'); 
   const navigate = useNavigate();

   // Handle tab click
   const handleTabClick = (tab) => {
     setActiveTab(tab);
   };

   // Handle logout
   const handleLogout = () => {
     // Clear user data from localStorage or any other storage
     localStorage.removeItem('userData'); // Example of clearing user data
     toast.success('You have successfully logged out!'); // Show a toast message
     
     // Redirect to the login page or home page after logout
     navigate('/login'); // Replace with the route where users should be redirected
   };

   return (
     <div className="dashboard-container">
       <div className="sidebar">
         <div className="logo">ArtisanAid.</div>
         <nav>
           <ul>
             <li className="admin-management-header">
               <FaUser size={20}/>
               Account Settings 
             </li>
             <li
               className={`nav-link ${activeTab === 'personal-info' ? 'nav-link-active' : ''}`}
               onClick={() => handleTabClick('personal-info')}
             >
               Personal Information     
             </li>
             <li
               className={`nav-link ${activeTab === 'privacy' ? 'nav-link-active' : 'nav-link'}`}
               onClick={() => handleTabClick('privacy')}
             >
               Privacy & Security
             </li>
           </ul>
         </nav>
         <div className="logout" onClick={handleLogout}>
           <p className="nav-link"> 
             Log out.
           </p>
         </div>
       </div>
       <div className="main-content">
         {activeTab === 'personal-info' && <PersonalInfo />}
         {activeTab === 'privacy' && <Privacy />}
       </div>
     </div>
   );
};

export default EmployerDash;
