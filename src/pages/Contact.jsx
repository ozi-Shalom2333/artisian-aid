import React from "react";
import "../styles/contact.css"
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="overlay" />

      <div className="content-1">
        <p className="subtitle">Explore Artisans</p>
        <h1 className="title">
          "Your <span className="highlight">Feedback</span> is Valued -<br /> Contact Us Here!"
        </h1>
        <p className="description">
         "Have a Question or Suggestion? We'd Love to Hear It"
        </p>
      </div>

      {/* Now form-section comes after the content */}
      <div className="form-section">
        <div className="form-left">
          <h2 className="form-heading">"Get in Touch - We're Here to Help!"</h2>
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
          <form className="contact-form">
            <label>Full Name</label>
            <input type="text" placeholder="Type here" />

            <label>Email</label>
            <input type="email" placeholder="Type here" />

            <label>Message</label>
            <textarea placeholder="Type here" ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
