import React from 'react'
import "../styles/verificationmessage.css";
import '../../public/Frame 1000006356.png'
import verification_message_image from '../assets/verification_message_image.png'

const ResetPasswordMessage= () => {
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
          <p>Check your inbox for the password reset link,if you dont</p>
          <span>see it soon check your spam folder</span>
        </div>
      </section>
      <div className="verificationResendLink">
        <p>Didn't receive an email?</p>
        <span>
          Resend link
        </span>
      </div>
      {/* fxnbvnc v */}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default ResetPasswordMessage