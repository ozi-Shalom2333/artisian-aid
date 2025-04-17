import React from 'react';
import './../styles/footer.css';
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { RiArrowDropRightLine } from "react-icons/ri";

const FooterSubstitute = () => {
  
  
  return (
    <div className='footer' style={{marginTop:'20%'}}>
      
      <div className='Footer-container'>
        <div className='Footer-section-lightblue'>
          <h2>"Unlock New Opportunities -  Get <br />Started <span style={{ color: '#FFA500' }}>Now!</span></h2>
          <div>
            <p>Get Started</p>
          </div>
        </div>
        <div className='footer-select'>
          <div>
            <h3>Artisans</h3>
            <p>Create Profile</p>
          </div>
          <div>
            <h3>Employers</h3>
            <p>Explore Artisans</p>
          </div>
          <div>
            <h3>Platform</h3>
            <p>About Us</p>
            <p>How it works</p>
          </div>
          <div>
            <h3>Support</h3>
            <p>Help Center</p>
            <p>FAQ</p>
          </div>
          <div>
            <h3>Legal</h3>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <hr style={{ width: '95%', margin: '0 auto', marginTop: '50px' }} />
        <div className='footer-bottom'>
          <p>© 2025 [ArtisanAid]. All Rights Reserved.</p>
          <div className='footer-social'>
            <FaTwitter size={25} />
            <FaLinkedin size={25} />
            <FaFacebook size={25} />
          </div>
        </div>
      </div>
      {/*
        mobile view of my footer subsection */}
      <div className='footerContainer_mobile_holder'>
          

          <div className='footerContainerMobileFull' >
            <div className='Footer-section-lightblue_mobile'>
              <h2>"Unlock New Opportunities -  Get Started <span style={{ color: '#FFA500' }}>Now!</span></h2>
              <div className='footer-start'>
                <p>Get Started</p>
                <RiArrowDropRightLine size={25} />
              </div>
            </div>
            <div className='footer-select_mobile'>
              <div>
                <h3>Artisans</h3>
                <p>Create Profile</p>
              </div>
              <div>
                <h3>Employers</h3>
                <p>Explore Artisans</p>
              </div>
              <div>
                <h3>Platform</h3>
                <p>About Us</p>
                <p>How it works</p>
              </div>
              <div>
                <h3>Support</h3>
                <p>Help Center</p>
                <p>FAQ</p>
              </div>
              <div>
                <h3>Legal</h3>
                <p>Terms of Service</p>
                <p>Terms of Service</p>
              </div>
            </div>
            <hr style={{margin: '20px 0'}} />
            <div className='footer-bottom_mobile'>
              <p>
              © 2025 [ArtisanAid]. All Rights Reserved.
              </p>
              <div className='footer-social_mobile'>
                <FaTwitter size={20} />
                <FaLinkedin size={20} />
                <FaFacebook size={20} />
              </div>
            </div>
          </div>
      </div>
       
    </div>
  );
};

export default FooterSubstitute;