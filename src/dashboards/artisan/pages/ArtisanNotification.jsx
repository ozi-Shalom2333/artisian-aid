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
  const [loading, setLoading] = useState(false);
   const userData = localStorage.getItem("userData")
  const token  = localStorage.getItem("authToken");
  console.log(userData)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const [pendingRes, confirmedRes, rejectedRes] = await Promise.all([
          axios.get(`https://artisanaid.onrender.com/v1/pending/job`,{
            headers: { 
              Authorization: `Bearer ${token}`,
            },

          }),
          axios.get(`https://artisanaid.onrender.com/v1/confimed/job`,{
            headers: { 
              Authorization: `Bearer ${token}`,
            }}),
          axios.get(`https://artisanaid.onrender.com/v1/rejected/job`,{
            headers: { 
              Authorization: `Bearer ${token}`,
            }}),
        ]);
        setLoading(false);

        console.log(pendingRes);
        console.log(confirmedRes);
        console.log(rejectedRes);

        setPendingConfirmations(pendingRes.data.data);
        setConfirmedBookings(confirmedRes.data.data);
        setRejectedBookings(rejectedRes.data.data);a
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const [openBookingDetails, setOpenBookingDetails] = useState(false);

  const handleConfirmedBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleOpenBookingDetails = (bookingId) => {
    setOpenBookingDetails(bookingId);
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "Pending" && (
              <>
                {pendingConfirmations.length == 0 ? (
                  <p>There is no pending job request</p>
                ) : (
                  pendingConfirmations.map((item) => (
                    <div className="list_body">
                      <div
                        key={item._id}
                        className="list-item"
                        onClick={() =>
                          handleOpenBookingDetails(
                            openBookingDetails == item._id ? false : item._id
                          )
                        }
                      >
                        <div className="profile-icon">
                          {item.employerId.profilePic ? (
                            <img
                              src={item.employerId.profilePic.image_url}
                              alt={item.employerId.fullname}
                              className="profile-image"
                            />
                          ) : (
                            <FaUserCircle size={30} color="#777" />
                          )}
                        </div>
                        <div className="name">{item.employerId.fullname}</div>
                        <div className="skill">{item.employerId.role}</div>
                        <div className="status Pending">{item.status}</div>
                      </div>
                      {openBookingDetails == item._id ? (
                        <BookingDetails booking={item} />
                      ) : null}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "Confirmed" && (
              <>
                {confirmedBookings.length == 0 ? (
                  <p>There is no Confirmed job request</p>
                ) : (
                  confirmedBookings.map((item) => (
                    <div className="list_body">
                      <div
                        key={item.id}
                        className="list-item"
                        onClick={() =>
                          handleOpenBookingDetails(
                            openBookingDetails == item._id ? false : item._id
                          )
                        }
                      >
                        <div className="profile-icon">
                          {item.employerId.profilePic ? (
                            <img
                              src={item.employerId.profilePic.image_url}
                              alt={item.employerId.fullname}
                              className="profile-image"
                            />
                          ) : (
                            <FaUserCircle size={30} color="#777" />
                          )}
                        </div>
                        <div className="name">{item.employerId.fullname}</div>
                        <div className="skill">{item.employerId.role}</div>
                        <div className="status BookingAccepted">
                          {item.status}
                        </div>
                      </div>
                      {openBookingDetails == item._id ? (
                        <BookingDetails booking={item} />
                      ) : null}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === "Rejected" && (
              <>
                {rejectedBookings.length == 0 ? (
                  <p>There is no Rejected job request</p>
                ) : (
                  rejectedBookings.map((item) => (
                    <div className="list_body">
                      <div
                        key={item.id}
                        className="list-item"
                        onClick={() =>
                          handleOpenBookingDetails(
                            openBookingDetails == item._id ? false : item._id
                          )
                        }
                      >
                        <div className="profile-icon">
                          {item.employerId.profilePic ? (
                            <img
                              src={item.employerId.profilePic.image_url}
                              alt={item.employerId.fullname}
                              className="profile-image"
                            />
                          ) : (
                            <FaUserCircle size={30} color="#777" />
                          )}
                        </div>
                        <div className="name">{item.employerId.fullname}</div>
                        <div className="skill">{item.employerId.role}</div>
                        <div className="status Rejected">{item.status}</div>
                      </div>
                      {openBookingDetails == item._id ? (
                        <BookingDetails booking={item} />
                      ) : null}
                    </div>
                  ))
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* '{selectedBooking && activeTab === "Confirmed" && (
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
      )}' */}
    </div>
  );
};

export default ArtisanNotification;
