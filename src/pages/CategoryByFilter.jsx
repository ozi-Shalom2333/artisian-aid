import React from "react";
import "./CategoryByFiliter.css";
import { VscStarFull } from "react-icons/vsc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const CategoryByFiliter = () => {
  const artisans = [
    {
      id: 1,
      name: "Tolu Andy",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdIPLcEdf9OJ2iCtCc9ZdrxmGyiczKQEN7mw&s",
      service: "Painter Service",
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: "Dave Odi",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAenRG0CI1bP-jPWSoXlX6hR-AOLDzhfsFRQ&s",
      service: "Painter Service",
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: "Dave Odi",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAenRG0CI1bP-jPWSoXlX6hR-AOLDzhfsFRQ&s",
      service: "Painter Service",
      rating: 5,
      verified: true,
    },
  ];

  const handleBook = (name) => {
    toast.success(`Successfully booked ${name}!`); 
  };

  return (
    <div>
      <div className="cat-hero">
        <img
          src="https://s3-alpha-sig.figma.com/img/aa01/ae37/f9348ed1d380e33d8c556a6bcafc47e4?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ITsl1j~zUlO1cRcHL8j83qpjUAB8iWx09LOkUjP8lWG-5yb~CQaJjmk3CZsZqnUEHdMrntgTmjznTJ3wnkXG4WT751GzXJhFOxG7XUKX7GJ8SXNtIh9NsjeShnFOF9mLskZ7WNkcFyUAGFuJczacfLb26QIRglLxIc-u61G9aPQU9fPRJC3mOTuMK4Th64tPKif7sroHapC4D4i5EkzsJwjLk0JDaAQSiCkMFKjocpqUWUZYbgjbEeS8Xu1CKbhqJMFNtY5m0Wqh8sYIbNr32V7cb5PGQKAhTcYpiuUlsazJc~yxIjrhmYrygyLop6NUuOSgZELPmwZsTS974TgePw__"
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
          <input type="text" placeholder="Search ..." />
          <button className="search-btn">Search</button>
        </div>

        <div className="card-grid">
          {artisans.map((artisan) => (
            <div className="card" key={artisan.id}>
              <div className="card-header">
                <div className="profile-info">
                  <img
                    className="profile-img"
                    src={artisan.image}
                    alt={artisan.name}
                  />
                  <div>
                    <p className="name">
                      {artisan.name}{" "}
                      {artisan.verified && (
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

              <img src={artisan.image} alt="service" className="service-img" />

              <div className="card-footer">
                <p className="service-name">{artisan.service}</p>
                <p className="rating">
                  <VscStarFull style={{ color: "#FFD700" }} />
                  <VscStarFull style={{ color: "#FFD700" }} />
                  <VscStarFull style={{ color: "#FFD700" }} />
                  <VscStarFull style={{ color: "#FFD700" }} />
                  <VscStarFull style={{ color: "#FFD700" }} />
                  <span className="recommend">Recommended </span>
                </p>
                <button
                  className="book-btn"
                  onClick={() => handleBook(artisan.name)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CategoryByFiliter;