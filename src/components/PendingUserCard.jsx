import React from "react";

const PendingUserCard = ({ user, onViewDetails }) => {
  return (
    <div className="user-card">
      <div id="user-info">
        <img src={user.image} alt={user.name} className="user-avatar" />
        <span className="user-name">{user.name}</span>
      </div>
      <span className="user-email">{user.email}</span>
      <button className="view-details" onClick={onViewDetails}>
        View Details For Verification
      </button>
    </div>
  );
};


export default PendingUserCard;