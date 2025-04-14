import React from 'react';
import '../../../styles/employerDashboard.css';
import { CgProfile } from 'react-icons/cg';
import { MdLogout } from 'react-icons/md';
import { FiCamera } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

const PersonalInfo = () => {
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
                                <img src="" alt="" />
                            </div>
                            <div className="camera-icon">< FiCamera size={29}/></div>
                        </div>
                    </div>
                    <div className="edit-button-container">
                        <button className="edit-button">
                            Edit <BiEdit/>
                        </button>
                    </div>
                    <div className="info-section">
                        <div className="personal-info-card">
                            <div className="card-header">
                                <h4>Personal Info</h4>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <div className="info-label">Full Name</div>
                                    <div className="info-value">John Doe</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Email</div>
                                    <div className="info-value">johndoe@example.com</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">Phone</div>
                                    <div className="info-value">09012345678</div>
                                </div>
                            </div>
                        </div>

                        <div className="location-card">
                            <div className="card-header">
                                <h4>Location</h4>
                            </div>
                            <div className="card-body">
                                <div className="info-row">
                                    <div className="info-label">LGA</div>
                                    <div className="info-value">Ajeromi-Ifelodun</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">State</div>
                                    <div className="info-value">Lagos</div>
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