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

const GetOnePendingUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = state || {};

  // Redirect if no user in state
  if (!user) {
    navigate("/admindashboard/pendingUsers");
    return null;
  }

  const verification = user.verificationId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  // If no verification document exists, inform admin
  if (!verification) {
    return (
      <div className="pending-user-wrapper">
        <h2 className="page-title">Pending User Verification</h2>
        <PendingUserCard
          user={{ name: user.fullname, email: user.email, image: user.profilePic.image_url }}
          onViewDetails={() => {}}
        />
        <p className="no-docs-message">
          No verification documents found for <strong>{user.fullname}</strong>.
        </p>
      </div>
    );
  }

  // Modal open/close handlers
  const handleDecline = () => setShowDeleteModal(true);
  const handleApprove = () => setShowApproveModal(true);
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleCancelApprove = () => setShowApproveModal(false);

  // Reject verification
  const handleConfirmDelete = async () => {
    setLoadingAction(true);
    const token = localStorage.getItem("token");
    try {
      await API.get(
        `https://artisanaid.onrender.com/v1/reject/verification/${verification._id}`,
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
    const token = localStorage.getItem("token");
    try {
      await API.get(
        `https://artisanaid.onrender.com/accept/verification/${verification._id}`,
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
    <div className="pending-user-wrapper">
      <h2 className="page-title">Pending User Verification</h2>
      <div className="users-container">
        <PendingUserCard
          user={{ name: user.fullname, email: user.email, image: user.profilePic.image_url }}
          onViewDetails={() => {}}
        />

        <div className="certificate-section">
          <h3 className="section-title">Certificate Document</h3>
          <img
            src={verification.workCertificate.image_url}
            alt="Certificate"
            className="certificate-img"
          />
        </div>

        <div className="guarantor-section">
          <h3 className="section-title">Guarantor Information</h3>

          <div className="guarantor-item">
            <FaUserCircle className="guarantor-icon" />
            <div className="guarantor-details">
              <label className="guarantor-label">Guarantor's Name</label>
              <span className="guarantor-value">{verification.guarantorName}</span>
            </div>
          </div>

          <div className="guarantor-item">
            <BsTelephoneFill className="guarantor-icon" />
            <div className="guarantor-details">
              <label className="guarantor-label">Guarantor's Phone Number</label>
              <span className="guarantor-value">{verification.guarantorPhoneNumber}</span>
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






















// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUserCircle } from "react-icons/fa";
// import { BsTelephoneFill } from "react-icons/bs";
// import "../../../styles/GetOnePendingUser.css";
// import PendingUserCard from "../../../components/PendingUserCard";
// import Delete from "../../../components/modals/Delete";
// import ApproveModal from "../../../components/modals/ApproveModal";
// import { toast } from "react-toastify";

// const GetOnePendingUser = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showApproveModal, setShowApproveModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (location.state?.user) {
//       setUser(location.state.user);
//       setLoading(false);
//     }
//   }, [location.state]);

//   const handleDecline = () => setShowDeleteModal(true);
//   const handleApprove = () => setShowApproveModal(true);

//   const handleConfirmApprove = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.get(
//         `https://artisanaid.onrender.com/accept/verification/${user._id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Account verified successfully");
//       navigate("/admindashboard/pending-verification");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Approval failed");
//     }
//     setShowApproveModal(false);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.get(
//         `https://artisanaid.onrender.com/v1/verification/reject/${user._id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Verification rejected successfully");
//       navigate("/admindashboard/pending-verification");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Rejection failed");
//     }
//     setShowDeleteModal(false);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="pending-user-wrapper">
//       <h2 className="page-title">Pending User Verification</h2>
//       <div className="users-container">
//         <PendingUserCard
//           user={{
//             name: user.fullname,
//             email: user.email,
//             image: user.profilePic?.image_url,
//           }}
//         />

//         {/* Certificate Section - Update with actual data when available */}
//         <div className="certificate-section">
//           <h3 className="section-title">Certificate Document</h3>
//           <img
//             src={user.verificationDocuments?.certificate || "/cert.png"}
//             alt="Certificate"
//             className="certificate-img"
//           />
//         </div>

//         {/* Guarantor Section - Update with actual data when available */}
//         <div className="guarantor-section">
//           <h3 className="section-title">Guarantors Information</h3>
//           <div className="guarantor-item">
//             <FaUserCircle className="guarantor-icon" />
//             <div className="guarantor-details">
//               <label className="guarantor-label">Guarantor's Name</label>
//               <span className="guarantor-value">
//                 {user.guarantors?.[0]?.name || "Kelechi Obinna"}
//               </span>
//             </div>
//           </div>

//           <div className="guarantor-item">
//             <BsTelephoneFill className="guarantor-icon" />
//             <div className="guarantor-details">
//               <label className="guarantor-label">Phone Number</label>
//               <span className="guarantor-value">
//                 {user.guarantors?.[0]?.phone || "08179465064"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="button-group">
//           <button className="approve-btn" onClick={handleApprove}>
//             Approve Verification
//           </button>
//           <button className="decline-btn" onClick={handleDecline}>
//             Decline Verification
//           </button>
//         </div>
//       </div>

//       {showDeleteModal && (
//         <Delete
//           onCancel={() => setShowDeleteModal(false)}
//           onConfirm={handleConfirmDelete}
//         />
//       )}

//       {showApproveModal && (
//         <ApproveModal
//           onCancel={() => setShowApproveModal(false)}
//           onConfirm={handleConfirmApprove}
//         />
//       )}
//     </div>
//   );
// };

// export default GetOnePendingUser;

















// import React, { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { BsTelephoneFill } from "react-icons/bs";
// import "../../../styles/GetOnePendingUser.css";
// import PendingUserCard from "../../../components/PendingUserCard";
// import Delete from "../../../components/modals/Delete";
// import ApproveModal from "../../../components/modals/ApproveModal";

// const GetOnePendingUser = () => {
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showApproveModal, setShowApproveModal] = useState(false);

//   const user = {
//     name: "Adaeze Jane",
//     email: "Adaezejane2025@gmail.com",
//     image: "/images/adaeze.jpg"
//   };

//   const handleDecline = () => {
//     setShowDeleteModal(true);
//   };

//   const handleApprove = () => {
//     setShowApproveModal(true);
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteModal(false);
//   };

//   // consume the endpoint to decline the user
//   const handleConfirmDelete = () => {};

//   const handleCancelApprove = () => {
//     setShowApproveModal(false);
//   };

//   // consume the endpoint to approve the user
//   const handleConfirmApprove = () => {};

//   return (
//     <div className="pending-user-wrapper">
//       <h2 className="page-title">Pending User Verification</h2>
//       <div className="users-container">
//         <PendingUserCard user={user} onViewDetails={() => {}} />

//         <div className="certificate-section">
//           <h3 className="section-title">Certificate Document</h3>
//           <img src="/cert.png" alt="Certificate" className="certificate-img" />
//         </div>

//         <div className="guarantor-section">
//           <h3 className="section-title">Guarantors Information</h3>

//           <div className="guarantor-item">
//             <FaUserCircle className="guarantor-icon" />
//             <div className="guarantor-details">
//               <label className="guarantor-label">Guarantors Name</label>
//               <span className="guarantor-value">Kelechi Obinna</span>
//             </div>
//           </div>

//           <div className="guarantor-item">
//             <BsTelephoneFill className="guarantor-icon" />
//             <div className="guarantor-details">
//               <label className="guarantor-label">Guarantors Phone Number</label>
//               <span className="guarantor-value">08179465064</span>
//             </div>
//           </div>
//         </div>

//         <div className="button-group">
//           <button className="approve-btn" onClick={handleApprove}>Approve Verification</button>
//           <button className="decline-btn" onClick={handleDecline}>
//             Decline Verification
//           </button>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <Delete onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
//       )}

//       {/* Reason For Decline Modal */}
//       {showApproveModal && (
//         <ApproveModal
//           onCancel={handleCancelApprove}
//           onConfirm={handleConfirmApprove}
//         />
//       )}
//     </div>
//   );
// };

// export default GetOnePendingUser;
