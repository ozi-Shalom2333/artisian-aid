import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/approvedusers.css";

import DeclinedUserCard from "../../../components/DeclinedUserCard";

import ApprovedUserCard from "../../../components/ApprovedUserCard";
import { useNavigate } from "react-router-dom";

const ApprovedUsers = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedArtisans = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          // throw new Error("Authentication token is missing.");
          setError("Authentication token is missing.");
        }

        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/approved/artisans",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        setArtisans(response.data.data);
      } catch (err) {
        console.log(err);
        setError(
          error.response.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedArtisans();
  }, []);

  const handleViewDetails = () => {
    
  };

  return(
    <>
      {
        loading ? <div className="loading">Loading approved artisans...</div> : 
        <div>
          {
            artisans?.map((item)=>'')
          }
        </div>
      }
      {
        error &&  <div className="error">{error}</div>
      }
    </>
  )
};
export default ApprovedUsers;
