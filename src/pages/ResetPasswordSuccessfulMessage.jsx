import React from 'react'
import '../styles/reset-password-success-message.css'

const ResetPasswordSuccessfulMessage = () => {
  return (
    <div className='resetSuccessMessageBody'>
      <main className='resetSuccessMessageImage'>
        <img src="/Clip path group.png" alt="" />
      </main>
      <aside className='resetSuccessMessageH2'>
        <h2>Success</h2>
        <p>Your password has been reset</p>
      </aside>
      <div className='resetSuccessMessageSpanSection'>
        <span>Your password has been successfully reset,click on the button below to</span>
        <p>login with your new password</p>
      </div>
      <section className='resetSuccessMessageLoginButton'>
        <button>Login</button>
      </section>
      
    </div>
  )
}

export default ResetPasswordSuccessfulMessage