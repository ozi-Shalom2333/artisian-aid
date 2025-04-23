import React from 'react'
import "../styles/verificationmessage.css";
import '../../public/Frame 1000006356.png'
import verification_message_image from '../assets/verification_message_image.png'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPasswordMessage= () => {
  const {email} = useLocation().state
  console.log(email)
  const baseURL = 'https://artisanaid.onrender.com/v1';

  const handleResendLink = async() => {
    const id = toast.loading("Resending link...")
    try {
      const response = await axios.post(`${baseURL}/resend/reset`, { email });
      toast.success(response?.data?.message)
      toast.dismiss(id)
    } catch (error) {
      toast.dismiss(id)
      console.log(error)
    }
  }
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
          <h3>Reset Password Email Sent</h3>
          <p>Check your inbox for the password reset link. If you don’t see it soon,</p>
<span>please check your spam folder.</span>

        </div>
      </section>
      <div className="verificationResendLink">
        <p>Didn't receive an email?</p>
        <span onClick={handleResendLink}>
          Resend link
        </span>
      </div>
      {/* fxnbvnc v */}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default ResetPasswordMessage