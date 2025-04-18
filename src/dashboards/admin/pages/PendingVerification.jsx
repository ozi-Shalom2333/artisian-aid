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
    navigate("/admindashboard/onePendingUser", { state: { user } });
  };

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/pending/artisans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
                  image: user.profilePic?.image_url,
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
