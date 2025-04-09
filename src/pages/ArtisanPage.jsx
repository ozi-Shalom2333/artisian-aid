import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/artisanPage.css'

const ArtisanPage = () => {
  const [artisans, setArtisans] = React.useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://artisanaid.onrender.com/v1/artisans"
        );
        setLoading(false);
        console.log(response.data.data);
        setArtisans(response.data.data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching artisans:", error);
        toast.error(error.response.data.message);
      }
    };

    fetchArtisans();
  }, []);

  return (
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
      <div>
        {artisans.map((data) => (
          <Card data={data} />
        ))}
      </div>
    </div>
  );
};

export default ArtisanPage;
