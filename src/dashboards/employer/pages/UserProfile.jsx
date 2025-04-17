import React, { useEffect, useState } from 'react';
import '../../../styles/userprofile.css';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://artisanaid.onrender.com/v1/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <img
          src={userData.headerImage}
          alt="Workshop background"
          className="header-bg"
        />
        <img
          src={userData.profileImage}
          alt="Portrait of artisan"
          className="profile-pic"
        />
      </div>

      <div className="content">
        <div className="top-section">
          <div className="top-left">
            <h1>{userData.name}</h1>
            <p className="description">{userData.description}</p>
            <p className="location">{userData.location}</p>
          </div>
          <button className="book-btn">Book Now</button>
        </div>

        <div className="report-container">
          <a href="#">Report user</a>
        </div>
        <hr className="divider" />

        <div className="bottom-section">
         <h2>{userData.service}</h2>
           <p className="company">{userData.company}</p>
           <h3 className="licenses-title">Licenses & Certification</h3>
           <img
          src={userData.certificateImage}
             alt="Certificate"
          className="certificate-img"
             />
           </div>

      </div>
    </div>
  );
};

export default UserProfile;