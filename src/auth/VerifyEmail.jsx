import React from 'react'
import '../styles/verifyemail.css'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {

  const navigate = useNavigate()
  return (
    <div className='verifyEmailBody'>
      <main className='verifyEmailImage'>
        <img src="/Clip path group.png" alt="" />
      </main>
      <aside className='verifyEmailH2'>
        <h2>Success</h2>
        <p>Your password has been reset</p>
      </aside>
      <div className='verifyEmailSpanSection'>
        <span>Your email has been successfully verified,we appreciate you</span>
        <p>taking the time your time,click on the link below to login</p>
      </div>
      <section className='verifyEmailLoginButton'>
        <button>Login</button>
      </section>
      
    </div>
  )
}

export default VerifyEmail