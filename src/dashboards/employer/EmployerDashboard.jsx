import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import '../../styles/admindashboard.css';
import Privacy from './pages/Privacy';
import PersonalInfo from './pages/PersonalInfo';

const EmployerDashboard = () => {
   const [activeTab, setActiveTab] = useState('personal-info'); 
   
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
           <div className="logout">
             <p className="nav-link" onClick={() => console.log('Logout  functionality here')}> 
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

export default EmployerDashboard
