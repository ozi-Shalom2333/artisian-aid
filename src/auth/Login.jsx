import React from 'react'
import "../styles/login.css"

const Login = () => {
  return (
    <div className='loginMainBody'>
      <aside className='loginImageHeader'>
        <img src="/Artisan.png" alt="" />
      </aside>
      <div className='loginContainerBody'>
        <section className='loginInvisibleFrame'></section>
        <main className='loginInputContainerBody'>
          <div className='loginH2'>
            <h2>Log In</h2>
          </div>
          <section className='loginParagraphLine'>
            <p>Enter your details to get signed up into your account </p>
          </section>
          <div className='loginEmailInput'>
            <section className='loginEmailSection'>
              <span>Email</span>
              <input type="text" placeholder='Type here' />
            </section>

            <section className='loginPasswordSection'>
              <span>Password</span>
              <input type="text" placeholder='Type here' />
              <p>Forgot password?</p>
            </section>

            <div className='loginClick'>
              <button>Login</button>
            </div>

            <aside className='loginTextRouteToSignUp'>
              <p>Don't have an account? </p><span>sign up</span>
            </aside>
          </div>

        </main>

      </div>

    </div>
  )
}

export default Login
