import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './../styles/header.css'

const Header = () => {
    
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }
    const navigate = useNavigate()
  return (
    <div className='Header-container'>
      <section className='Header-section'>
        <div className='responsive-image'> 
          <img onClick={()=> navigate('/')} src="https://res.cloudinary.com/dffl7wbtb/image/upload/v1744652328/Artisan_4_tzas3g.png" alt="" />
        </div>

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
        <div  className='second-respon' onClick={toggleDropdown}>
          <img src="https://res.cloudinary.com/dffl7wbtb/image/upload/v1744652397/Component_64_vvm2yd.png" alt="" />
        </div>
        {
          isOpen == true ? 
            <div className='dropdown' >
              <p>Home</p>
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Login</p>
              <p>Sign Up</p>
            </div> 
          : null
        }
      </section>
    </div>
  )
}

export default Header
