import React from 'react'
import { FcApproval } from "react-icons/fc";

const ApprovedUserCard = ({image,
    name,
    onViewDetails,
    status,
    email,
    verified,}) => {
  return (
     <div className="user-card">
         <div id="user-info">
           <div className="reported-avatar user-avatar">
             <img src={image} alt={""} className="user-avatar" />
             <div className="labels-sticks">
               <FcApproval size={20} color="red" />
             </div>
           </div>
           <span className="user-name">{name}</span>
         </div>
         <span className="user-email">{email}</span>
         <button className="view-details view-details2" onClick={onViewDetails}>
           View Details
         </button>
         <p className="user-card__status">{status}</p>
         <p className="user-card__verified">{verified}</p>
       </div>
  )
}

export default ApprovedUserCard