import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/reporteduser.css";
import { useNavigate } from "react-router-dom";
import ReportedUserCard from "../../../components/ReportedUserCard";
import UserReportCard from "../../../components/UserReportCard";

const ReportedUser = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserReport, setShowUserReport] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeclinedArtisans = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("authToken");
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

  const handleViewDetails = () => {
    navigate("/admindashboard/getOneReported");
  };

  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Reported User Verification</h2>
      <div className="users-container">
        {artisans.map((item) => (
          <div className="reported_card_details">
            <ReportedUserCard
              // key={user.id}
              name="Victoria Trust"
              email="Text@gmail.com"
              image=""
              setShowUserReport={setShowUserReport}
              status={"Declined"}
            />
            {
              showUserReport == "item" ? 
                <div className='user_report_card_body'>
                  <h3>User Reports</h3>
                  <div className="user_report_card_container">
                    <UserReportCard/>
                  </div>
                  <div className="user_report_card_button">
                    <button>Restrict user</button>
                    <button>Delete user</button>
                  </div>
                </div>
              : null
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedUser;
