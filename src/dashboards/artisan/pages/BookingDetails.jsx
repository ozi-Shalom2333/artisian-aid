import React, { useState } from "react"
import "../../../styles/bookingDetails.css";
import axios from "axios";
import { toast } from "react-toastify";

const BookingDetails = ({ booking }) => {
  if (!booking) {
    return <div>No booking details to display.</div>;
  }

  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const acceptBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://artisanaid.onrender.com/v1/accept/job/${booking._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLoading(false);
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const rejectBooking = async () => {
    try {
      setLoadingDetails(true);
      const response = await axios.get(
        `https://artisanaid.onrender.com/v1/reject/job/${booking._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setLoadingDetails(false);
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      setLoadingDetails(false);
      console.error(error);
      toast.error("Failed to reject the booking.");
    }
  };

  return (
    <div className="booking-details-container">
      <h2 className="booking-details-name">{booking.employerId.fullname}</h2>
      <p className="booking-details-description">
        Has booked your carpentry service below are few detail
      </p>
      {/* <p className="booking-details-label">Service Title: <span className="booking-details-value">{booking.serviceTitle}</span></p> */}
      <p className="booking-details-label">
        Service Description:{" "}
        <span className="booking-details-value">
          {booking.serviceDescription}
        </span>
      </p>
      <p className="booking-details-label">
        Date: <span className="booking-details-value">{booking.date}</span>
      </p>
      <p className="booking-details-label">
        Location:{" "}
        <span className="booking-details-value">{booking.location}</span>
      </p>
      {booking.status == "Confirmed" ? (
        <p className="booking-details-label">
          Contact:{" "}
          <span className="booking-details-value">
            {booking.employerId.phoneNumber}
          </span>
        </p>
      ) : null}
      {booking.status == "Pending" ? (
        <div className="update_booking_status_container">
          <button onClick={acceptBooking}>
            {loading ? "loading..." : "confirm"}
          </button>
          <button onClick={rejectBooking}>
            {loadingDetails ? "loading..." : "reject"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default BookingDetails;
