import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/declineduser.css';
import DeclinedUserCard from '../../../components/DeclinedUserCard';

const DeclinedUsers = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDeclinedArtisans = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token is missing.');
        }

        const response = await axios.get('https://artisanaid.onrender.com/v1/declined/artisans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setArtisans(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch declined artisans.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeclinedArtisans();
  }, []);

  if (loading) return <div className="loading">Loading declined artisans...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="pending-users-wrapper">
    <h2 className="title">Declined Users ({artisans.length})</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="users-container">
        {artisans.length > 0 ? (
          artisans.map((user) => (
            <DeclinedUserCard
              name= {user.fullname}
              email= {user.email}
              image= {user.profilePic.image_url}
              status={user.verificationStatus}
            />
          ))
        ) : (
          <p>No Declined users at the moment.</p>
        )}
      </div>
    )}
  </div>
  );
};

export default DeclinedUsers;