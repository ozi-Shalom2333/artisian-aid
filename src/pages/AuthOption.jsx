import React from 'react';
import "../styles/authoption.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AuthOption = () => {
  const navigate = useNavigate();

  const handleArtisanSignup = () => {
    navigate('/signup');
  };

  const handleEmployerSignup = () => {
    navigate('/employersignup');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className='authOptionBody'>
      <section className='authWelcomeContainer'>
        <div className='authArrowIcon' onClick={handleGoBack}>
          <img src="/Frame 1000006180.png" alt="Back Arrow" />
        </div>
        <div className='authWelcomeH2'>
          <nav>
            <h1>Welcome To</h1> <img src="/Artisan.png" alt="Artisan Logo" />
          </nav>
          <span>Select who you want to sign up as</span>
        </div>
        <div className='authUnseenSpace'></div>
      </section>

      <section className='authInputContainer'>
        <aside className='authOptionArtisan'
        onClick={handleArtisanSignup}>
          <img src="/Vector.png" alt="Artisan Icon" />
          <section className='authOptionsConnect'>
            <h2>Artisans</h2>
            <p>Connect with clients and upscale</p>
          </section>
          <div className='authRightArrow'>
            <FaArrowRight />
          </div>
        </aside>

        <aside className='authOptionArtisan' 
        onClick={handleEmployerSignup}>
          <img src="/Vector (2).png" alt="Employer Icon" />
          <section className='authOptionsConnect'>
            <h2>Employer</h2>
            <p>Access and book the artisan you need</p>
          </section>
          <div className='authRightArrow' >
            <FaArrowRight />
          </div>
        </aside>       
      </section>
    </div>
  );
};

export default AuthOption;