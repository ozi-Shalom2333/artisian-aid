import React from 'react';
import './../styles/profile.css'; 
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Card({data}) {
   
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/userprofile/${data._id}`);
  };
  return (
    <div className="card">
     <section className='card-header'>
        <div>
          <header>
            <img src={data.profilePic?.image_url || "https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935876/Frame_4_ke3z11.png"} alt={data.fullname} />
          </header>
          <aside>
            <h3>
              {data.fullname}
              <MdVerified size={20} color='blue'/>
            </h3>
            <p><u>view profile</u></p>
          </aside>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935818/Vector_1_elrf0x.png" alt="" />
        </div>
      </section>
      <section className='coverpic'>
        <img src={data.jobPostId.jobImage?. Image_url || "https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744947459/Card_pics_1_to10t1.png"} alt="" />
      </section>
      <section className='fancy'>
        <div>
        <h1>{data.category || services}</h1>
        <div className="service-details">
           {/* <span className="rating">
           <AiFillStar size={10}  color='yellow'/>
           <AiFillStar size={10} color='yellow'/>
           <AiFillStar size={10} color='yellow'/>
           <AiFillStar size={10} color='yellow'/>
           <AiFillStar size={10} color='yellow'/>
         </span> */}
         <span className="recommended">Recommended</span> 
        </div>
        </div>


        <div className='card-price' onClick={handleClick}>
          <p>Book Now</p>
        </div>
      </section>


    </div>
  );
}

export default Card;













