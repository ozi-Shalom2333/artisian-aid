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
        const token = localStorage.getItem('authToken');
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
    // <div className='pproved-users-container'>
    //   <section className='dminDashboard'>
    //     <div className='pendingUser'>
    //       <h5>Declined Users ({artisans.length})</h5>
    //     </div>
        
    //     {artisans.length === 0 ? (
    //       <div className="no-artisans">No declined artisans found.</div>
    //     ) : (
    //       <aside className='dminDashboardMainContainer'>
    //         {artisans.map((artisan) => (
    //           <nav key={artisan._id} className='daezeJane'>
    //             <div className='daezeImage'>
    //               <img 
    //                 src={artisan.profilePic?.image_url || '/default-profile.jpg'} 
    //                 alt={artisan.fullname} 
    //               />
    //               <p>{artisan.fullname}</p>
    //             </div>
                
    //             <div className='daezeEmail'>
    //               <p>{artisan.email}</p>
    //             </div>

    //             <div className='daStatus'>
    //               <p>Status: {artisan.verificationStatus}</p>
    //             </div>
    //           </nav>
    //         ))}
    //       </aside>
    //     )}
    //   </section>
    // </div>
    <div className="pending-users-wrapper">
    <h2 className="title">Declined Users ({artisans.length})</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="users-container">
        {artisans.length > 0 ? (
          artisans.map((user,index) => (
            <DeclinedUserCard
            key={index}
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