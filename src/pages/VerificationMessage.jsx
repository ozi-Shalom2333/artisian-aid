import React from 'react'
import '../styles/verificationmessage.css'

const VerificationMessage= () => {
  return (
    <div className='verificationBody'>
      <section className='verificationHeaderImage'>
        <img src="/Artisan.png" alt="" />
      </section>

      <aside className='verificationImage'>
        <img src="/Email capture-pana 1.png" alt="" />
      </aside>

     <section className='verificationMessage'>
        <div className='verificationLinkMessage'>
            <span>We sent you an email</span>
        </div>
        <aside className='verificationSent'>
          <span>Please check your email inbox for a verification link</span>
          <p>sent from us</p>
        </aside>
     </section>
     <div className='verificationResendLink'>
      <p>Didn't receive an email?</p><span>Resend link</span>
     </div>
    </div>
  )
}

export default VerificationMessage