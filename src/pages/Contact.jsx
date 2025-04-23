import React, { useState } from "react";
import axios from "axios";
import "../styles/contact.css";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);

  const validateForm = () => {
    const { fullname, email, message } = formData;

    if (!fullname.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (message.length < 10) {
      toast.error("Message must be at least 10 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        message: formData.message,
      };

      const res = await axios.post(
        'https://artisanaid.onrender.com/v1/contact/us', payload
      );

      if (res.status === 201 || 200) {
        toast.success("Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        toast.error("Unexpected response. Try again.");
      }
    } catch (err) {
      toast.error("Error sending message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="overlay" />

      <div className="content">
        <p className="subtitle-1">Explore Artisans</p>
        <h1 className="title-1">
          "Your <span className="highlight-9">Feedback</span> is Valued -<br /> Contact Us Here!"
        </h1>
        <p className="description">
          "Have a Question or Suggestion? We'd Love to Hear It"
        </p>
      </div>

      <div className="form-section">
        <div className="form-left">
          <h2 className="form-heading-white">"Get in Touch - We're Here to Help!"</h2>
          <div className="contact-detail">
            <FaPhoneAlt className="icon" />
            <span>+23499041835740</span>
          </div>
          <div className="contact-detail">
            <FaEnvelope className="icon" />
            <span>artisanaid.team@gmail.com</span>
          </div>
        </div>

        <div className="form-right">
          <form className="contact-form-5" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Type here"
              value={formData.fullname}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type here"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Type here"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

    
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Contact;
