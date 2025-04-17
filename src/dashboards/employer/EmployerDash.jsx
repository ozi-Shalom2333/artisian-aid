import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import '../../styles/admindashboard.css';
import Privacy from './pages/Privacy';
import PersonalInfo from './pages/PersonalInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const EmployerDash = () => {
   const [activeTab, setActiveTab] = useState('personal-info'); 
   const navigate = useNavigate();

    const {userId} = useParams()

     const handleTabClick = (tab) => {
       setActiveTab(tab);
     };
     
    //  const handleLogout = () => {
    //   localStorage.removeItem('token');
    //   navigate('/');
    // };
    useEffect(() => {
      const fetchAdminData = async () => {
        try {
          
  
          const token = JSON.parse(localStorage.getItem('authValues'))?.token;
  
          const response = await axios.get(
            `https://artisanaid.onrender.com/v1/user/${userId}`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
          // setAdminData(response.data.data); 
        } catch (err) {
          console.error('Failed to fetch admin data:', err);
          toast.error('Failed to load admin details.');
        } 
      };
  
      if (userId) {
        fetchAdminData();
      }
    }, [userId]);
  
  

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
           <div className="logout" onClick={() => handleLogout()}>
             <p className="nav-link" > 
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

export default EmployerDash
