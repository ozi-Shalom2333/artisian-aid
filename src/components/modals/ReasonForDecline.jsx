import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/ReasonForDecline.css'; // Import the CSS file

const ReasonForDecline = ({ onSubmit }) => {
  const [reason, setReason] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/declined-users'); // Route to the declinedUsers page
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Why decline user?</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="modal-textarea"
            placeholder="Enter reason for declining"
          ></textarea>
          <button type="submit" className="modal-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReasonForDecline;








// import React, { useState } from 'react';
// import '../../styles/ReasonForDecline.css'; // Import the CSS file

// const ReasonForDecline = ({ onSubmit }) => {
//   const [reason, setReason] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(reason);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <h2 className="modal-title">why decline decline user?</h2>
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             className="modal-textarea"
//             placeholder=""
//           ></textarea>
//           <button type="submit" className="modal-submit-btn">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReasonForDecline;
