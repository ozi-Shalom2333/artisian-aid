import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/reporteduser.css";
import { useNavigate } from "react-router-dom";
import ReportedUserCard from "../../../components/ReportedUserCard";

const ReportedUser = () => {
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
  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Reported User Verification</h2>
      <div className="users-container">
      <ReportedUserCard
                name= "Victoria Trust"
                email= "Text@gmail.com"
                image= ""
                onViewDetails={handleViewDetails}
                status={'Declined'}
              />
        </div>
    </div>
  );
};
export default ReportedUser;