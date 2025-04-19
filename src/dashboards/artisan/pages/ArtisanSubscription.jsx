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

        setPlans(response.data.data); // <-- match your actual response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
        toast.error("Failed to fetch subscription plans.");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="plans-container">
      <ToastContainer />
      <h3>Subscription Plan</h3>
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="plans">
          {plans.map((plan) => (
            <div key={plan._id} className="plan">
              <div className="plan-header">
                <h4>{plan.planName}</h4>
              </div>
              <h2>
                ₦{plan.amount}
                <span>/{plan.duration}</span>
              </h2>
              <p>{plan.description}</p>
              <button className="choose-btn">Choose Plan</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanSubscription;
