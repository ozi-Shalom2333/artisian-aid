import React, { useEffect, useState } from 'react';
import '../styles/verifyemail.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true); 
  const [isVerified, setIsVerified] = useState(false); 


  const token = new URLSearchParams(location.search).get('token');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`https://artisanaid.onrender.com/v1/verify/account/${token}`);
        toast.success(response.data.message || "Account verified successfully!");
        setIsVerified(true); 
      } catch (error) {
        console.error(error);
        toast.error(
          "Invalid or missing token."
        );
        
        setTimeout(() => {
          navigate('/error'); 
        }, 3000);
      } finally {
        setIsLoading(false); 
      }
    };

    if (token) {
      verifyAccount();
    } else {
      toast.error("Invalid or missing token.");
      setTimeout(() => {
        navigate('/error'); // Redirect after 3 seconds
      }, 3000); // 3000ms = 3 seconds
    }
  }, [token, navigate]);

  const handleClick = () => {
    navigate('/login');
  };

  if (isLoading) {

    return (
      <div className="loadingModal">
        <p>Verifying your account...</p>
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return (
   <>
    <div className='verifyEmailBody'>
      <main className='verifyEmailImage'>
        <img src="/Clip path group.png" alt="" />
      </main>
      <aside className='verifyEmailH2'>
        <h2>Success</h2>
        <p>Your password has been reset</p>
      </aside>
      <div className='verifyEmailSpanSection'>
        <span>Your email has been successfully verified, we appreciate you</span>
        <p>taking the time, click on the link below to login</p>
      </div>
      <section className='verifyEmailLoginButton'>
        <button onClick={handleClick}>Login</button>
      </section>
    </div>
    <ToastContainer />
   </>
  );
};

export default VerifyEmail;