import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/categorypage.css";
import Header from "../components/Header";
import categoryListing from "../components/categoryList"; 

const CategoryPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="category-page-container">
      <Header />
      <div className="category-title-section">
        <h1 className="category-title">
          Discover Our <span className="highlight-text">Artisans</span> Categories
        </h1>
        <p className="category-description">
          Browse our categories to find the perfect professional for your needs.
        </p>
      </div>

      <div className="category-item-boxes">
        {categoryListing.map((category, index) => (
          <div
            key={index}
            className="category-item-box-G"
            onClick={() => handleCategoryClick(category.text)}
          >
            <img
              src={category.image}
              className="category-icon"
              alt={`${category.text} icon`}
            />
            <span className="category-label">{category.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
