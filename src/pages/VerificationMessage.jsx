import React, { useState } from "react";
import "../styles/verificationmessage.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import verification_message_image from '../assets/verification_message_image.png'

const VerificationMessage = () => {
  // get the email from localStorage
  const email = localStorage.getItem("email");
  console.log(email);

  // base URL
  const baseURL = "https://artisanaid.onrender.com/v1";

  // loading state for resend button
  const [isResending, setIsResending] = useState(false);

  // function to handle email resend using axios post method
  const handleEmailResend = async () => {
    setIsResending(true); // Set loading state to true
    try {
      const response = await axios.post(`${baseURL}/resend/email`, { email });
      console.log(response.data);
      // use toast to display backend message
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend verification email.");
    } finally {
      setIsResending(false); // Reset loading state
    }
  };

  return (
    <div className="verificationBody">
      <section className="verificationHeaderImage">
        <img src="/Artisan.png" alt="" />
      </section>

      <section className="message_image">
        <img src={verification_message_image} alt="image"/>
      </section>

      <section className="verificationMessage">
        <div className="verificationLinkMessage">
          <h3>We sent you an email</h3>
          <p>Please check your email inbox for a verification link sent from us</p>
        </div>
      </section>
      <div className="verificationResendLink">
        <p>Didn't receive an email?</p>
        <span onClick={handleEmailResend}>
          {isResending ? "Resending..." : "Resend link"}
        </span>
      </div>
      {/* fxnbvnc v */}
      <ToastContainer />
    </div>
  );
};

export default VerificationMessage;
