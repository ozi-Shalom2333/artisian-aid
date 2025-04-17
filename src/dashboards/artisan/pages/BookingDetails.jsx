import React from 'react';
import { FaPhone } from 'react-icons/fa'; // Import the phone icon
import '../../../styles/bookingDetails.css'

const BookingDetails = ({ booking }) => {
  if (!booking) {
    return <div>No booking details to display.</div>; // Or a more user-friendly message
  }

  return (
    <div className="booking-details-container">
      <h2 className="booking-details-name">{booking.name}</h2>
      <p className="booking-details-description">Has booked your carpentry service below are few detail</p>
      <p className="booking-details-label">Service Title: <span className="booking-details-value">{booking.serviceTitle}</span></p>
      <p className="booking-details-label">Service Description: <span className="booking-details-value">{booking.serviceDescription}</span></p>
      <p className="booking-details-label">Date: <span className="booking-details-value">{booking.date}</span></p>
      <p className="booking-details-label">Location: <span className="booking-details-value">{booking.location}</span></p>
      <div className="booking-details-contact-container">
        <span className="booking-details-contact-label">Employer Contact</span>
        <div className="booking-details-contact-number">
          <FaPhone className="booking-details-phone-icon" />
          <span>{booking.employerContact}</span>
          {/* You could add a copy icon/functionality here */}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
