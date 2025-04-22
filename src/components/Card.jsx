import React from 'react';
import './../styles/profile.css';
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Card({ data }) {
  const navigate = useNavigate();

  if (!data) return null;

  const {
    _id,
    fullname = "Unnamed Artisan",
    profilePic,
    jobPost,
    category = "N/A",
  } = data;

  const handleClick = () => {
    navigate(`/userprofile/${_id}`);
  };

  return (
    <div className="card">
      <section className="card-header">
        <div className="card-profile">
          <header>
            <img
              src={
                profilePic?.image_url ||
                "https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935876/Frame_4_ke3z11.png"
              }
              alt={fullname}
            />
          </header>
          <aside className="view">
            <h3>
              {fullname}
              <MdVerified size={20} color="blue" />
            </h3>
            <p><u>View profile</u></p>
          </aside>
        </div>

        <div className="outer">
          <img
            src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744935818/Vector_1_elrf0x.png"
            alt="decor"
          />
        </div>
      </section>

      <section className="coverpic">
        <img
          src={
            jobPost?.image_url ||
            "https://res.cloudinary.com/dd1aj3hvn/image/upload/v1744947459/Card_pics_1_to10t1.png"
          }
          alt={`${fullname}'s work`}
        />
      </section>

      <section className="fancy">
        <div className="fancy1">
          <h1>{category}</h1>
          <p>Recommended</p>
        </div>
        <div className="book">
          <p onClick={handleClick}>Book now</p>
        </div>
      </section>
    </div>
  );
}

export default Card;
