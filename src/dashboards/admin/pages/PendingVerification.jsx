import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/PendingUsers.css";
import PendingUserCard from "../../../components/PendingUserCard";
import { toast } from "react-toastify";

const PendingVerification = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewDetails = (user) => {
    navigate("/admindashboard/onePendingUser", { state: { user } }); // Pass user data
  };

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmZmMjYwNWE0NDI0YWUzYjY5Mzc3MiIsInJvbGUiOiJBcnRpc2FuIiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNzQ0ODk0NDA0LCJleHAiOjE3NDQ5ODA4MDR9.H78t0xFtdlbz5SM1I0OGkWy9y8wWN6ny1MZ9TSC5jTI";
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmZmMDNjNWE0NDI0YWUzYjY5Mzc0YSIsInJvbGUiOiJBZG1pbiIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTc0NDg4MTEwOSwiZXhwIjoxNzQ0OTY3NTA5fQ.uCiCpZDG5EQ8xMcHeAPCBUmqC3uq_RLq2prVwY-DoY4"
      console.log(token);
      
      try {
        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/pending/artisans",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUsers(response.data.data);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.warning("No pending artisans found.");
        } else if (error.response?.status === 401) {
          toast.error("Unauthorized: Please login again.");
        } else {
          toast.error("Failed to fetch pending artisans.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Pending User Verification</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-container">
          {users.length > 0 ? (
            users.map((user) => (
              <PendingUserCard
                key={user.id}
                user={{
                  name: user.fullname,
                  email: user.email,
                  image: user.profilePic.image_url, // Fallback image if not available
                }}
                onViewDetails={() => handleViewDetails(user)}
              />
            ))
          ) : (
            <p>No pending users at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingVerification;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../../../styles/PendingUsers.css";
// import PendingUserCard from "../../../components/PendingUserCard";

// const users = [
//   {
//     name: "Adaeze Jane",
//     email: "Adaezejane2025@gmail.com",
//     image: "/images/adaeze.jpg", // Replace with correct local path or URL
//   },
//   {
//     name: "David Odi",
//     email: "Davidodi2025@gmail.com",
//     image: "/images/david.jpg", // Replace with correct local path or URL
//   },
// ];

// const PendingVerification = () => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate("/onePendingUser");
//   };

//   return (
//     <div className="pending-users-wrapper">
//       <h2 className="title">Pending User Verification</h2>
//       <div className="users-container">
//         {users.map((user, idx) => (
//           <PendingUserCard key={idx} user={user} onViewDetails={handleViewDetails} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingVerification;
