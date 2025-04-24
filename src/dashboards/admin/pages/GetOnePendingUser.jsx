import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { toast } from "react-toastify";
import PendingUserCard from "../../../components/PendingUserCard";
import Delete from "../../../components/modals/Delete";
import ApproveModal from "../../../components/modals/ApproveModal";
import "../../../styles/GetOnePendingUser.css";

const API = axios.create({
  baseURL: "https://artisanaid.onrender.com",
});

const GetOnePendingUser = ({user}) => {
  console.log(user?.verificationId?.guarantorName)
  const navigate = useNavigate();
  // const { state } = useLocation();
  // const { user } = state || {};

  // Redirect if no user in state
  // if (!user) {
  //   navigate("/admindashboard/pendingUsers");
  //   return null;
  // }

  // const verification = user.verificationId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // If no verification document exists, inform admin
  // if (!verification) {
  //   return (
  //     <div className="pending-user-wrapper">
  //       <h2 className="page-title">Pending User Verification</h2>
  //       <PendingUserCard
  //         user={{ name: user.fullname, email: user.email, image: user.profilePic.image_url }}
  //         onViewDetails={() => {}}
  //       />
  //       <p className="no-docs-message">
  //         No verification documents found for <strong>{user.fullname}</strong>.
  //       </p>
  //     </div>
  //   );
  // }

  // Modal open/close handlers
  const handleDecline = () => setShowDeleteModal(true);
  const handleApprove = () => setShowApproveModal(true);
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleCancelApprove = () => setShowApproveModal(false);

  // Reject verification
  const handleConfirmDelete = async () => {
    setLoadingAction(true);
    const token = localStorage.getItem("authToken");
    try {
      await API.get(
        `https://artisanaid.onrender.com/v1/reject/verification/${user?.verificationId?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Account verification has been rejected");
      setTimeout(() => {
        navigate("/admindashboard/declined-users");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reject verification");
    } finally {
      setLoadingAction(false);
      setShowDeleteModal(false);
    }
  };

  // Approve verification
  const handleConfirmApprove = async () => {
    setLoadingAction(true);
    const token = localStorage.getItem("authToken");
    try {
      await API.get(
        `https://artisanaid.onrender.com/v1/accept/verification/${user?.verificationId?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Account has been verified successfully");
      setTimeout(() => {
        navigate("/admindashboard/approved-users");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve verification");
    } finally {
      setLoadingAction(false);
      setShowApproveModal(false);
    }
  };

  return (
    <div className="the_pending_user_wrapper">
      <div className="users-container">
        <div className="certificate-section">
          <h3 className="section-title">Certificate Document</h3>
          <div className="certificate_item_image">
            <img
              // src=""
              src={user?.verificationId?.workCertificate?.image_url}
              alt="Certificate"
            />
          </div>
        </div>

        <div className="guarantor-section">
          <h3 className="section-title">Guarantor Information</h3>

          <div className="guarantor-item">
            <FaUserCircle className="guarantor-icon" />
            <div className="guarantor-details">
              <label className="guarantor-label">Guarantor's Name</label>
              <span className="guarantor-value">{user?.verificationId?.guarantorName}</span>
              {/* <span className="guarantor-value">{verification.guarantorName}</span> */}
            </div>
          </div>

          <div className="guarantor-item">
            <BsTelephoneFill className="guarantor-icon" />
            <div className="guarantor-details">
              <label className="guarantor-label">Guarantor's Phone Number</label>
              <span className="guarantor-value">{user?.verificationId?.guarantorPhoneNumber}</span>
              {/* <span className="guarantor-value">{verification.guarantorPhoneNumber}</span> */}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button
            className="approve-btn"
            onClick={handleApprove}
            disabled={loadingAction}
          >
            {loadingAction ? "Approving..." : "Approve Verification"}
          </button>
          <button
            className="decline-btn"
            onClick={handleDecline}
            disabled={loadingAction}
          >
            {loadingAction ? "Processing..." : "Decline Verification"}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <Delete
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          loading={loadingAction}
        />
      )}

      {showApproveModal && (
        <ApproveModal
          onCancel={handleCancelApprove}
          onConfirm={handleConfirmApprove}
          loading={loadingAction}
        />
      )}
    </div>
  );
};

export default GetOnePendingUser;
