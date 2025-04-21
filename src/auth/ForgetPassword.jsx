import React, { useState } from 'react';
import "../styles/forget.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true); 
    try {
      const response = await axios.post(`${baseURL}/forgot/password`, { email });
      toast.success(response.data.message || "Password reset link sent!");

      // Redirect after a short delay so user sees the toast
      setTimeout(() => {
        navigate("/resetmessage");
      }, 1000);
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
          <img src="/Frame 1000006356.png" alt="Illustration" />
        </section>

        <section className='forgetPasswordContainer'>
          <h2>Reset Password?</h2>
          <div className='forgetPasswordText'>
            <p>
              Enter the email address you used to create the account, and we will<br />
              email you instructions to reset your password.
            </p>
          </div>

          <div className='forgetPasswordInput'>
            <p>Email</p>
            <input
              type="email"
              placeholder='Type here'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='forgetPasswordSendEmail'>
            <button onClick={handlePasswordReset} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send email"}
            </button>
          </div>

          <section className='forgetRemember'>
            <p>
              Remember your password?{" "}
              <span
                onClick={() => navigate('/login')}
                style={{
                  cursor: 'pointer',
                  color: '#007bff',
                  textDecoration: 'underline'
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/login')}
              >
                Login
              </span>
            </p>
          </section>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
