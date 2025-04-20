import React, { useState } from 'react';
import "../styles/forget.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/Frame 1000006356.png"
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  
  const baseURL = 'https://artisanaid.onrender.com/v1';

  
  const handlePasswordReset = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true); 
    try {
      const response = await axios.post(`${baseURL}/forgot/password`, { email });
      toast.success(response.data.message || "Password reset link sent!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to send password reset link."
      );
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className='forgetBody'>
      <main className='forgetMainContainer'>
        <section className='forgetImage'>
          <img src="/Frame 1000006356.png" alt="" />
        </section>

        <section className='forgetPasswordContainer'>
          <h2>Reset Password?</h2>
          <div className='forgetPasswordText'>
            <p>Enter the email address you used to create the account, and we will<br/> email you instructions to reset your password.</p>
          </div>
          <div className='forgetPasswordInput'>
            <p>Email</p>
            <input
              type="text"
              placeholder='Type here'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>

          <div className='forgetPasswordSendEmail'>
            <button onClick={handlePasswordReset} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send email"}
            </button>
          </div>

          <section className='forgetRemember'>
            <p>Remember your password?</p> <span>Login</span>
          </section>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;