import React from 'react'
import { FaQuestionCircle } from "react-icons/fa";
import './../styles/notFound.css'

const NotFound = () => {
  return (
    <div className="not-found-container humorous">
      <h1 className="error-code">404</h1>
      <p className="error-message">Looks like you've wandered off the beaten path!</p>
      <FaQuestionCircle  className="lost-icon animated" size={80} />      <p className="error-description">The page you're looking for doesn't exist.</p>
      <button onClick={() => window.history.back()} className="go-back-button">Take Me Back</button>
    </div>
  )
}

export default NotFound
