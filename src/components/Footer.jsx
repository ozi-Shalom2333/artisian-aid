import React from 'react'
import './../styles/footer.css'
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { RiArrowDropRightLine } from "react-icons/ri";


const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerContainer'>
      <div className='footerSub__content'>
         <div>
            <h1>
            "Experience the <br /> Art of Expert <br /> Craftsmanship - <span style={{color:' #2F80ED'}}> Explore Now!"</span>
            </h1>
         </div>
         <p>
            Explore Artisans
         <RiArrowDropRightLine size={25}/>
         </p>
       </div>
    </div>
    <div className='Footer-container'>
      <div className='Footer-section-lightblue'>
        <h2>"Unlock New Opportunities -  Get <br />Started <span style={{color:'#FFA500'}}>Now!"</span></h2>
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
      <hr style={{width:'95%', margin:'0 auto', marginTop:'50px'}} />
      <div className='footer-bottom'>
        <p>© 2025 [ArtisanAid]. All Rights Reserved.</p>
        <div className='footer-social'>
          <FaTwitter size={25}/>
          <FaLinkedin size={25}/>
          <FaFacebook size={25}/>
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Footer
 