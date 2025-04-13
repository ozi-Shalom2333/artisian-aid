import React from 'react';
import './../styles/banner.css';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-left">
        <h1>"Experience the Art of Expert Craftsmanship -</h1>
        <h1 className="highlight">Explore Now!"</h1>
      </div>
      <div className="banner-right">
        <p className="explore-link">Explore Artisans &gt;</p>
      </div>
    </div>
  );
};

export default Banner;