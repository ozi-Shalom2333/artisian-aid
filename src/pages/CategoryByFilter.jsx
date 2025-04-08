import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/categoryByFilter.css";
import { VscStarFull } from "react-icons/vsc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryByFiliter = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");

  const renderStars = (rating) => {
    if (rating === 0) {
      return null;
    }
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<VscStarFull key={i} style={{ color: "#FFD700" }} />);
    }
    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://artisanaid.onrender.com/v1/artisans/category`,
          {
            params: { category },
          }
        );
        setItems(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No results found for this category.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleBook = (name) => {
    toast.success(`Successfully booked ${name}!`);
  };

  return (
    <div>
      <div className="cat-hero">
        <img
          src="/public/Premium Photo _ AfricanAmerican decorator painting light wall.jpeg"
          alt=""
        />
        <div className="cat-overlay">
          <p className="cat-subheading">Painting Services</p>
          <h1>
            Get <span className="highlight">Satisfying</span> Painting <br />
            Services at your Finger Tip
          </h1>
        </div>
      </div>
      <div className="artisan-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search ..."
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>

        <div className="card-grid">
          {loading ? (
            <p>Loading...</p>
          ) : items.length > 0 ? (
            items.map((items) => (
              <div className="card" key={items.id}>
                <div className="card-header">
                  <div className="profile-info">
                    <img
                      className="profile-img"
                      src={items.image}
                      alt={items.fullname}
                    />
                    <div>
                      <p className="name">
                        {items.name}{" "}
                        {items.isVerified && (
                          <span className="check">
                            <RiVerifiedBadgeFill />
                          </span>
                        )}
                      </p>
                      <a href="#" className="view-profile">
                        View profile
                      </a>
                    </div>
                  </div>
                  <a href="#" className="expand">
                    <BsBoxArrowUpRight />
                  </a>
                </div>

                <img src={items.image} alt="s" className="service-img" />

                <div className="card-footer">
                  <p className="service-name">{items.category}</p>
                  <p className="rating">
                    {renderStars(items.rating)}
                    {items.isRecommended && (
                      <span className="recommend">{items.isRecommended}</span>
                    )}
                  </p>
                  <button
                    className="book-btn"
                    onClick={() => handleBook(items.fullname)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>{error}</p>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CategoryByFiliter;
