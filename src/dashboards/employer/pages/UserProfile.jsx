import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/userprofile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://artisanaid.onrender.com';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/user/${userId}`);
        setUserData(response.data.data);
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            setError('User not found with the provided ID');
          } else if (err.response.status === 500) {
            setError('Server error while retrieving user');
          } else {
            setError('Failed to fetch user data');
          }
        } else {
          setError('Network error or server is unreachable');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, API_BASE_URL]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReport(true);

    try {
      await axios.post(`${API_BASE_URL}/v1/report`, {
        userId,
        reason: reportReason
      });

      setReportSubmitted(true);
      setTimeout(() => {
        setShowReportModal(false);
        setReportSubmitted(false);
        setReportReason('');
      }, 2000);
    } catch (err) {
      setError('Failed to submit report');
    } finally {
      setIsSubmittingReport(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!userData) return <div className="no-data">No user data available</div>;

  return (
    <main className="user-profile">
      <div className="container">
        <div className="content">
          <div className="top-section">
            <div className="top-left">
              <h1 className="user-email">{userData.email}</h1>
              <div className="user-details">
                <p><strong>Role:</strong> {userData.role}</p>
                <p><strong>Phone:</strong> {userData.phoneNumber}</p>
                <p><strong>Status:</strong> {userData.byStatus}</p>
                <p><strong>Followers:</strong> {userData.follower}</p>
              </div>
            </div>
          </div>

          <div className="report-container">
            <button
              onClick={() => setShowReportModal(true)}
              className="report-button"
              aria-label="Report this user"
            >
              Report user
            </button>
          </div>

          {showReportModal && (
            <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {!reportSubmitted ? (
                  <>
                    <h2 className='report-button'>Report User</h2>
                    <p>Describe why you are reporting this user</p>
                    <form onSubmit={handleReportSubmit}>
                      <textarea
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        placeholder="Please provide details..."
                        required
                        rows={5}
                      />
                      <div className="modal-actions">
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
                          className="submit-button"
                        >
                          {isSubmittingReport ? 'Submitting...' : 'Submit Report'}
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="submission-success">
                    <h3>Thank You!</h3>
                    <p>Your report has been submitted.</p>
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
