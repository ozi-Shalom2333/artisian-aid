import React, { useState, useEffect, useCallback } from 'react';
import './../styles/carousel.css';
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";

const testimonialsData = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131211/samples/man-portrait.jpg',
    text: 'The platform is user friendly and integrates seamlessly, eliminating setup hassles',
    name: 'David Ben',
    location: 'Surulere, Lagos',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131212/samples/upscale-face-1.jpg',
    text: 'Artisans from this platform has help me scale through my busy schedules, i love it',
    name: 'Daniel Samuel',
    location: 'Ojuelegba, Lagos',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131210/samples/smile.jpg',
    text: 'With artisans i have become 10x productive my schedules',
    name: 'Joshua Ike',
    location: 'Ajegule, Lagos',
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131212/samples/woman-on-a-football-field.jpg',
    text: 'Another great testimonial here.',
    name: 'Jane Doe',
    location: 'Ikeja, Lagos',
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131210/samples/smile.jpg',
    text: 'This platform is truly amazing!',
    name: 'Peter Jones',
    location: 'Yaba, Lagos',
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744131204/samples/people/smiling-man.jpg',
    text: 'Highly recommended for everyone.',
    name: 'Alice Smith',
    location: 'Victoria Island, Lagos',
  },
  {
    id: 7,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744220818/Image_1_ygnbuz.png',
    text: 'My experience has been fantastic.',
    name: 'Bob Williams',
    location: 'Lekki, Lagos',
  },
  {
    id: 8,
    image: 'https://res.cloudinary.com/djnowfvsk/image/upload/v1744220857/Image_2_ckcqbt.png',
    text: 'I am very satisfied with the service.',
    name: 'Carol Brown',
    location: 'Maryland, Lagos',
  },
];

const Carousel = () => {
  const calculateItemsPerPage = useCallback(() => {
    if (window.innerWidth <= 768) {
      return 1;
    } else {
      return 2;
    }
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [calculateItemsPerPage]);

  const goToPrevious = () => {
    const newIndex = (currentIndex - itemsPerPage + testimonialsData.length) % testimonialsData.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + itemsPerPage) % testimonialsData.length;
    setCurrentIndex(newIndex);
  };

  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="carousel-container">
      <div className="testimonials-wrapper">
        {visibleTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="profile-image">
              <img src={testimonial.image} alt={testimonial.name} />
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="user-info">
              <h3 className="user-name">{testimonial.name}</h3>
              <p className="user-location">{testimonial.location}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-navigation">
        <button
          className="nav-button"
          onClick={goToPrevious}
          disabled={testimonialsData.length <= itemsPerPage}
        >
          <BiLeftArrowAlt color='#2F80ED'/>
        </button>
        <button style={{color:'#2F80ED'}}
          className="nav-button"
          onClick={goToNext}
          disabled={testimonialsData.length <= itemsPerPage}
        >
          <BiRightArrowAlt  color='#2F80ED'/>
        </button>
      </div>
    </div>
  );
};

export default Carousel;