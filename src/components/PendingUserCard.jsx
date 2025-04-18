import React from "react";
import '../styles/PendingUsers.css'

const PendingUserCard = ({ user, onViewDetails }) => {
  return (
    <div className="user-card">
      <div id="user-info">
        <img src={user.image} alt={user.name} className="user-avatar" />
        <span className="user-name">{user.name}</span>
      </div>
      <span className="user-email">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum laborum, saepe esse similique iusto ducimus nulla quas at corrupti ratione ipsam consectetur, recusandae numquam maxime exercitationem debitis impedit aspernatur aut?</span>
      <button className="view-details" onClick={onViewDetails}>
        View Details For Verification
      </button>
    </div>
  );
};


export default PendingUserCard;
