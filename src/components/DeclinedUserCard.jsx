import React from 'react'
import { FcApproval } from "react-icons/fc";
import { PiWarningCircleLight } from "react-icons/pi";


const DeclinedUserCard = ({image,name,email,status}) => {
  return (
    <div className="user-card">
    <div id="user-info">
      {/* <img src={image} alt={""} className="user-avatar" /> */}
      <div className="reported-avatar user-avatar">
                <img src={image} alt={""} className="user-avatar" />
                <div className="labels-sticks">
                  <PiWarningCircleLight size={20} color="red" />
                </div>
              </div>
      <span className="user-name">{name}</span>
    </div>
    <span className="user-email" style={{fontSize:18}}v>{email}</span>
    <p className="user-card__status">Status:{status}</p>
  </div>
  )
}

export default DeclinedUserCard