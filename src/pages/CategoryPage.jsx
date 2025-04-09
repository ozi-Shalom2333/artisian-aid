import React from "react";
import "../styles/categorypage.css"

const CategoryPage = () => {
  return (
    <div className="category-page-container">
      <div className="overlay-background"></div>

  
      <div className="category-title-section">
        <h1 className="category-title">
          Discover Our <span className="highlight-text">Artisans</span> Categories
        </h1>
        <p className="category-description">
          Browse our categories to find the perfect professional for your needs.
        </p>
      </div>

     
      <div className="category-item-boxes">
        <div className="category-item-box">
          <img src="public/electrician-svgrepo-com 1.png" className="category-icon" /> 
          <span className="category-label">Electrician</span>
        </div>
        <div className="category-item-box">
          <img src="public/painter-with-roller-and-paint-bucket-svgrepo-com 1.png" className="category-icon" />
          <span className="category-label">Painting</span>
        </div>
        <div className="category-item-box">
          <img src="public/gardening-tools-equipment-svgrepo-com 1 (1).png" className="category-icon" /> 
          <span className="category-label">Gardening</span>
        </div>
        <div className="category-item-box">
          <img src="public/Vector (2).png" className="category-icon" /> 
          <span className="category-label">Laundry</span>
        </div>
        <div className="category-item-box">
          <img src="public/cleaner-broom-svgrepo-com 1.png" className="category-icon" /> 
          <span className="category-label">Home Cleaning</span>
        </div>
        <div className="category-item-box">
          <img src="public/electrician-svgrepo-com 1.png" className="category-icon" /> 
          <span className="category-label">Electrician</span>
        </div>
        <div className="category-item-box">
        <img src="public/painter-with-roller-and-paint-bucket-svgrepo-com 1.png" className="category-icon" />
        <span className="category-label">Painting</span>
        </div>
        <div className="category-item-box">
          <img src="public/gardening-tools-equipment-svgrepo-com 1 (1).png" className="category-icon" />
          <span className="category-label">Gardening</span>
        </div>
        <div className="category-item-box">
        <img src="public/Vector (2).png" className="category-icon" /> 
        <span className="category-label">Laundry</span>
        </div>
        <div className="category-item-box">
        <img src="public/painter-with-roller-and-paint-bucket-svgrepo-com 1.png" className="category-icon" />
        <span className="category-label">Painting</span>
        </div>
        <div className="category-item-box">
          <img src="public/gardening-tools-equipment-svgrepo-com 1 (1).png" className="category-icon" />
          <span className="category-label">Gardening</span>
        </div>
        <div className="category-item-box">
        <img src="public/Vector (2).png" className="category-icon" /> 
        <span className="category-label">Laundry</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
