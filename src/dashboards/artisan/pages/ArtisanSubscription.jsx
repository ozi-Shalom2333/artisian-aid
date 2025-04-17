import React from 'react'
import '../../../styles/artisanSubscription.css'
const ArtisanSubscription = () => {
  return (
    <div className="plans-container">
      <h3>Subscription Plan</h3>
      <div className="plans">
        {/* Basic Plan */}
        <div className="plan basic-plan">
          <h4>Basic Plan</h4>
          <h2>₦2,000<span>/Monthly</span></h2>
          <p>For basic individual artisans</p>
          <button className="choose-btn">Choose Plan</button>
          <ul>
            <li>Standard Rating Visibility</li>
            <li>Free access to all basic tools</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="plan premium-plan">
          <div className="plan-header">
            <h4>Premium Plan</h4>
            <span className="badge">Popular</span>
          </div>
          <h2>₦5,000<span>/Monthly</span></h2>
          <p>For small teams and professionals</p>
          <button className="current-btn">Current Plan</button>
          <ul>
            <li>Enhanced Visibility</li>
            <li>Recommendation tag added</li>
            <li>Exclusive Badges</li>
            <li>Free access to all premium assets</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ArtisanSubscription