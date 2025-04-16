import React from 'react'
import '../styles/footer.css'
import { RiArrowDropRightLine } from "react-icons/ri";

const Banner = () => {
  return (
    <div className='footer'>
      <div className='footerContainer'>
        <div className='footerSub__content'>
          <div>
            <h1>
              "Experience the <br /> Art of Expert <br /> Craftsmanship - <span style={{ color: ' #2F80ED' }}> Explore Now!</span>
            </h1>
          </div>
          <p >
            Explore Artisans
            <RiArrowDropRightLine size={25} />
          </p>
        </div>
      </div>

      {/* mobile view */}
    <div >
      <div className='footerContainer_mobile'>
        <h1>
           Explore Artisans
           <RiArrowDropRightLine size={25} />
        </h1>
        <div>
           <p>Experience the <br /> Art of Expert <br /> Craftsmanship - <br /> <span style={{color:'#2F80ED'}}> Explore Now!</span></p>  
       </div>
      </div>
    </div>
  </div>  
  )
}

export default Banner
