import React, { useEffect, useState } from 'react';
import '../../../styles/employerDashboard.css';
import { FiCamera } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import axios from 'axios';

const PersonalInfo = () => {

      const BaseUrl = 'https://artisanaid.onrender.com';
        const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
 
        useEffect(() => {
            const getUser = async () => {
                try {
                    const response = await axios.get(`${BaseUrl}/v1/user/${userData._id}`);
                    setUserData(response.data.data);
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            }

            getUser();
        },[])


    return (
        <div className="user-profile-container">
            <div className="pack">
                <div className="profile-header">
                    <h2>Your Personal Information</h2>
                </div>
                <div className="profile-content">
                    <div className="profile-section">
                        <div className="profile-image-container">
                            <div className="profile-image">
                                <img src={userData.profilePic.image_url} alt="" />
                            </div>
                            <div className="camera-icon">< FiCamera size={29}/></div>
                        </div>
                    </div>

                           <hr />
                    <div className="info-section">
                        <div className="personal-info-card">
                            <div className="card-header">
                                <h4>Personal Info</h4>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <div className="info-label">Full Name</div>
                                    <div className="info-value">{userData.fullname}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">{userData.email}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Phone</div>
                                    <div className="info-value">{userData.phoneNumber}</div>
                                </div>
                             
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;