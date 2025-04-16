import React, { useState } from "react";
import "../../../styles/artisanNotification.css";
import { FaUserCircle } from "react-icons/fa";
import BookingDetails from "./BookingDetails"; // Assuming you created a BookingDetails component

const ArtisanNotification = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const pendingConfirmations = [
    {
      id: 1,
      name: "David tokode",
      skill: "Furniture Making",
      status: "Confirmation Needed",
      profileImage: null,
    },
    {
      id: 2,
      name: "Daniel Josh",
      skill: "Ward rope Making",
      status: "Confirmation Needed",
      profileImage: null,
    },
  ];

  const confirmedBookings = [
    {
      id: 3,
      name: "David Tokode",
      skill: "Furniture Making",
      status: "Booking Accepted",
      profileImage: null,
      serviceTitle: "Furniture Making",
      serviceDescription: "I need a three-seater sofa for my parlor",
      date: "4/10/2025",
      location: "50, Alafia Street, Coker, Lagos.",
      employerContact: "08179465064",
    },
    // Add more confirmed bookings here
  ];

  const rejectedBookings = [
    {
      id: 4,
      name: "Jane Doe",
      skill: "Painting",
      status: "Booking Rejected",
      profileImage: null,
    },
    // Add more rejected bookings here
  ];

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
            setActiveTab("Confirmed"), handleCloseBookingDetails();
          }}
        >
          Confirmed
        </button>
        <button
          className={`tab-button ${activeTab === "Rejected" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("Rejected"), handleCloseBookingDetails();
          }}
        >
          Rejected
        </button>
      </div>
      <div className="list-container">
        {activeTab === "Pending" &&
          pendingConfirmations.map((item, index) => (
            <div key={item.id} className="list-item">
              <div className="profile-icon">
                {item.profileImage ? (
                  <img
                    src={item.profileImage}
                    alt={item.name}
                    className="profile-image"
                  />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status Confirmation">{item.status}</div>{" "}
              {/* Added Confirmation class */}
            </div>
          ))}

        {activeTab === "Confirmed" &&
          confirmedBookings.map((item, index) => (
            <div
              key={item.id}
              className="list-item"
              onClick={() => handleConfirmedBookingClick(item)}
            >
              <div className="profile-icon">
                {item.profileImage ? (
                  <img
                    src={item.profileImage}
                    alt={item.name}
                    className="profile-image"
                  />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status BookingAccepted">{item.status}</div>{" "}
              {/* Added BookingAccepted class */}
            </div>
          ))}

        {activeTab === "Rejected" &&
          rejectedBookings.map((item, index) => (
            <div
              key={item.id}
              className="list-item"
              onClick={() => handleConfirmedBookingClick(item)}
            >
              <div className="profile-icon">
                {item.profileImage ? (
                  <img
                    src={item.profileImage}
                    alt={item.name}
                    className="profile-image"
                  />
                ) : (
                  <FaUserCircle size={30} color="#777" />
                )}
              </div>
              <div className="name">{item.name}</div>
              <div className="skill">{item.skill}</div>
              <div className="status Rejected">{item.status}</div>{" "}
              {/* Added Rejected class */}
            </div>
          ))}
      </div>

      {selectedBooking && activeTab === "Confirmed" && (
        <div className="booking-details-overlay">
          <div className="booking-details-modal">
            <button
              className="close-button"
              onClick={handleCloseBookingDetails}
            >
              X
            </button>
            <BookingDetails booking={selectedBooking} />
          </div>
        </div>
      )}
      {selectedBooking && activeTab === "Rejected" && (
        <div className="booking-details-overlay">
          <div className="booking-details-modal">
            <button
              className="close-button"
              onClick={handleCloseBookingDetails}
            >
              X
            </button>
            <BookingDetails booking={selectedBooking} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanNotification;
