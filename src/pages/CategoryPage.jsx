import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categorypage.css"
import Header from "../components/Header";

const CategoryPage = () => {
  
  const navigate = useNavigate();
 
  

  return (
    <div className="category-page-container">  
    <Header/>
      <div className="category-title-section">
        <h1 className="category-title">
          Discover Our <span className="highlight-text">Artisans</span> Categories
        </h1>
        <p className="category-description">
          Browse our categories to find the perfect professional for your needs.
        </p>
      </div>

     
      <div className="category-item-boxes">
        <div className="category-item-box-G" onClick={()=> navigate('/category/electrician')}>
          <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220125/electrician-svgrepo-com_1_u0mzzu.png" className="category-icon" /> 
          <span className="category-label">Carpentry Services</span>
        </div>
        <div className="category-item-box-G" onClick={()=> navigate('/category/gardening')}>
          <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220126/gardening-tools-equipment-svgrepo-com_1_1_sebwge.png" className="category-icon" /> 
          <span className="category-label">Gardening Services</span>
        </div>
        <div className="category-item-box-G" onClick={()=> navigate('/category/laundry')}>
          <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220130/Vector_2_zcermi.png" className="category-icon" /> 
          <span className="category-label">Laundary Services</span>
        </div>
        <div className="category-item-box-G" onClick={()=> navigate('/category/home cleaning')}> 
          <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220513/cleaner-broom-svgrepo-com_1_bcq4ca.png" className="category-icon" /> 
          <span className="category-label">Home Cleaning Services</span>
        </div>
        <div className="category-item-box-G" onClick={()=> navigate('/category/electrician')}>
          <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220125/electrician-svgrepo-com_1_u0mzzu.png" className="category-icon" /> 
          <span className="category-label">Electrical Services</span>
        </div>
        <div className="category-item-box-G" onClick={()=> navigate('/category/pain')}>
        <img src="https://res.cloudinary.com/djnowfvsk/image/upload/v1744220129/painter-with-roller-and-paint-bucket-svgrepo-com_1_aaeeep.png" className="category-icon" />
        <span className="category-label">Painting Services</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
