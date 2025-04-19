import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/ReasonForDecline.css'; 

const ReasonForDecline = ({ onSubmit }) => {
  const [reason, setReason] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/declined-users'); 
  };

  return (
    <div className="modal-overlay1">
      <div className="modal-container1">
        <h2 className="modal-title1">Why decline user?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="modal-textarea1"
            placeholder="Enter reason for declining"
          ></textarea>
          <button type="submit" className="modal-submit-btn1">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReasonForDecline;



