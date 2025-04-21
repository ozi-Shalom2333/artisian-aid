import React from "react";
import { FcCancel } from "react-icons/fc";
import { PiWarningCircleLight } from "react-icons/pi";

const ReportedUserCard = ({
  image,
  name,
  setShowUserReport,
  status,
  email,
  verified,
}) => {

  const handleViewDetails = ()=>{
    setShowUserReport("item")
  }

  return (
    <div className="user-card">
      <div id="user-info">
        <div className="reported-avatar user-avatar">
          <img src={image} alt={""} className="user-avatar" />
          <div className="labels-sticks">
            <PiWarningCircleLight size={20} color="red" />
          </div>
        </div>
        <span className="user-name">{name}</span>
      </div>
      <span className="user-email">{email}</span>
      <button className="view-details view-details2" onClick={handleViewDetails}>
        View Details
      </button>
      <p className="user-card__status">{status}</p>
      <p className="user-card__verified">{verified}</p>
    </div>
  );
};

export default ReportedUserCard;

// import React from 'react'

// const ReportedUserCard = ({image,name,onViewDetails,status}) => {
//   return (
//     <div className="user-card">
//     <div id="user-info">
//       <img src={image} alt={image} className="user-avatar" />
//       <span className="user-name">{name}</span>
//     </div>
//     <span className="user-email">{email}</span>
//     <button className="view-details" onClick={onViewDetails}>
//       View Details
//     </button>
//     <p>Status:{status}</p>
//   </div>
//   )
// }

// export default ReportedUserCard
