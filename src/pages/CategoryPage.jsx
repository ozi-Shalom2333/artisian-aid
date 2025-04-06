import React from "react";
import { FaBolt, FaHammer, FaLeaf, FaPaintBrush, FaBroom } from "react-icons/fa";  
import "../styles/categorypage.css"; 

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
          <FaBolt className="category-icon" /> 
          <span className="category-label">Electrician</span>
        </div>
        <div className="category-item-box">
          <FaHammer className="category-icon" />
          <span className="category-label">Carpentry</span>
        </div>
        <div className="category-item-box">
          <FaLeaf className="category-icon" /> 
          <span className="category-label">Gardening</span>
        </div>
        <div className="category-item-box">
          <FaPaintBrush className="category-icon" /> 
          <span className="category-label">Painting</span>
        </div>
        <div className="category-item-box">
          <FaBroom className="category-icon" /> 
          <span className="category-label">Home Cleaning</span>
        </div>
        <div className="category-item-box">
          <FaBolt className="category-icon" /> 
          <span className="category-label">Electrician</span>
        </div>
        <div className="category-item-box">
          <FaHammer className="category-icon" />
          <span className="category-label">Carpentry</span>
        </div>
        <div className="category-item-box">
          <FaLeaf className="category-icon" />
          <span className="category-label">Gardening</span>
        </div>
        <div className="category-item-box">
          <FaPaintBrush className="category-icon" /> 
          <span className="category-label">Painting</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
