import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showpassword);
  };

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
      console.log(response)
      if (response.status === 200) {
        const token = response.data.token;

        localStorage.setItem('authToken', token);
        localStorage.setItem('employerToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        const userRole = response.data.data.role;
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('report', response.data.token);
        localStorage.setItem('jobPostImage',JSON.stringify(response.data.jobPostImage))

        toast.success(response.data.message || 'Login successful!');
        toast.info('Redirecting...');

        if (userRole === 'Admin') {
          navigate('/admindashboard');
        } else if (userRole === 'Employer') {
          navigate('/employerdashboard');
        } else if (userRole === 'Artisan') {
          navigate('/artisandashboard');
          
        } else {
          console.error('Unknown user role:', userRole);
          toast.error('Unknown user role. Please contact support.');
        }
      } else {
        toast.error('Login successful, but an unexpected response was received.');
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
  const handleSignUpRedirect = () => navigate('/authoption');

  return (
    <div className='loginMainBody1'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='firstborn' >
        <img onClick={() => navigate('/')} src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744842325/Artisan_qs4cex.png" alt="Logo" />
      </div>
      <div className='lastborn'>
        <h1>Log In</h1>
        <p>Enter your details to get signed in into your account</p>
        <div className='loginEmailInput'>
          <span>
            <p>Email/Phone number</p>
          </span>
          <input
            type="text"
            placeholder='Type here'
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div className='loginEmailPassword'>
          <span>
            <p>Password</p>
          </span>
          <div className='loginPasswordSection' >
            <input
              style={{border: 'none',borderRadius:'10px', outline: 'none'}}
              type={showpassword ? 'text' : 'password'}
              placeholder='Type here'
              value={password}
              
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='showPassword' onClick={togglePasswordVisibility}>
              {showpassword ? <MdOutlineRemoveRedEye color='black' /> : <FaRegEyeSlash color='black' />}
            </span>
          </div>
          <p className='forget' onClick={handleForgotPassword}>Forgot Password?</p>
        </div>
        <button className='button' onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p>Don't have an account?
          <span className='gosignUp' onClick={handleSignUpRedirect}> SignUp</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
