import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from 'react-icons/fi';
import './../styles/header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className='Header-container'>
      <section className='Header-section'>
        <div className='responsive-image'>
          <img 
            onClick={() => navigate('/')} 
            src="https://res.cloudinary.com/dffl7wbtb/image/upload/v1744652328/Artisan_4_tzas3g.png" 
            alt="logo" 
          />
        </div>

        <div className='Header-Pages'>
          <NavLink to="/" end className={({ isActive })=> isActive ? 'active' : 'notActive'}>Home</NavLink>
          <NavLink to="/about" className={({ isActive })=> isActive ? 'active' : 'notActive'}>About Us</NavLink>
          <NavLink to="/contact" className={({ isActive })=> isActive ? 'active' : 'notActive'}>Contact Us</NavLink>
        </div>

        {
          !token ? 
            <div className='Header-authentication'>
                <p><NavLink to="/authoption">Sign Up</NavLink></p>
                <p><NavLink to="/login" style={{color:'white'}}>Login</NavLink></p>
            </div>
          : <p onClick={handleLogout}>< FiLogOut/></p>
        }
        <div className='second-respon' onClick={toggleDropdown}>
          <img 
            src="https://res.cloudinary.com/dffl7wbtb/image/upload/v1744652397/Component_64_vvm2yd.png" 
            alt="menu" 
          />
        </div>

        {isOpen && (
          <div className='dropdown'>
            <NavLink to="/" onClick={toggleDropdown} end>Home</NavLink>
            <NavLink to="/about" onClick={toggleDropdown}>About Us</NavLink>
            <NavLink to="/contact" onClick={toggleDropdown}>Contact Us</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={toggleDropdown}>My Profile</NavLink>
                <div 
                  onClick={() => { handleLogout(); toggleDropdown(); }} 
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', padding: '10px 0' }}
                >
                  <FiLogOut />
                  Logout
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={toggleDropdown}>Login</NavLink>
                <NavLink to="/authoption" onClick={toggleDropdown}>Sign Up</NavLink>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;






