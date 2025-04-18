// Logout.jsx
import React from 'react';
import '../../styles/logout.css';

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <img src="/logoutImage.png" alt="" srcset="" width={100} height={100} />
        <h3>Are you sure you want to<br />logout</h3>
        <div className="logout-buttons">
          <button className="logout-btn cancel-btn" onClick={onCancel}>
            No
          </button>
          <button className="logout-btn confirm-btn" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;












// // Logout.jsx
// import React from 'react';
// import '../../styles/logout.css';

// const Logout = ({ onConfirm, onCancel }) => {
//   return (
//     <div className="logout-modal-overlay">
//       <div className="logout-modal">
//         <h3>Are you sure you want to logout</h3>
//         <div className="logout-buttons">
//           <button 
//             className="logout-btn confirm-btn"
//             onClick={onConfirm}
//           >
//             Yes
//           </button>
//           <button 
//             className="logout-btn cancel-btn"
//             onClick={onCancel}
//           >
//             No
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Logout;