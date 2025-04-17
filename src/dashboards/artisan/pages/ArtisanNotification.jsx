import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/artisanNotification.css";
import { FaUserCircle } from "react-icons/fa";
import BookingDetails from "./BookingDetails";

const ArtisanNotification = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [pendingConfirmations, setPendingConfirmations] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [rejectedBookings, setRejectedBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [pendingRes, confirmedRes, rejectedRes] = await Promise.all([
          axios.get("https://artisanaid.onrender.com/v1/pending/job"),
          axios.get("https://artisanaid.onrender.com/v1/confirmed/job"),  
          axios.get("https://artisanaid.onrender.com/v1/rejected/job"),
        ]);

        setPendingConfirmations(pendingRes.data);
        setConfirmedBookings(confirmedRes.data);
        setRejectedBookings(rejectedRes.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirmedBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseBookingDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="container">
      <div className="tab-bar">
        <button
          className={`tab-button ${activeTab === "Pending" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Pending");
            handleCloseBookingDetails();
          }}
        >
          Pending
        </button>
        <button
          className={`tab-button ${activeTab === "Confirmed" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Confirmed");
            handleCloseBookingDetails();
          }}
        >
          Confirmed
        </button>
        <button
          className={`tab-button ${activeTab === "Rejected" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Rejected");
            handleCloseBookingDetails();
          }}
        >
          Rejected
        </button>
      </div>
      <div className="list-container">
        {activeTab === "Pending" &&
          pendingConfirmations.map((item) => (
            <div key={item.id} className="list-item">
              <div className="profile-icon">
                {item.profileImage ? (
                  <img src={item.profileImage} alt={item.name} className="profile-image" />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status Confirmation">{item.status}</div>
            </div>
          ))}

        {activeTab === "Confirmed" &&
          confirmedBookings.map((item) => (
            <div key={item.id} className="list-item" onClick={() => handleConfirmedBookingClick(item)}>
              <div className="profile-icon">
                {item.profileImage ? (
                  <img src={item.profileImage} alt={item.name} className="profile-image" />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status BookingAccepted">{item.status}</div>
            </div>
          ))}

        {activeTab === "Rejected" &&
          rejectedBookings.map((item) => (
            <div key={item.id} className="list-item" onClick={() => handleConfirmedBookingClick(item)}>
              <div className="profile-icon">
                {item.profileImage ? (
                  <img src={item.profileImage} alt={item.name} className="profile-image" />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status Rejected">{item.status}</div>
            </div>
          ))}
      </div>

      {selectedBooking && activeTab === "Confirmed" && (
        <div className="booking-details-overlay">
          <div className="booking-details-modal">
            <button className="close-button" onClick={handleCloseBookingDetails}>X</button>
            <BookingDetails booking={selectedBooking} />
          </div>
        </div>
      )}

      {selectedBooking && activeTab === "Rejected" && (
        <div className="booking-details-overlay">
          <div className="booking-details-modal">
            <button className="close-button" onClick={handleCloseBookingDetails}>X</button>
            <BookingDetails booking={selectedBooking} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanNotification;
