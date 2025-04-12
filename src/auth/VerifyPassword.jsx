import React from 'react'
import '../styles/verify.css'

const VerifyPassword = () => {
  return (
    <div className='verifyPassword'>
      <main className='verifyPasswordMainContainer'>
        <aside className='verifyPasswordArtisanImage'>
          <img src="/Artisan.png" alt="" />
        </aside>

        <section className='verifyPasswordImage'>
          <img src="/Reset password-rafiki 1.png" alt="" />
        </section>

        <div className='verifyPasswordH2'>
          <h1>Create New Password</h1>
        </div>

        <section className='verifyPasswordInputSection'>
          <div className='verifyPasswordInput'>
            <p>Password</p>
            <input type="text" placeholder='Type here'/>
            </div>

            <div className='verifyConfirmPasswordInput'>
            <p> Confirm Password</p>
            <input type="text" placeholder='Type here'/>
            </div>

            <div className='verifyPasswordButton'>
            <button>Reset Password</button>
            </div>
        </section>


      </main>
      
    </div>
  )
}

export default VerifyPassword
