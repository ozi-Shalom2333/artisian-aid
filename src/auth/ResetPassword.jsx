import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import '../styles/resetpassword.css';

const ResetPassword = () => {
  const { token } = useParams();  
  const navigate = useNavigate();  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", regex: /.{8,}/ },
    { label: "At least one uppercase letter", regex: /[A-Z]/ },
    { label: "At least one lowercase letter", regex: /[a-z]/ },
    { label: "At least one number", regex: /[0-9]/ },
    { label: "At least one special character (!@#$%^&*)", regex: /[!@#$%^&*]/ }
  ];

  const baseURL = 'https://artisanaid.onrender.com'; 

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
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${baseURL}/v1/reset/password/${token}`,
        { password: password, confirmPassword }
      );
      console.log(password, confirmPassword)
      toast.success(response.data.message || 'Password reset successful!');

      // Wait 2.5 seconds before redirecting to login
      setTimeout(() => {
        navigate('/login');
      }, 2500);

    } catch (error) {
      console.error(error);
      console.log(password, confirmPassword)
      toast.error(
        error.response?.data?.message || 'Failed to reset password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='verifyPassword'>
      <main className='verifyPasswordMainContainer'>
        <aside className='verifyPasswordArtisanImage'>
          <img src='/Artisan.png' alt='Artisan logo' />
        </aside>

        <section className='verifyPasswordImage'>
          <img src="/Frame 1000006356.png" alt="Illustration" />
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
              onFocus={() => setTouched(true)}
              required
            />
            {touched && formData.password && (
                              <ul className="password-requirements">
                                {passwordRequirements.map((req, index) => {
                                  const isValid = req.regex.test(formData.password);
                                  return (
                                    <li
                                      key={index}
                                      className={`requirement ${
                                        isValid ? "valid" : "invalid"
                                      }`}
                                    >
                                      {isValid ? <MdCheckCircle /> : <MdCancel />} {req.label}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                            {errors.password && (
                              <p className="error-text">{errors.password}</p>
                            )}
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

          {errorMessage && <p className='the_message'>{errorMessage}</p>}

          <div className='verifyPasswordButton'>
            <button onClick={handleResetPassword} disabled={isLoading}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </section>
      </main>

      <ToastContainer />  
    </div>
  );
};

export default ResetPassword;

