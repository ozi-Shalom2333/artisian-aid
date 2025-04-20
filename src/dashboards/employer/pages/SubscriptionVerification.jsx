import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentVerified from '../../artisan/pages/PaymentVerified';
import PaymentFailed from '../../artisan/pages/PaymentFailed';
import { toast } from 'react-toastify';

const SubscriptionVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("Verifying...");
  const [verificationResult, setVerificationResult] = useState(null); 

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`https://your-api.com/v1/verify/payment`, {
          params: { reference },
        });

        console.log(res);

        if (res.data?.artisan?.isSubscribed) {
          setVerificationResult("success");
          setTimeout(() => navigate("/employerdashboard"), 3000);
        } else {
          setVerificationResult("fail");
          setStatus("❌ Payment verification failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setVerificationResult("fail");
        setStatus("⚠️ Error verifying payment.");
        toast.error("Error verifying payment. Please try again later.");
      }
    };

    if (reference) verifyPayment();
    else setStatus("❌ No reference provided.");
  }, [reference, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      {verificationResult === "success" && <PaymentVerified />}
      {verificationResult === "fail" && <PaymentFailed />}
      {!verificationResult && <h2>{status}</h2>}
    </div>
  );
};

export default SubscriptionVerification;
