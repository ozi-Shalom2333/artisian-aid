import React from 'react'
import '../styles/resetpasswordmessage.css'

const ResetPasswordMessage= () => {
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
          <span>Success email has been sent,please check your email inbox for a reset</span>
          <p>password link from us </p>
        </aside>
     </section>
     <div className='resetPasswordMessageResendLink'>
      <p>Didn't receive an email?</p><span>Resend link</span>
     </div>
    </div>
  )
}

export default ResetPasswordMessage