import React from 'react'
import "../styles/signup.css"



const SignUp = () => {
  return (
    <div className='signUpMainBody'>
      <aside className='signUpImage'>
        <img src="/Artisan.png" alt="" />
      </aside>
      <section className='signUpHeaderContainer'>
        <h2>Create Account</h2>
        <span>Enter the required information to create your account.</span>
      </section>
      <main className='signUpInputSection'>
        <div className='SignUpForNameAndBusinessInput'>
          <section className='signUpInputForName'>
            <p>Full Name</p>
            <input type="text" placeholder='Type here'/>
          </section>
          <section className='signUpInputForBusiness'>
          <p>Business Name</p>
          <input type="text" placeholder='Type here'/>
          </section>
        </div>


        <div className='SignUpForEmailAndPhoneNumberInput'>
          <section className='signUpInputForEmail'>
            <p>Email</p>
            <input type="text" placeholder='Type here'/>
          </section>
          <section className='signUpInputForPhoneNumber'>
          <p>Phone Number</p>
          <input type="text" placeholder='080********'/>
          </section>
        </div>

        <div className='SignUpForPasswordAndConfirmPasswordInput'>
          <section className='signUpInputForPassword'>
            <p>Password</p>
            <input type="text" placeholder='Type here'/>
          </section>
          <section className='signUpInputForConfirmPassword'>
          <p>Confirm Password</p>
          <input type="text" placeholder='Type here'/>
          </section>
        </div>

        <div className='SignUpForCategoryInput'>
          <section className='signUpInputForCategory'>
            <p>Category</p>
            <input type="text" placeholder='Select category'/>
          </section>
        </div>
      </main>

<section className='signUpTermsAndConditions'>
     <div className='SignUpForTermsAndConditonContainer'>
      <p>By creating an account you automatically agree to ArtisanAid</p>
      <span>Terms and Condition</span>
      </div>

      <button className='signUpCreateAccountButton'>Create account</button>
      <div className='signUpRouteToLogin'>
        <p>Already have an account?</p> <span>Login</span>
      </div>
</section>
    </div>
  )
}

export default SignUp
