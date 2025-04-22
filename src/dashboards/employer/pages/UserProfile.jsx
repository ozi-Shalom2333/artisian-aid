import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/userprofile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    serviceTitle: '',
    phoneNumber: '',
    address: '',
    serviceDescription: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://artisanaid.onrender.com';

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/user/${userId}`);
        if (isMounted) {
          if (response.data?.data) {
            setUserData(response.data.data);
          } else {
            setError('User data is empty');
          }
        }
      } catch (err) {
        if (isMounted) {
          if (err.response) {
            switch (err.response.status) {
              case 404:
                setError('User not found with the provided ID');
                break;
              case 500:
                setError('Server error while retrieving user');
                break;
              default:
                setError('Failed to fetch user data');
            }
          } else {
            setError('Network error or server is unreachable');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [userId, API_BASE_URL]);
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReport(true);
    setError(null);
  
    const token = localStorage.getItem('report'); 
  
    if (!token) {
      setError('You must be logged in to report an artisan.');
      setIsSubmittingReport(false);
      return;
    }
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/report/artisan/${userId}`,
        {
          reason: reportReason
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}` 
          }
        }
      );
  
      if (response.status === 201) {
        setReportSubmitted(true);
        setTimeout(() => {
          setShowReportModal(false);
          setReportReason('');
          setReportSubmitted(false);
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError('Session expired, please login to continue');
            break;
          case 404:
            setError('Artisan not found');
            break;
          default:
            setError(err.response.data?.message || 'Failed to submit report');
        }
      } else {
        setError('Network error or server is unreachable');
      }
    } finally {
      setIsSubmittingReport(false);
    }
  };
  
  

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    setError(null);

    const token = localStorage.getItem('employerToken'); 

    if (!token) {
      setError('You must be logged in to book an artisan.');
      setIsSubmittingBooking(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/book/artisan/${userId}`,
        {
          serviceTitle: bookingData.serviceTitle,
          location: bookingData.address,
          serviceDescription: bookingData.serviceDescription,
          phoneNumber: bookingData.phoneNumber
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        setBookingSubmitted(true);
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 400:
            setError(err.response.data?.message || 'Validation error');
            break;
          case 404:
            setError('Artisan not found');
            break;
          case 500:
            setError('External Server Error');
            break;
          default:
            setError(err.response.data?.message || 'Error booking artisan');
        }
      } else {
        setError('Network error or server is unreachable');
      }
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackHomeClick = () => {
    setShowBookingModal(false);
    setBookingSubmitted(false);
    setBookingData({
      serviceTitle: '',
      phoneNumber: '',
      address: '',
      serviceDescription: ''
    });
    navigate('/');
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!userData) return <div className="no-data">No user data available</div>;

  return (
    <main className="user-profile">
      <div className="container-5">
        <div className="header">
          <img
            src={userData.coverPhoto?.image_url || '/default-cover.jpg'}
            alt="Cover"
            className="header-bg"
            onError={(e) => { e.target.src = '/default-cover.jpg'; }}
          />
          <div className="profile-pic-wrapper">
            <img
              src={userData.profilePic?.image_url || '/default-avatar.png'}
              alt="Profile"
              className="profile-pic"
              onError={(e) => { e.target.src = '/default-avatar.png'; }}
            />
          </div>
        </div>

        <div className="content-5">
          <div className="top-section">
            <div className="top-left">
              <h1 className="user-name">{userData.fullname || 'No name provided'}</h1>
              <p className="description-5"><strong>Bio:</strong> {userData.bio || 'No bio available'}</p>
            </div>
            <div className="top-right">
              <button className="connect-button" onClick={() => setShowBookingModal(true)}>Book Now</button>
              <div className="report-container">
                <p
                  onClick={() => setShowReportModal(true)}
                  className="report-text-link-1"
                  role="button"
                  tabIndex="0"
                  aria-label="Report this user"
                >
                  Report user
                </p>
              </div>
            </div>
          </div>

          <hr className="section-divider" />

          <div className="description-2">
            <strong>Certifications:</strong>{' '}
            {userData.certifications?.length ? (
              <span>{userData.certifications.join(', ')}</span>
            ) : (
              <span>No certifications available</span>
            )}
            {userData.verificationId?.workCertificate?.image_url && (
              <div>
                <img
                  src={userData.verificationId.workCertificate.image_url}
                  alt="Work Certificate"
                  className="certificate-img"
                />
              </div>
            )}
          </div>

          {showBookingModal && (
            <div className="modal-overlay-g" onClick={() => setShowBookingModal(false)}>
              <div className="modal-content-1" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal-button" onClick={() => setShowBookingModal(false)}>
                  &times;
                </button>
                {!bookingSubmitted ? (
                  <>
                    <h2 className="modal-title-1">Booking Details</h2>
                    <p className="describe-7">Please provide the required details for your booking</p>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleBookingSubmit}>
                      <div className="form-group-71">
                        <h4 className="input-title">Service Title</h4>
                        <input
                          type="text"
                          name="serviceTitle"
                          value={bookingData.serviceTitle}
                          onChange={handleBookingChange}
                          placeholder="Enter service title"
                          required
                        />
                      </div>

                      <div className="form-group-71">
                        <h4 className="input-title">Phone Number</h4>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={bookingData.phoneNumber}
                          onChange={handleBookingChange}
                          placeholder="e.g. 08012345678 or +2348012345678"
                          required
                          pattern="(?:\+234|0)[789][01]\d{8}"
                          title="Enter a valid Nigerian phone number starting with 0 or +234"
                        />
                      </div>

                      <div className="form-group-71">
                        <h4 className="input-title">Address</h4>
                        <input
                          type="text"
                          name="address"
                          value={bookingData.address}
                          onChange={handleBookingChange}
                          placeholder="Enter full address"
                          required
                        />
                      </div>

                      <div className="form-group-71">
                        <h4 className="input-title">Service Description</h4>
                        <textarea
                          name="serviceDescription"
                          value={bookingData.serviceDescription}
                          onChange={handleBookingChange}
                          placeholder="Describe the service you need"
                          rows={4}
                          required
                        />
                      </div>

                      <div className="form-group-71">
                        <button className="button-oh" type="submit" disabled={isSubmittingBooking}>
                          {isSubmittingBooking ? 'Booking...' : 'Book Now'}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="booking-success-message">
                    <h3>Success</h3>
                    <p className="success-description">
                      Your booking has been sent to your artisan. For further details, please check your email.
                    </p>
                    <button className="back-home-button" onClick={handleBackHomeClick}>
                      Back home
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {showReportModal && (
            <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
              <div className="modal-content-2" onClick={(e) => e.stopPropagation()}>
                {!reportSubmitted ? (
                  <>
                    <h2 className="modal-title-2">Report User</h2>
                    {error && <div className="error-message">{error}</div>}
                    <p className="describe-why">Describe why you are reporting this user</p>
                    <form onSubmit={handleReportSubmit}>
                      <textarea
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        placeholder="Please provide details..."
                        required
                        rows={5}
                      />
                      <div className="modal-actions-2">
                        <button
                          type="button"
                          onClick={() => setShowReportModal(false)}
                          disabled={isSubmittingReport}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmittingReport || !reportReason.trim()}
                          className="submit-button-2"
                        >
                          {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="submission-success-2">
                    <h3>Thank You!</h3>
                    <p>Artisan reported successfully</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
