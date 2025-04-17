import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Validate Email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate Phone Number
  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^0[789][01]\d{8}$/; 
    return phoneRegex.test(number);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if ((!email && !phoneNumber) || !password) {
      toast.error('Please fill in all the fields.');
      return;
    }
  
    const isEmailValid = isValidEmail(email);
    const isPhoneValid = isValidPhoneNumber(phoneNumber);
  
    if (!isEmailValid && !isPhoneValid) {
      toast.error('Enter a valid email or Nigerian phone number.');
      return;
    }
  
    const loginData = {
      password,
      ...(email ? { email } : { phoneNumber })
    };
  
    const baseUrl = 'https://artisanaid.onrender.com';
  
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/v1/login`, loginData);
      console.log(response);
      
      toast.success('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1500); 
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleForgotPassword = () => navigate('/forget');
  const handleSignUpRedirect = () => navigate('/signup');

  return (
    <div className='loginMainBody'>
      <ToastContainer position="top-right" autoClose={3000} />
      <aside className='loginImageHeader'>
        <img src="/Artisan.png" alt="Artisan" />
      </aside>
      <div className='loginContainerBody'>
        <section className='loginInvisibleFrame'></section>
        <main className='loginInputContainerBody'>
          <div className='loginH2'>
            <h2>Log In</h2>
          </div>
          <section className='loginParagraphLine'>
            <p>Enter your details to get signed in to your account</p>
          </section>
          <div className='loginEmailInput'>
            <section className='loginEmailSection'>
              <span>Email / Phone Number</span>
              <input
                type="text"
                placeholder='Type here'
                value={email || phoneNumber}  // use either email or phoneNumber
                onChange={(e) => {
                  const value = e.target.value;
                  if (isValidEmail(value)) {
                    setEmail(value);
                    setPhoneNumber('');
                  } else {
                    setPhoneNumber(value);
                    setEmail('');
                  }
                }}
              />
            </section>

            <section className='loginPasswordSection'>
              <span>Password</span>
              <input
                type="password"
                placeholder='Type here'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="forgot-password" onClick={handleForgotPassword}>
                Forgot password?
              </p>
            </section>

            <div className='loginClick'>
              <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <aside className='loginTextRouteToSignUp'>
              <p>Don't have an account? </p>
              <span onClick={handleSignUpRedirect}>Sign Up</span>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
