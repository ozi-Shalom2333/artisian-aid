import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { toast } from "react-toastify";
import '../styles/artisanPage.css'
import { useNavigate } from "react-router-dom";

const ArtisanPage = () => {
  const [artisans, setArtisans] = useState([]);
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
    <div className="artisan-page">
      <div className="Ahero-section">
        <p className="Ahero-subtitle">Explore Artisans</p>
        <h1 className="Ahero-title">"Uncover <span style={{color:'rgba(47, 128, 237, 1)'}}>Unique</span> Talents and{" "}<br />Exceptional Skills"</h1>
        <p className="Ahero-description">Explore the Artisan Community: Where Creativity Thrives</p>
      </div>
      const navigate = useNavigate();

<div className="ozioma">
  {artisans.map((data) => (
    <Card 
      key={data._id} 
      data={data} 
      onClick={() => navigate(`/userprofile/${data._id}`)} 
    />
  ))}
</div>
    </div>
  );
};

export default ArtisanPage;
