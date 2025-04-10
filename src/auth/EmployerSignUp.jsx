import React, { useState } from 'react';
import '../styles/employerSignup.css';
import { useNavigate } from 'react-router-dom'; 

const EmployerSignUp = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^0\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone Number must be 11 digits starting with 0.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    alert('Account created successfully!');
  };

  return (
    <div className='signUpMainBody'>
      <div className='signUpContainer'>
        <aside className='signUpImage'>
          <img src="/Artisan.png" alt="Logo" />
        </aside>

        <div className='signUpCard'>
          <section className='signUpHeaderContainer'>
            <h2>Create Account</h2>
            <span>Enter the required information to create your account as an Employer.</span>
          </section>

          <form onSubmit={handleSubmit} className='signUpForm'>
            <div className='signUpRow'>
              <div className='signUpInputGroup'>
                <p>Full Name</p>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Type here'
                />
                {errors.fullName && <small className="inputError">{errors.fullName}</small>}
              </div>
              <div className='signUpInputGroup'>
                <p>Phone Number</p>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='080**********'
                />
                {errors.phone && <small className="inputError">{errors.phone}</small>}
              </div>
            </div>

            <div className='signUpRow'>
              <div className='signUpInputGroup'>
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Type here'
                />
                {errors.email && <small className="inputError">{errors.email}</small>}
              </div>
              <div className='signUpInputGroup'>
                <p>Password</p>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Type here'
                  />
                  <span
                    onClick={togglePassword}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>
                {errors.password && <small className="inputError">{errors.password}</small>}
              </div>
            </div>

            <div className='signUpRowSingle'>
              <div className='signUpInputGroup'>
                <p>Confirm Password</p>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Type here'
                  />
                  <span
                    onClick={toggleConfirm}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </span>
                </div>
                {errors.confirmPassword && <small className="inputError">{errors.confirmPassword}</small>}
              </div>
            </div>

            <div className='signUpTerms'>
              <p>
                By creating an account you automatically agree 
              </p>
              <p> to ArtisanAid <span>Terms and Condition</span></p>
            </div>

            <button type="submit" className='signUpCreateAccountButton'>Create account</button>

            <div className='signUpRouteToLogin'>
              <p>
                Already have an account?{' '}
                <span 
                  onClick={() => navigate('/login')} 
                  style={{ cursor: 'pointer', color: '#007bff' }}
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
