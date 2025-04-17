import React, { useState, useEffect } from 'react'
import '../styles/home.css'
import Card from '../components/Card'
import { RiArrowDropRightLine } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import categoryListing from '../components/categoryList';
import Carousel from '../components/Carousel';

import { toast } from 'react-toastify';


const HomePage = () => {
  
  const [artisans, setArtisans] = useState([])  
  const [error, setError] = useState(null)
 

  useEffect(() => {
    const getRecommededArtisans = async () => {
      try {
        const response = await axios.get('https://artisanaid.onrender.com/v1/recommended/artisans');
        console.log(response.data.data);
        setArtisans(response.data.data)
 
      } catch (error) {
        console.log(error);
         toast.error( error.response?.data?.message);
        setLoading(false);
      }
    };

    getRecommededArtisans();
  }, []);



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
            <p>
              <NavLink to="/authoption" style={{textDecoration:'none', color:'white'}}>
              Get Started Now
              </NavLink>
              </p>
            <p>
              <NavLink to="/category" style={{textDecoration:'none', color:'white'}}>
              Book Now
              </NavLink>
              </p>
           </div>
        </div>
       <div className='homePage__hero2'>
          <div>
            <h1>Reliable. <span style={{color:' #FFA500'}}>Efficient.</span> <br /> Quality Guaranteed.</h1>
            <p>Find trusted artisans for all your home improvement <br /> needs as a busy professional.</p>
            <section className='explore-artisans' onClick={()=> navigate('/artisanpage')}>
            <p>Explore Artisans</p>
            <RiArrowDropRightLine size={25}/>
            </section>
            <section>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220127/Group_awpfr4.png" alt=""  />
                <p>Efficient</p>
              </div>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220125/flexible-access-svgrepo-com_1_svylwv.png" alt="" />
                <p>Flexible</p>
              </div>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220310/diamond-1-solid-svgrepo-com_1_kgk1hq.png" alt="" />
                <p>Trustworthy</p>
              </div>
            </section>
          </div>
          <div className='homePage__hero2__img'>
             <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744219962/Group_14_blxmnt.png" alt="" />
          </div>
            </div>

       {/* mobile responsiveness setup */}
       
       
          <div className='homePage__hero2__mobile'>
            <h1>Reliable. <span>Efficient.</span> Quality  <br /> Guaranteed.</h1>
            <p>Find trusted artisans for all your home improvement needs as a busy professional.</p>
            <section className='home-h2-d2' >
            <aside className='sect-mobile'>
               <section className='explore-artisans' onClick={()=> navigate('/artisanpage')}>
              <p>Explore Artisans</p>
              <RiArrowDropRightLine size={25}/>
              </section>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220127/Group_awpfr4.png" alt=""  />
                <p>Efficient</p>
              </div>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220125/flexible-access-svgrepo-com_1_svylwv.png" alt="" />
                <p>Flexible</p>
              </div>
              <div>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220310/diamond-1-solid-svgrepo-com_1_kgk1hq.png" alt="" />
                <p>Trustworthy</p>
              </div>

            </aside>

              <div className='homePage__hero2__img'>
                <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744219962/Group_14_blxmnt.png" alt="" />
              </div>
            </section>
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
          <div className='seeMore' onClick={()=> navigate('/category')}>
            <p>See more</p>
            <RiArrowDropRightLine size={25}/>
          </div>
       </div>
       <div className='recommendedart'>
            <h1>Top Recommended Artisan Services</h1>
            <div className='catfilter-card'>
                    {
                        artisans.map((e)=>(
                            <Card data = {e}/>
                        ))
                    }
            </div>
          </div>

       {/* mobile set up for categories */}
       <div className='homePage__hero3_mobile'>
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
            <h3>Testimonials</h3>
            <h1>Hear from Our  <span style={{color:'#2F80ED'}}>Satisfied</span> <br /> Employers</h1>
            <Carousel/>
       </div>
      
    </div>
  )
}

export default HomePage
