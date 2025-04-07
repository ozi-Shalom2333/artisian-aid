import React from 'react'
import '../styles/home.css'
import categoryListing from '../components/categoryList';
import { RiArrowDropRightLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };
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
          <div className='homePage__hero2__img'>
             <img src="/Group 14.png" alt="" />
             <section>
               <p></p>
             </section>
          </div>
       </div>
       <div className='homePage__hero3'>
          <aside >
          <h1>Discover Our <span style={{color:'#FFA500'}}>Artisans</span> Categories</h1>
          <h3>Browse our categories to find the perfect professional for your needs.</h3>
          </aside>
          <div className='homePage__hero3__category'>
             {categoryListing.map((category, index) => (

             <div key={index} className='homePage__hero3__categories' onClick={() => handleCategoryClick(category.text)}>
                <img src={category.image} alt="" />
                <p>{category.text}</p>
            </div>
         ))}
          </div>
       </div>
       <div className='homePage__carousel'>
            
       </div>


    </div>
  )
}

export default HomePage
