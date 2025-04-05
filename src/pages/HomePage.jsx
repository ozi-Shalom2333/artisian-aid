import React from 'react'
import '../styles/home.css'
import { RiArrowDropRightLine } from "react-icons/ri";

const HomePage = () => {
  return (
    <div className='HomePage'>
       <div className='homePage__hero1'>
           <h1>Transform Your <span style={{color:' #FFA500'}}> Skills </span> Into <br /> Opportunities</h1>
           <p>Connect with clients, grow your business, 
            and build <br /> a brighter future with ArtisanAid. 
           <b> Sign up now and <br /> start building your success story!"
           </b></p>
           <div className='homePage__hero1__btns'>
            <p>Get Started Now</p>
            <p>Book Now</p>
           </div>
       </div>
       <div className='homePage__hero2'>
          <div>
            <h1>Reliable. <span style={{color:' #FFA500'}}>Efficient.</span> <br /> Quality Guaranteed.</h1>
            <p>Find trusted artisans for all your home improvement <br /> needs as a busy professional.</p>
            <section>
            <p>Explore Artisans</p>
            <RiArrowDropRightLine size={25}/>
            </section>
            <section>
              <div>
                <img src="/Group.png" alt=""  />
                <p>Efficient</p>
              </div>
              <div>
                <img src="/flexible-access-svgrepo-com 1.png" alt="" />
                <p>Flexible</p>
              </div>
              <div>
                <img src="/diamond-1-solid-svgrepo-com 1.png" alt="" />
                <p>Trustworthy</p>
              </div>
            </section>
          </div>
          <div>

          </div>
       </div>
    </div>
  )
}

export default HomePage
