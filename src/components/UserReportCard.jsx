import React from 'react'
import { FcCancel } from "react-icons/fc";

const UserReportCard = ({image,name,purpose}) => {
  return (
    <div id="reported-card">
    <div id="reported-info">
    <img src={image} alt={""} className="user-avatar" />
      <p className="user-name">{name}</p>
    </div>
    <div className="user-purpose"><h4>Purpose:</h4> <span className="">{purpose}</span></div>
    {/* <button className="view-details" onClick={onViewDetails}>
      View Details For Verification
    </button> */}
  </div>
  )
}

export default UserReportCard