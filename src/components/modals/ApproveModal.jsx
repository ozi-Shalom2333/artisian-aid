import React from 'react'
import { FaExclamation } from 'react-icons/fa' // npm install react-icons
import '../../styles/Delete.css'

const ApproveModal = ({ onCancel, onConfirm  }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-circle">
            <FaExclamation className="modal-icon" />
          </div>
  
          <h2 className="modal-title">Are you sure?</h2>
  
          <p className="modal-text">
            Are you sure you want to approve this user 
          </p>
  
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
            <button className="btn-confirm" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  };
  

export default ApproveModal

