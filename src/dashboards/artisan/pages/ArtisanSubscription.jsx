import React, { useState, useEffect } from "react";
import "../../../styles/artisanSubscription.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArtisanSubscription = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const BaseUrl = "https://artisanaid.onrender.com";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Authentication token not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${BaseUrl}/v1/all/plan`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlans(response.data.data); // Extracting the array of plans
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        toast.error("Failed to fetch subscription plans.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const initialisePayment = async (planId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Can't initialise payment. Please log in again.");
        return;
      }

      const response = await axios.get(`${BaseUrl}/v1/initialize/payment/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.data?.checkout_url) {
        const checkoutUrl = response.data.data.checkout_url;
        window.location.href = checkoutUrl;
      } else {
        toast.error("Checkout URL not found. Please try again.");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast.error("Failed to initialize payment.");
    }
  };

  return (
    <div className="plans-container">
      <ToastContainer />
      <h3>Subscription Plan</h3>
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="plans">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`plan ${
                plan.planName === "BASIC PLAN" ? "basic-plan" : "premium-plan"
              }`}
            >
              <div className="plan-header">
                <h4>{plan.planName}</h4>
              </div>
              <h2>
                ₦{plan.amount}
                <span>/{plan.duration}</span>
              </h2>
              <p>{plan.description}</p>
              
              {/* ✅ Hooked up with plan._id */}
              <button className="choose-btn" onClick={() => initialisePayment(plan._id)}>
                Choose Plan
              </button>

              {plan.amount === 2000 ? (
                <ul>
                  <li>Standard Rating Visibility</li>
                  <li>Free access to all basic tools</li>
                </ul>
              ) : (
                <ul>
                  <li>Enhanced Visibility</li>
                  <li>Recommendation tag added</li>
                  <li>Exclusive Badges</li>
                  <li>Free access to all premium assets</li>
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanSubscription;
