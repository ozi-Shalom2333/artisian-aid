import React, { useState } from 'react';
import '../styles/employerSignup.css'; 
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EmployerSignUp = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const checkForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.phone) newErrors.phone = 'Phone is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = checkForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error(Object.values(formErrors)[0]); // show first error only
      return;
    }

    const data = {
      fullname: form.name,
      email: form.email,
      phoneNumber: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      const response = await fetch('https://artisanaid.onrender.com/v1/register/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created!');
        setForm({ name: '', phone: '', email: '', password: '', confirmPassword: '' });
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Server error, try again later');
    }
  };

  return (
<<<<<<< HEAD
    <div className='signUpBody'>
      <div className='signContainer'>
        <aside className='signImage'>
          <img src="/Artisan.png" alt="Logo" />
        </aside>

        <div className='signCard'>
          <section className='signHeaderContainer'>
=======
    <div className="employerSignUp__main">
      <ToastContainer />
      <div className="employerSignUp__container">
        <aside className="employerSignUp__image">
          <img src="/Artisan.png" alt="Logo" />
        </aside>

        <div className="employerSignUp__card">
          <section className="employerSignUp__header">
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
            <h2>Create Account</h2>
            <span>Fill in your details to sign up as an Employer.</span>
          </section>

<<<<<<< HEAD
          <form onSubmit={handleSubmit} className='signForm'>
            <div className='signUpRow'>
              <div className='signInputGroup'>
                <p>Full Name</p>
=======
          <form onSubmit={handleSubmit} className="employerSignUp__form">
            <div className="employerSignUp__row">
              <div className="employerSignUp__inputGroup">
                <p>Name</p>
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  placeholder="Your name"
                />
                {errors.name && <small className="employerSignUp__error">{errors.name}</small>}
              </div>
<<<<<<< HEAD
              <div className='signInputGroup'>
                <p>Phone Number</p>
=======
              <div className="employerSignUp__inputGroup">
                <p>Phone</p>
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInput}
                  placeholder="080..."
                />
                {errors.phone && <small className="employerSignUp__error">{errors.phone}</small>}
              </div>
            </div>

<<<<<<< HEAD
            <div className='signRow'>
              <div className='signInputGroup'>
=======
            <div className="employerSignUp__row">
              <div className="employerSignUp__inputGroup">
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  placeholder="Your email"
                />
                {errors.email && <small className="employerSignUp__error">{errors.email}</small>}
              </div>
<<<<<<< HEAD
              <div className='signInputGroup'>
=======
              <div className="employerSignUp__inputGroup">
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleInput}
                  placeholder="Your password"
                />
                {errors.password && <small className="employerSignUp__error">{errors.password}</small>}
              </div>
            </div>

<<<<<<< HEAD
            <div className='signRowSingle'>
              <div className='signInputGroup'>
=======
            <div className="employerSignUp__rowSingle">
              <div className="employerSignUp__inputGroup">
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleInput}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <small className="employerSignUp__error">{errors.confirmPassword}</small>
                )}
              </div>
            </div>

<<<<<<< HEAD
            <div className='signTerms'>
              <p>
                By creating an account you automatically agree 
              </p>
              <p> to ArtisanAid <span>Terms and Condition</span></p>
=======
            <div className="employerSignUp__terms">
              <p>By creating an account you automatically agree</p>
              <p>to ArtisanAid <span className="employerSignUp__link">Terms and Condition</span></p>
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
            </div>

            <button type="submit" className="employerSignUp__submitBtn">
              Create Account
            </button>

<<<<<<< HEAD
            <div className='signRouteToLogin'>
=======
            <div className="employerSignUp__redirect">
>>>>>>> 1036de8e423301e97cf1a48f710ea00b79a0775c
              <p>
                Already have an account?{' '}
                <span 
                  onClick={() => navigate('/login')} 
                  className="employerSignUp__link"
                >
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
