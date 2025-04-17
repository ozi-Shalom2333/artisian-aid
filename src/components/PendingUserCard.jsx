import React from "react";
import PropTypes from "prop-types";

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

PendingUserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default PendingUserCard;