import React from 'react'
import "../styles/forget.css"

const ForgetPassword = () => {
  return (
    <div className='forgetBody'>
      <main className='forgetMainContainer'>
        <section className='forgetImage'>
           <img src="/Forgot password-bro 1 (1).png" alt="" />
        </section>

        <aside className='forgetPasswordContainer'>
           <div className='forgetPasswordH1'><h2>Forgot Password?</h2></div>
           <div className='forgetPasswordText'>
            <p>Enter the email address you used to create the account,and we will</p>
            <span>email you instructions to reset your password.</span>
           </div>
           <div className='forgetPasswordInput'>
            <p>Email</p>
            <input type="text" placeholder='Type here'/>
           </div>

           <div className='forgetPasswordSendEmail'>
            <button>Send email</button>
           </div>

           <section className='forgetRemember'>
            <p>Remember your password?</p> <span>Login</span>
           </section>

        </aside>

      </main>

    </div>
  )
}

export default ForgetPassword
