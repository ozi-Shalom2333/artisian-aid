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
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  

  useEffect(() => {
    const getRecommendedArtisans = async () => {
      try {
        const response = await axios.get('https://artisanaid.onrender.com/v1/recommended/artisans');
        setArtisans(response.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || 'Failed to fetch recommended artisans.');
      } finally {
        setLoading(false);
      }
    };

    getRecommendedArtisans();
  }, []);

  const handleCategoryClick = (nameOfCategory) => {
    // const encodedCategory = encodeURIComponent(category);
    navigate(`/category/${nameOfCategory}`);
  };

  return (
    <div className='HomePage'>
      <div className='homePage__hero1'>
        <h1>Transform Your <span style={{ color: '#FFA500' }}>Skills</span> Into <br /> Opportunities</h1>
        <p>
          Connect with clients, grow your business, and build <br />
          a brighter future with ArtisanAid. <b>Sign up now and <br />
          start building your success story!</b>
        </p>
        <div className='homePage__hero1__btns'>
          <button>
            <NavLink to="/authoption" style={{ textDecoration: 'none', color: 'white' }}>
              Get Started Now
            </NavLink>
          </button>
          <button>
            <NavLink to="/category" style={{ textDecoration: 'none', color: 'white' }}>
              Book Now
            </NavLink>
          </button>
        </div>
      </div>

      <div className='homePage__hero2'>
        <div>
          <h1>Reliable. <span style={{ color: '#FFA500' }}>Efficient.</span> Quality <br /> Guaranteed.</h1>
          <p>
            Find trusted artisans for all your home improvement <br />
            needs as a busy professional.
          </p>
          <section className='explore-artisans' onClick={() => navigate('/artisanpage')}>
            <p>Explore Artisans</p>
            <RiArrowDropRightLine size={25} />
          </section>
          <section>
            <div>
              <img src="public/Group.webp" alt="Efficient" />
              <p>Efficient</p>
            </div>
            <div>
              <img src="public/flexible-access-svgrepo-com 1.webp" alt="Flexible" />
              <p>Flexible</p>
            </div>
            <div>
              <img src="public/diamond-1-solid-svgrepo-com 1.webp" alt="Trustworthy" />
              <p>Trustworthy</p>
            </div>
          </section>
        </div>
        <div className='homePage__hero2__img'>
          <img src="public/Group 14.webp" alt="Hero" />
        </div>
      </div>

      {/* Mobile Responsive Section */}
      <div className='homePage__hero2__mobile'>
        <h1>Reliable. <span>Efficient.</span> Quality <br /> Guaranteed.</h1>
        <p>Find trusted artisans for all your home improvement needs as a busy professional.</p>
        <section className='home-h2-d2'>
          <aside className='sect-mobile'>
            <section className='explore-artisans' onClick={() => navigate('/artisanpage')}>
              <p>Explore Artisans</p>
              <RiArrowDropRightLine size={25} />
            </section>
            <div>
              <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220127/Group_awpfr4.png" alt="Efficient" />
              <p>Efficient</p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220125/flexible-access-svgrepo-com_1_svylwv.png" alt="Flexible" />
              <p>Flexible</p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220310/diamond-1-solid-svgrepo-com_1_kgk1hq.png" alt="Trustworthy" />
              <p>Trustworthy</p>
            </div>
          </aside>
          <div className='homePage__hero2__img'>
            <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744219962/Group_14_blxmnt.png" alt="Hero" />
          </div>
        </section>
      </div>

      <div className='homePage__hero3'>
        <aside>
          <h1>Discover Our <span style={{ color: '#FFA500' }}>Artisans</span> Categories</h1>
          <h3>Browse our categories to find the perfect professional for your needs.</h3>
        </aside>
        <div className='homePage__hero3__category'>
          {categoryListing.map((category, index) => (
            <div key={index} className='homePage__hero3__categories' onClick={() => handleCategoryClick(category.text)}>
              <img src={category.image} alt={category.text} />
              <p>{category.text}</p>
            </div>
          ))}
        </div>
        <div className='seeMore' onClick={() => navigate('/category')}>
          <p>See more</p>
          <RiArrowDropRightLine size={25} />
        </div>
      </div>

      <div className='recommendedart'>
        <h1>Top Recommended Artisan <br /> Services</h1>
        <div className='catfilter-card'>
          {loading ? (
            <p>Loading recommended artisans...</p>
          ) : artisans.length > 0 ? (
            artisans.map((e) => <Card key={e._id} data={e} />)
          ) : (
            <p>No recommended artisans available.</p>
          )}
        </div>
      </div>

      {/* Mobile category listing */}
      <div className='homePage__hero3_mobile'>
        <aside>
          <h1>Discover Our <span style={{ color: '#FFA500' }}>Artisans</span> Categories</h1>
          <h3>Browse our categories to find the perfect professional for your needs.</h3>
        </aside>
        <div className='homePage__hero3__category'>
          {categoryListing.map((category, index) => (
            <div key={index} className='homePage__hero3__categories' onClick={() => handleCategoryClick(category.text)}>
              <img src={category.image} alt={category.text} />
              <p>{category.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='homePage__carousel'>
        <h3>Testimonials</h3>
        <h1>Hear from Our <span style={{ color: '#2F80ED' }}>Satisfied</span> <br /> Employers</h1>
        <Carousel />
      </div>
    </div>
  );
};

export default HomePage;
