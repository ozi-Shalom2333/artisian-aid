import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/reporteduser.css";
import { useNavigate } from "react-router-dom";
import ReportedUserCard from "../../../components/ReportedUserCard";

const ReportedUser = () => {
<<<<<<< HEAD
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeclinedArtisans = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/reported/artisans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setArtisans(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch reported artisans."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDeclinedArtisans();
  }, []);

  const handleViewDetails = ()=>{
    navigate("/admindashboard/getOneReported");
  }

  // if (loading) return <div className="loading">Loading Reported artisans...</div>;
  // if (error) return <div className="error">{error}</div>;
=======
>>>>>>> dc6e8143089d6057b36b506e897c4d5ec56ea431
  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Reported User Verification</h2>
      <div className="users-container">
      <ReportedUserCard
                // key={user.id}
                name= "Victoria Trust"
                email= "Text@gmail.com"
                image= ""
                onViewDetails={handleViewDetails}
                status={'Declined'}
              />
        </div>

      {/* <div className="users-container">
          {users.length > 0 ? (
            users.map((user) => (
              <ReportedUserCard
                key={user.id}
                name= "Victoria Trust"
                email= "Text@gmail.com"
                image= ""
                onViewDetails={() => handleViewDetails(user)}
                status={'Declined'}
              />
            ))
          ) : (
            <p>No Reported users at the moment.</p>
          )}
        </div> */}
    </div>
  );
};

<<<<<<< HEAD
export default ReportedUser;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../../styles/reporteduser.css'

// const ReportedUser = () => {
//     const [artisans, setArtisans] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//       const fetchDeclinedArtisans = async () => {
//         setLoading(true);
//         setError('');

//         try {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             throw new Error('Authentication token is missing.');
//           }

//           const response = await axios.get('https://artisanaid.onrender.com/v1/reported/artisans', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           setArtisans(response.data.data);
//         } catch (err) {
//           setError(err.response?.data?.message || 'Failed to fetch reported artisans.');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchDeclinedArtisans();
//     }, []);

//     // if (loading) return <div className="loading">Loading Reported artisans...</div>;
//     // if (error) return <div className="error">{error}</div>;
//   return (
//     <div className='approved-users-containe'>

//       <section className='adminDashboar'>
//         <div className='pendingUse'>
//           <h5>Reported Users</h5>
//         </div>
//         <aside className='adminDashboardMainContaine'>
//           <nav className='adaezeJan'>
//             <div className='adaezeImag'>
//               <img src="/fine girl.jpg" alt="" />
//               <p>Adaeze Jane</p>
//             </div>

//             <div className='adaezeEmai'>
//               <p>Adaezejane2025@gmail.com</p>
//             </div>
//             <div className='adaezeDetai'>
//               <span>View details</span>
//             </div>

//             <div className='adaStatu'>
//               <p>Status: Approved</p>

//             </div>
//           </nav>
//         </aside>

//       </section>

//     </div>
//   )
// }

// export default ReportedUser
=======
export default ReportedUser
>>>>>>> dc6e8143089d6057b36b506e897c4d5ec56ea431
