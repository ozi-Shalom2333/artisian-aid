import React from 'react';
import './../styles/profile.css'
import { FiUpload } from 'react-icons/fi'; 
import { AiFillStar } from 'react-icons/ai'; 

function Card({data}) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="profile-info">
          <div className="profile-image">
            <img src="/download (16).jpeg" alt="Profile" />
          </div>
          <div className="profile-text">
            <div className="profile-name">{data.fullname}</div>
            <div className="profile-view">View profile</div>
          </div>
        </div>
        <div className="share-icon">
          <FiUpload size={20} />
        </div>
      </div>
      <div className="card-image">
        
        <img src="/Free Photo _ Young african american builder man wearing construction vest and safety helmet showing paint brush stretching out looking confident on isolated white.jpeg" alt="Painter" />
      </div>
      <div className="card-footer">
        <div className="service-info">
          <div className="service-name">{data.category}</div>
          <div className="service-details">
            <span className="rating">
              <AiFillStar size={16} />
              <AiFillStar size={16} />
              <AiFillStar size={16} />
              <AiFillStar size={16} />
              <AiFillStar size={16} />
            </span>
            <span className="recommended">Recommended</span>
          </div>
        </div>
        <button className="book-now-button">Book Now</button>
      </div>
    </div>
  );
}

export default Card;
