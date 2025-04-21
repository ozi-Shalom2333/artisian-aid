import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles
import '../styles/verify.css';

const VerifyPassword = () => {
  const { token } = useParams();  
  const navigate = useNavigate();  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const baseURL = 'https://artisanaid.onrender.com'; 

  // Function to handle password reset
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage('Please fill in both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');  // Clear previous error messages

    try {
      // Make the API call to reset the password
      const response = await axios.post(
        `${baseURL}/v1/reset/password/${token}`, 
        { password }
      );

      // Show success toast and redirect to login
      toast.success(response.data.message || 'Password reset successful!');
      navigate('/login');  // Optionally, redirect to the login page after success
    } catch (error) {
      // Handle errors and show error toast
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <div className='verifyPassword'>
      <main className='verifyPasswordMainContainer'>
        <aside className='verifyPasswordArtisanImage'>
          <img src='/Artisan.png' alt='Artisan logo' />
        </aside>

        <section className='verifyPasswordImage'>
          <img src='/Reset password-rafiki 1.png' alt='Password reset illustration' />
        </section>

        <div className='verifyPasswordH2'>
          <h1>Create New Password</h1>
        </div>

        <section className='verifyPasswordInputSection'>
          <div className='verifyPasswordInput'>
            <p>Password</p>
            <input
              type='password'
              placeholder='Type here'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='verifyConfirmPasswordInput'>
            <p>Confirm Password</p>
            <input
              type='password'
              placeholder='Type here'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className='error-message'>{errorMessage}</p>}

          <div className='verifyPasswordButton'>
            <button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </section>
      </main>

      <ToastContainer />  {/* Container to display toasts */}
    </div>
  );
};

export default VerifyPassword;

