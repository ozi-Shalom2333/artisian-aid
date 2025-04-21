import React, { useEffect, useState } from 'react';
import '../styles/verifyemail.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const {token} = useParams()

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`https://artisanaid.onrender.com/v1/verify/account/${token}`);
        toast.success(response.data.message || "Account verified successfully!");
        setIsVerified(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        console.error(error);
        toast.error("Invalid or missing token.");
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
        navigate('/error');
      }, 3000);
      setIsLoading(false); 
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
  } else{
    null
  }

 
  return (
    <>
      <div className='verifyEmailBody'>
        <main className='verifyEmailImage'>
          <img src="/Clip path group.png" alt="" />
        </main>
        <aside className='verifyEmailH2'>
          {/* <h2>Success</h2> */}
          <p>Your email has been verified</p>
        </aside>
        <div className='verifyEmailSpanSection'>
          <span>You are set to continue</span>
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