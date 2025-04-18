import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/approvedusers.css";
// import DeclinedUserCard from "../../../components/DeclinedUserCard";
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
    <div className="pending-users-wrapper">
      <h2 className="title">Approved Artisans ({artisans.length})</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-container">
          {artisans.length > 0 ? (
            artisans.map((user) => (
              <ApprovedUserCard
                name={user.fullname}
                email={user.email}
                image={user.profilePic?.image_url || '/default-profile.jpg'}
                onViewDetails={handleViewDetails}
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