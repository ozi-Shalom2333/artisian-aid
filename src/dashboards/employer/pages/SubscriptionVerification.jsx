import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SubscriptionVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`https://your-api.com/v1/verify/payment`, {
          params: { reference },
        });

        if (res.data?.artisan?.isSubscribed) {
          setStatus("✅ Subscription Verified!");
          // optionally redirect
          setTimeout(() => navigate("/employerdashboard"), 3000);
        } else {
          setStatus("❌ Payment Failed or Not Found");
        }
      } catch (err) {
        console.error(err);
        setStatus("⚠️ Error verifying payment.");
      }
    };

    if (reference) verifyPayment();
    else setStatus("❌ No reference provided.");
  }, [reference, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>{status}</h2>
    </div>
  );
};

export default SubscriptionVerification;
