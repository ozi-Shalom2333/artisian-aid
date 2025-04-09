import React, { useState } from 'react';
import './../styles/carousel.css';
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";

const testimonialsData = [
  {
    id: 1,
    image: '/Image (1).png',
    text: 'The platform is user friendly and integrates seamlessly, eliminating setup hassles',
    name: 'David Ben',
    location: 'Surulere, Lagos',
  },
  {
    id: 2,
    image: '/Image (2).png',
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
    image: '/Image (2).png',
    text: 'Another great testimonial here.',
    name: 'Jane Doe',
    location: 'Ikeja, Lagos',
  },
  {
    id: 5,
    image: '/Image.png',
    text: 'This platform is truly amazing!',
    name: 'Peter Jones',
    location: 'Yaba, Lagos',
  },
  {
    id: 6,
    image: '/Image (1).png',
    text: 'Highly recommended for everyone.',
    name: 'Alice Smith',
    location: 'Victoria Island, Lagos',
  },
  {
    id: 7,
    image: '/Image.png',
    text: 'My experience has been fantastic.',
    name: 'Bob Williams',
    location: 'Lekki, Lagos',
  },
  {
    id: 8,
    image: '/Image (1).png',
    text: 'I am very satisfied with the service.',
    name: 'Carol Brown',
    location: 'Maryland, Lagos',
  },
];

const itemsPerPage = 2;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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