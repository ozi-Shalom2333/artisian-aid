import React from 'react'
import '../styles/artisan.css'
import { VscStarFull } from "react-icons/vsc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri"

const ArtisanPage = () => {
    const artisans = [
        {
          id: 1,
          name: "Tolu Andy",
          image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-A_3boAYnmFW7FG1u8jHpvX4jjBlHWzH3w&s",
          service: "Painter Service",
          rating: 5,
          verified: true,
        },
        {
          id: 2,
          name: "Dave Odi",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3L_tD-Ak2xbbevELg2e8654wEEugU47HVQ&s",
          service: "Plunber",
          rating: 5,
          verified: true,
        },
        {
          id: 3,
          name: "Esther Orji",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-A_3boAYnmFW7FG1u8jHpvX4jjBlHWzH3w&s",
          service: "cleaner",
          rating: 5,
          verified: true,
        },
        {
            id: 4,
            name: "Nnamdi St.",
            image:
              "data:image/jpeg;base64,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",
            service: "Painter Service",
            rating: 5,
            verified: true,
          },
          {
            id: 5,
            name: "Chidi Olu",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCFzfyQnCQJNb-R5eMbM0PAk1oVTPKRffrA&s",
            service: "Fashion-Designer",
            rating: 5,
            verified: true,
          },
          {
            id: 6,
            name: "Chika Nwankwo",
            image:
              "data:image/jpeg;base64,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",
            service: "Dry-Cleaner",
            rating: 5,
            verified: true,
          },
          {
            id: 7,
            name: "Adaeze Jane",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7Qi1z4_17zG4Z_SGWKimqR1V-PAFT2rlpA&s",
            service: "Painter",
            rating: 5,
            verified: true,
          },
          {
            id: 8,
            name: "odo edith",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCFzfyQnCQJNb-R5eMbM0PAk1oVTPKRffrA&s",
            service: "Plumber",
            rating: 5,
            verified: true,
          },
          {
            id: 9,
            name: "Big Josh",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-A_3boAYnmFW7FG1u8jHpvX4jjBlHWzH3w&s",
            service: "yahoo yahoo",
            rating: 5,
            verified: true,
          },
          {
            id: 10,
            name: "Chukwudi",
            image:
              "https://support.freepik.com/servlet/rtaImage?eid=ka0Tb000000Eh9x&feoid=00N3V000001WcHX&refid=0EMTb000002gG8s",
            service: "cleaner",
            rating: 5,
            verified: true,
          },
      ];
      return (
        <>
          <div className="Ahero-section">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp0VewMzP9LF_uPTmBcvLd4pmD33kxTLm5BQ&s"
              alt=""
            />
            <div className="Ahero-overlay">
              <p className="Ahero-subtitle">Explore Artisans</p>
              <h1 className="Ahero-title">
                "Uncover <span className="highlight-blue">Unique</span> Talents and{" "}
                <br />
                Exceptional Skills"
              </h1>
              <p className="Ahero-description">
                Explore the Artisan Community: Where Creativity Thrives
              </p>
            </div>
          </div>
          <div className="Aartisan-container">
         
            <div className="Acard-grid">
              {artisans.map((artisan) => (
                <div className="Acard" key={artisan.id}>
                  <div className="Acard-header">
                    <div className="Aprofile-info">
                      <img
                        className="Aprofile-img"
                        src={artisan.image}
                        alt={artisan.name}
                      />{" "}
                      <div>
                        <p className="Aname">
                          {artisan.name}{" "}
                          {artisan.verified && (
                            <span className="Acheck">
                              <RiVerifiedBadgeFill />
                            </span>
                          )}
                        </p>
                        <a href="#" className="Aview-profile">
                          View profile
                        </a>
                      </div>
                    </div>
                    <a href="#" className="Aexpand">
                      <BsBoxArrowUpRight />
                    </a>
                  </div>
    
                  <img src={artisan.image} alt="service" className="Aservice-img" />
    
                  <div className="Acard-footer">
                    <p className="Aservice-name">{artisan.service}</p>
                    <p className="Arating">
                      <VscStarFull style={{ color: "#FFD700" }} />
                      <VscStarFull style={{ color: "#FFD700" }} />
                      <VscStarFull style={{ color: "#FFD700" }} />
                      <VscStarFull style={{ color: "#FFD700" }} />
                      <VscStarFull style={{ color: "#FFD700" }} />
                      <span className="Arecommend">Recommended </span>
                    </p>
                    <button
                      className="Abook-btn"
                      onClick={() => handleBook(artisan.name)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
  )
}

export default ArtisanPage