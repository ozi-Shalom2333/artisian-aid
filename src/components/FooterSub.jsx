import React from 'react'
import '../styles/footerSub.css'
import { RiArrowDropRightLine } from "react-icons/ri";

const FooterSub = () => {
  return (
    <div className='footerSub'>
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
  )
}

export default FooterSub
