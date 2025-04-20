import React from 'react'
import '../../../styles/artisanpaymentverification.css'

const PaymentVerified = () => {
  return (
     <div className='payment-verified-holder'>
          <div className='payment-verified-container'>
              <div>
                  <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1745157813/Artisan_1_ebpajg.png" alt="" />
              </div>
              <div>
                  <img src="https://res.cloudinary.com/dd1aj3hvn/image/upload/v1745157813/Frame_1000006357_p7yzzw.png" alt="" />
              </div>
              <h1>Subscription Payment Verified!</h1>
              <p>Thank you for subscribing Pro! Your payment has been <br /> processed, and you now have access to exclusive benefits to <br /> help you connect & grow</p>
          </div>
     </div>
  )
}

export default PaymentVerified
