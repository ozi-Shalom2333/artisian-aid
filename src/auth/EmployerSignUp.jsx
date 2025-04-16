import React, { useState } from 'react';
import '../styles/employerSignup.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EmployerSignUp = () => {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const checkForm = () => {
    const newErrors = {};
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!form.fullname) newErrors.fullname = 'Full name is required';

    if (!form.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?\d{7,15}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid phone number';
    }

    if (!form.email) newErrors.email = 'Email is required';

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!strongPasswordRegex.test(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include one uppercase letter, one lowercase letter, and one special character';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = checkForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error(Object.values(formErrors)[0]);
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
          <img src="https://res.cloudinary.com/dkxms3ctv/image/upload/v1744634401/Artisan_3_myrrpj.png" alt="Logo" />
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
                {errors.fullname && <small className="employerSignUp__error">{errors.fullname}</small>}
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
                {errors.phoneNumber && <small className="employerSignUp__error">{errors.phoneNumber}</small>}
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
                {errors.email && <small className="employerSignUp__error">{errors.email}</small>}
              </div>
              <div className="employerSignUp__inputGroup">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  placeholder="Your password"
                  disabled={loading}
                />
                {errors.password && <small className="employerSignUp__error">{errors.password}</small>}
              </div>
            </div>

            <div className="employerSignUp__rowSingle">
              <div className="employerSignUp__inputGroup">
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                  placeholder="Confirm password"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <small className="employerSignUp__error">{errors.confirmPassword}</small>
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
