import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/reporteduser.css";
import { useNavigate } from "react-router-dom";
import ReportedUserCard from "../../../components/ReportedUserCard";
import UserReportCard from "../../../components/UserReportCard";
import Delete from "../../../components/modals/Delete";
import { toast } from "react-toastify";

const ReportedUser = () => {
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserReport, setShowUserReport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promptStatus, setPromptStatus] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchDeclinedArtisans = async () => {
      setLoading(true);
      setError("");

      try {
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
        console.log(response);

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

  const openModal = (prompt) => {
    setPromptStatus(prompt);
    setShowModal(true);
  };

  const restrictArtisan = async (id) => {
    try{
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.post(
        `https://artisanaid.onrender.com/v1/restrict/account/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    }catch(error){
      console.log(error)
    }
  }

  const deleteArtisan = async (id) => {
    try{
      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.delete(
        `https://artisanaid.onrender.com/v1/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message)
      
    }catch(error){
      console.log(error)
    }
  }

  const confirmFunction = async (id) => {
    promptStatus == "restrict" ? await restrictArtisan(id) : await deleteArtisan(id);
    setShowModal(false)
    // promptStatus == "restrict" ? alert("restrict user") : alert("delete user");
  }

  return (
    <div className="pending-users-wrapper">
      <h2 className="title">Reported User Verification</h2>
      <div className="users-container">
        {
          artisans.length === 0 ? (
            <p className="no-users">No reported artisans</p>
          ) : 
          artisans.map((item) => (
            <div className="reported_card_details">
              <ReportedUserCard
                key={item._id}
                name={item.fullname}
                email={item.email}
                image=""
                showUserReport={()=>showUserReport == item._id ? setShowUserReport(false) : setShowUserReport(item._id)}
                status={item.verificationStatus}
              />
              {
                showUserReport == item._id ? 
                  <div className='user_report_card_body'>
                    <h3>User Reports</h3>
                    <div className="user_report_card_container">
                      <UserReportCard/>
                    </div>
                    <div className="user_report_card_button">
                      <button onClick={()=>openModal("restrict")}>Restrict user</button>
                      <button onClick={()=>openModal("delete")}>Delete user</button>
                    </div>
                    {
                      showModal ?
                        <Delete promptStatus = {promptStatus} onCancel={()=>setShowModal(false)} onConfirm={()=>confirmFunction(item._id)}/>
                      : null
                    }
                  </div>
                : null
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ReportedUser;
