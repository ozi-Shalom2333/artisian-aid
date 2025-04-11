import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../styles/header.css'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='Header-container'>
      <section className='Header-section'>
      <img onClick={()=> navigate('/')} style={{objectFit: 'contain', width: '20%', cursor:'pointer'}} src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744194748/Artisan_ifmbb4.png" alt=""  sizes='30'/>
      


      <div className='Header-Pages'>
        <p>
          <NavLink to="/" end >Home</NavLink>
        </p>
        <p>
          <NavLink to="/about" >About Us</NavLink>
        </p>
        <p>
         <NavLink to="/contact">Contact us</NavLink>
        </p>
      </div>


      <div className='Header-authentication'>
        <p>
            <NavLink to="/authoption" >Sign Up</NavLink>
        </p>
        <p>
            <NavLink to="/login" >Login</NavLink>
        </p> 
        
      </div>
      </section>
    </div>
  )
}

export default Header
