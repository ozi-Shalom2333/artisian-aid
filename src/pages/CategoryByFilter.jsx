import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './../styles/categoryfilter.css';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import FooterSubstitute from '../components/FooterSubstitute';

const CategoryByFilter = () => {
  const { nameOfCategory } = useParams();
//   const decodedCategory = decodeURIComponent(category);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(nameOfCategory)

  const url = `https://artisanaid.onrender.com/v1/artisan/category/${nameOfCategory}`;

  const getCategory = async () => {
    try {
      const response = await axios.get(url);
      console.log(response)
    //   console.log("API response:", response.data.data);

      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setArtisans(response.data.data);
      } else {
        toast.info("No artisans found in this category.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
    document.title = `${nameOfCategory} Services | ArtisanAid`;
  }, [nameOfCategory]);

  return (
    <div className='catfilter'>
      <Header />

      <div className='hero-pic'>
        <h3>Valued Services</h3>
        <h1>
          Get <span style={{ color: 'rgba(255, 165, 0, 1)' }}>Satisfying</span> {nameOfCategory} <br /> Services at your Finger Tip
        </h1>
      </div>

      <div className='catfilter-card'>
        {loading ? (
          <p>Loading artisans...</p>
        ) : artisans.length > 0 ? (
          artisans.map((e) => <Card key={e._id} data={e} />)
        ) : (
          <p>No artisans available in this category.</p>
        )}
      </div>

      <FooterSubstitute />
    </div>
  );
};

export default CategoryByFilter;
