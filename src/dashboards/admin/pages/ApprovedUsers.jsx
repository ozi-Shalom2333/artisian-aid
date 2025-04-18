import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/approvedusers.css";
import DeclinedUserCard from "../../../components/DeclinedUserCard";
import ApprovedUserCard from "../../../components/ApprovedUserCard";

const ApprovedUsers = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApprovedArtisans = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/approved/artisans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setArtisans(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch approved artisans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedArtisans();
  }, []);

 const handleViewDetails = ()=>{}

  if (loading)
    return <div className="loading">Loading approved artisans...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    // <div className='approved-users-container'>
    //   <section className='adminDashboard'>
    //     <div className='pendingUser'>
    //       <h5>Approved Artisans ({artisans.length})</h5>
    //     </div>

    //     {artisans.length === 0 ? (
    //       <div className="no-artisans">No approved artisans found.</div>
    //     ) : (
    //       <aside className='adminDashboardMainContainer'>
    //         {artisans.map((artisan) => (
    //           <nav key={artisan._id} className='adaezeJane'>
    //             <div className='adaezeImage'>
    //               <img
    //                 src={artisan.profilePic?.image_url || '/default-profile.jpg'}
    //                 alt={artisan.fullname}
    //               />
    //               <p>{artisan.fullname}</p>
    //             </div>

    //             <div className='adaezeEmail'>
    //               <p>{artisan.email}</p>
    //               {/* <p>Business: {artisan.businessName}</p> */}
    //             </div>

    //             <div className='adaezeDetails'>
    //               <span>View details</span>
    //               {/* <p>Category: {artisan.category}</p>
    //               <p>Location: {artisan.location?.state}</p> */}
    //             </div>

    //             <div className='adaStatus'>
    //               <p>Status: {artisan.verificationStatus}</p>
    //               {/* <p>Rating: {artisan.rating}/5</p> */}
    //             </div>
    //           </nav>
    //         ))}
    //       </aside>
    //     )}
    //   </section>
    // </div>
    <div className="pending-users-wrapper">
      <h2 className="title">Approved Artisans ({artisans.length})</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-container">
          {artisans.length > 0 ? (
            artisans.map((user) => (
              <ApprovedUserCard
                // key={user.id}
                name={user.fullname}
                email={user.email}
                image={user.profilePic?.image_url || '/default-profile.jpg'}
                onViewDetails={handleViewDetails}
                // status={""}
                verified={`Status: ${user.verificationStatus}`}
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

export default ApprovedUsers;

// import React from 'react'
// import '../../../styles/approvedusers.css'

// const ApprovedUsers = () => {
//   const [artisans, setArtisans] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false); // Added loading state

//   useEffect(() => {
//     const fetchApprovedArtisans = async () => {
//       setLoading(true); // Start loading
//       setError(''); // Clear any previous errors

//       try {
//         const token = localStorage.getItem('token'); // Retrieve token from localStorage
//         if (!token) {
//           throw new Error('Authentication token is missing.');
//         }

//         const response = await axios.get('https://artisanaid.onrender.com/v1/approved/artisans', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add token to headers
//           },
//         });

//         setArtisans(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch approved artisans.');
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchApprovedArtisans();
//   }, []);
//   return (
//     <div className='approved-users-container'>
//       <section className='adminDashboard'>
//         <div className='pendingUser'>
//           <h5>Pending User Verification</h5>
//         </div>
//         <aside className='adminDashboardMainContainer'>
//           <nav className='adaezeJane'>
//             <div className='adaezeImage'>
//               <img src="/fine girl.jpg" alt="" />
//               <p>Adaeze Jane</p>
//             </div>

//             <div className='adaezeEmail'>
//               <p>Adaezejane2025@gmail.com</p>
//             </div>
//             <div className='adaezeDetails'>
//               <span>View details</span>
//             </div>

//             <div className='adaStatus'>
//               <p>Status: Approved</p>

//             </div>
//           </nav>
//         </aside>

//       </section>

//     </div>
//   )
// }

// export default ApprovedUsers
