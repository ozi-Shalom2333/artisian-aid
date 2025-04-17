import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from 'react-icons/fi';
import './../styles/header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    setIsAuthenticated(!!token); 
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
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
          <p><NavLink to="/" end>Home</NavLink></p>
          <p><NavLink to="/about">About Us</NavLink></p>
          <p><NavLink to="/contact">Contact Us</NavLink></p>
        </div>

        <div className='Header-authentication'>
          {isAuthenticated ? (
            <div className="user-profile" style={{display:'flex', gap:'20px', justifyContent:'center',alignItems:'center', }}>
               <p>My Profie</p>
              <NavLink to="/employerdashboard"><CgProfile size={40} color='rgb(255, 183, 51)'/></NavLink>
              {/* <FiLogOut 
                onClick={handleLogout} 
                size={20}
                color='red' 
                style={{ cursor: 'pointer' }} 
                title="Logout" 
              /> */}
            </div>
          ) : (
            <>
              <p><NavLink to="/authoption">Sign Up</NavLink></p>
              <p><NavLink to="/login">Login</NavLink></p>
            </>
          )}
        </div>

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
