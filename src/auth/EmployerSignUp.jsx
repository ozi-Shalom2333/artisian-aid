import React, { useState } from 'react';
import '../styles/employerSignup.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const EmployerSignUp = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const checkForm = () => {
    const newError = {};
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!form.fullname) newError.fullname = 'Full name is required';

    if (!form.phoneNumber) {
      newError.phoneNumber = 'Phone number is required';
    } else if (!/^\+?\d{7,15}$/.test(form.phoneNumber)) {
      newError.phoneNumber = 'Enter a valid phone number';
    }

    if (!form.email) newError.email = 'Email is required';

    if (!form.password) {
      newError.password = 'Password is required';
    } else if (!strongPasswordRegex.test(form.password)) {
      newError.password =
        'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one special character';
    }

    if (!form.confirmPassword) {
      newError.confirmPassword = 'Confirm password is required';
    } else if (form.password !== form.confirmPassword) {
      newError.confirmPassword = 'Passwords do not match';
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formError = checkForm();
    if (Object.keys(formError).length > 0) {
      setError(formError);
      toast.error(Object.values(formError)[0]);
      return;
    }

    const data = {
      fullname: form.fullname,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        'https://artisanaid.onrender.com/v1/register/employer',
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Signup successful!");
        setTimeout(() => {
          navigate("/verificationmessage");
        }, 1000);
        setForm({
          fullname: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error, try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employerSignUp__main">
      <ToastContainer />
      <div className="employerSignUp__container">
        <aside className="employerSignUp__image">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dkxms3ctv/image/upload/v1744634401/Artisan_3_myrrpj.png"
              alt="Logo"
              className="clickable-logo"
            />
          </Link>
        </aside>

        <div className="employerSignUp__card">
          <section className="employerSignUp__header">
            <h2>Create Account</h2>
            <span>Enter the required information to create your account as an Employer.</span>
          </section>

          <form onSubmit={handleSubmit} className="employerSignUp__form">
            <div className="employerSignUp__row">
              <div className="employerSignUp__inputGroup">
                <p>Full Name</p>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={handleInput}
                  placeholder="Your name"
                  disabled={loading}
                />
                {error.fullname && <small className="employerSignUp__error">{error.fullname}</small>}
              </div>
              <div className="employerSignUp__inputGroup">
                <p>Phone Number</p>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleInput}
                  placeholder="080..."
                  disabled={loading}
                />
                {error.phoneNumber && <small className="employerSignUp__error">{error.phoneNumber}</small>}
              </div>
            </div>

            <div className="employerSignUp__row">
              <div className="employerSignUp__inputGroup">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  placeholder="Your email"
                  disabled={loading}
                />
                {error.email && <small className="employerSignUp__error">{error.email}</small>}
              </div>
              <div className="employerSignUp__inputGroup">
                <p>Password</p>
                <div className="employerSignUp__passwordWrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleInput}
                    placeholder="Your password"
                    disabled={loading}
                  />
                  <span className="employerSignUp__toggleEye" onClick={togglePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
                {error.password && <small className="employerSignUp__error">{error.password}</small>}
              </div>
            </div>

            <div className="employerSignUp__rowSingle">
              <div className="employerSignUp__inputGroup">
                <p>Confirm Password</p>
                <div className="employerSignUp__passwordWrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInput}
                    placeholder="Confirm password"
                    disabled={loading}
                  />
                  <span className="employerSignUp__toggleEye" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <small className="employerSignUp__error">{error.confirmPassword}</small>
                )}
              </div>
            </div>

            <div className="employerSignUp__terms">
              <p>By creating an account you automatically agree</p>
              <p>to ArtisanAid <span className="employerSignUp__link">Terms and Condition</span></p>
            </div>

            <button
              type="submit"
              className={`employerSignUp__submitBtn` +
                (form.fullname &&
                form.phoneNumber &&
                form.email &&
                form.password &&
                form.confirmPassword
                  ? ' active'
                  : '')}
              disabled={
                loading ||
                !form.fullname ||
                !form.phoneNumber ||
                !form.email ||
                !form.password ||
                !form.confirmPassword
              }
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="employerSignUp__redirect">
              <p>
                Already have an account?{' '}
                <span onClick={() => navigate('/login')} className="employerSignUp__link">
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignUp;
