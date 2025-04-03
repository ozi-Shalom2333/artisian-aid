import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../styles/header.css'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='Header-container'>
      <section className='Header-section'>
      <img onClick={()=> navigate('/')} style={{objectFit: 'contain', width: '20%', cursor:'pointer'}} src="/Artisan.png" alt=""  sizes='30'/>
      


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
            <NavLink to="/signup" >Sign Up</NavLink>
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
