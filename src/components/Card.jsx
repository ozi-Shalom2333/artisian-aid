import React from 'react';
import './../styles/profile.css'; 
import { MdVerified } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Card({ data }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/userprofile/${data._id}`);
  };

  return (
    <div className="card">
      <section className="card-header">
        <div>
          <header>
            <img 
              src={data.profilePic?.image_url || "https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935876/Frame_4_ke3z11.png"} 
              alt={data.fullname} 
              className="profile-image"
            />
          </header>
          <aside className="profile-text">
            <h3>
              {data.fullname}
              <MdVerified size={20} color='blue' />
            </h3>
            <p className="profile-view">View profile</p>
          </aside>
        </div>
        <div className="share-icon">
          <FiUpload size={20} />
        </div>
      </section>

      <div className="card-image">
        <img 
          src={data.jobPostId?.jobImage?.image_url || "/default-job.jpg"} 
          alt="Job preview" 
        />
      </div>

      <div className="card-footer">
        <div className="service-info">
          <div className="service-name">{data.category || "Service"}</div>
          <div className="service-details">
            <span className="rating">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} size={16} color="#f5b50a" />
              ))}
            </span>
            <span className="recommended">Recommended</span>
          </div>
        </div>

        <div className='card-price' onClick={handleClick}>
          <p>Book Now</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
