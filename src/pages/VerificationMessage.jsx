import React, { useState } from 'react';
import '../styles/verificationmessage.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerificationMessage = () => {
  
  const email = localStorage.getItem('email');
  console.log(email);

  
  const baseURL = 'https://artisanaid.onrender.com/v1';

  
  const [isResending, setIsResending] = useState(false);

  
  const handleEmailResend = async () => {
    setIsResending(true); 
    try {
      const response = await axios.post(`${baseURL}/resend/email`, { email });
      console.log(response.data);
  
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend verification email.");
    } finally {
      setIsResending(false); 
    }
  };

  return (
    <div className='resetPasswordMessageBody'>
    <section className='resetPasswordMessageHeaderImage'>
      <img src="/Artisan.png" alt="" />
    </section>

    <aside className='resetPasswordMessageImage'>
      <img src="/Email capture-pana 1.png" alt="" />
    </aside>

   <section className='resetPasswordMessage'>
      <div className='verificationLinkMessage'>
          <span>Email sent</span>
      </div>
      <aside className='resetPasswordMessageSent'>
        <span>Success email has been sent,please check your email inbox for a verification link</span>
        <p>sent from us </p>
      </aside>
   </section>
   <div className='resetPasswordMessageResendLink'>
    <p>Didn't receive an email?</p>
    <span onClick={handleEmailResend}>Resend link
    {/* {isResending ? "Resending..." : "Resend link"} */}
    </span>

   </div>
   <ToastContainer />

  </div>
  );
};

export default VerificationMessage;
// import React, { useState } from 'react';
// import '../styles/verificationmessage.css';
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VerificationMessage = () => {
  
//   const email = localStorage.getItem('email');
//   console.log(email);

  
//   const baseURL = 'https://artisanaid.onrender.com/v1';

  
//   const [isResending, setIsResending] = useState(false);

  
//   const handleEmailResend = async () => {
//     setIsResending(true); 
//     try {
//       const response = await axios.post(`${baseURL}/resend/email`, { email });
//       console.log(response.data);
  
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to resend verification email.");
//     } finally {
//       setIsResending(false); 
//     }
//   };

//   return (
//     <div className='verificationBody'>
//       <section className='verificationHeaderImage'>
//         <img src="/Artisan.png" alt="" />
//       </section>
//       verificationImage
//       <aside className=''>
//         <img src="/Email capture-pana 1.png" alt="" />
//       </aside>

//       <section className='verificationMessage'>
//         <div className='verificationLinkMessage'>
//           <span>We sent you an email</span>
//         </div>
//         <aside className='verificationSent'>
//           <span>Please check your email inbox for a verification link</span>
//           <p>sent from us</p>
//         </aside>
//       </section>
//       <div className='verificationResendLink'>
//         <p>Didn't receive an email?</p>
//         <span onClick={handleEmailResend}>
          // {isResending ? "Resending..." : "Resend link"}
//         </span>
//       </div>
//       {/* fxnbvnc v */}
      // <ToastContainer />
//     </div>
//   );
// };

// export default VerificationMessage;