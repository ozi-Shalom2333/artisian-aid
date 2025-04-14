import React, { useState } from 'react';
import "../styles/forget.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState(""); // State to store the email input
  const [isLoading, setIsLoading] = useState(false); // State for loading effect

  // base URL
  const baseURL = 'https://artisanaid.onrender.com/v1';

  // Function to handle password reset request
  const handlePasswordReset = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${baseURL}/forgot/password`, { email });
      toast.success(response.data.message || "Password reset link sent!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to send password reset link."
      );
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className='forgetBody'>
      <main className='forgetMainContainer'>
        <section className='forgetImage'>
          <img src="/Forgot password-bro 1 (1).png" alt="" />
        </section>

        <aside className='forgetPasswordContainer'>
          <div className='forgetPasswordH1'><h2>Forgot Password?</h2></div>
          <div className='forgetPasswordText'>
            <p>Enter the email address you used to create the account, and we will</p>
            <span>email you instructions to reset your password.</span>
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
        </aside>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;