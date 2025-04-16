import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^0[789][01]\d{8}$/;
    return phoneRegex.test(number);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      toast.error('Please fill in all the fields.');
      return;
    }

    const isEmailValid = isValidEmail(identifier);
    const isPhoneValid = isValidPhoneNumber(identifier);

    if (!isEmailValid && !isPhoneValid) {
      toast.error('Enter a valid email or Nigerian phone number.');
      return;
    }

    const loginData = {
      password,
      ...(isEmailValid ? { email: identifier } : { phoneNumber: identifier })
    };

    const baseUrl = 'https://artisanaid.onrender.com';

    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/v1/login`, loginData);
        console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        const userRole = response.data.role;
        toast.success(response.data.message || 'Login successful!');

        toast.info('Redirecting...');
        if (userRole === 'Admin') {
          navigate('../dashboards/admin/AdminDashboard.jsx');
        } else if (userRole === 'Employer') {
          navigate('../dashboards/employer/EmployerDash.jsx');

          console.error('Unknown user role:', userRole);
          // navigate('/dashboard'); 
        }
      } else {
        toast.error('Login successful, but an unexpected response was received.');
        // navigate('/dashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      const status = error.response?.status;

      if (status === 400) {
        toast.error(errorMessage || 'Incorrect password.');
      } else if (status === 401) {
        toast.error(errorMessage || 'Account not verified or is restricted.');
      } else {
        toast.error('Login failed. Please try again later.');
        console.error("Login Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => navigate('/forget');
  const handleSignUpRedirect = () => navigate('/signup');

  return (
    <div className='loginMainBody'>
      <ToastContainer position="top-right" autoClose={3000} />
      <aside className='loginImageHeader' onClick={()=> navigate('/')}>
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
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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