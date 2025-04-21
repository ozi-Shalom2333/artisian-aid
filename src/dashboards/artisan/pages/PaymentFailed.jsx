import React from 'react'
import '../../../styles/artisanpaymentverification.css'

const PaymentFailed = () => {
  return (
    <div className='payment-verified-holder'>
            <div className='payment-verified-container'>
                <div>
                    <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1745157813/Artisan_1_ebpajg.png" alt="" />
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1745167673/Frame_1000006357_1_y8i5u4.png" alt="" />
                </div>
                <h1>Subscription Payment Failed!</h1>
                <p>We wanted to inform you that your recent attempt to subscribe <br /> to our premium plan was unsuccessful due to a payment issue.</p>
            </div>
   </div>
  )
}

export default PaymentFailed
