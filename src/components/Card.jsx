import React from 'react';
import './../styles/profile.css'
import { FiUpload } from 'react-icons/fi'; 
import { AiFillStar } from 'react-icons/ai'; 
import { MdVerified } from "react-icons/md";

function Card({data}) {
  return (
    <div className="card">
     



     <section className='card-header'>
        <div>
          <header>
            <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935876/Frame_4_ke3z11.png" alt="" />
          </header>
          <aside>
            <h3>
              Adaeze Jane
              <MdVerified size={20} color='blue'/>
            </h3>
            <p>view profile</p>
          </aside>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935818/Vector_1_elrf0x.png" alt="" />
        </div>
      </section>







      <section>
        <img src="" alt="" />
      </section>
      <section>
        <div></div>
        <div></div>
      </section>


    </div>
  );
}

export default Card;
















{/* 
      <div className="card-header">
        <div className="profile-info">
          <div className="profile-image">
            <img src={data.profilePic.image_url} alt="Profile" />
          </div>
          <div className="profile-text">
            <div className="profile-name">
              {data.fullname}
              <MdVerified  size={20} color='blue'/>
              </div>
            <div className="profile-view">View profile</div>
          </div>
        </div>
        <div className="share-icon">
          <FiUpload size={20} />
        </div>
      </div>


      <div className="card-image">
        
        <img src={data.jobPostId.jobImage.image_url}  alt="Painter" />
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
      </div> */}