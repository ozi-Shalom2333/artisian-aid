import React from 'react'
import '../../../styles/approvedusers.css'

const ApprovedUsers = () => {
  return (
    <div className='approved-users-container'>
      <aside className='approveHeader'>
        <nav className='headerHolder'>
          <h5>Welcome back, Admin</h5>
          <p>here is your dashboard</p>
        </nav>
      </aside>

      <section className='adminDashboard'>
        <div className='pendingUser'>
          <h5>Pending User Verification</h5>
        </div>
        <aside className='adminDashboardMainContainer'>
          <nav className='adaezeJane'>
            <div className='adaezeImage'>
              <img src="/fine girl.jpg" alt="" />
              <p>Adaeze Jane</p>
            </div>
            
            <div className='adaezeEmail'>
              <p>Adaezejane2025@gmail.com</p>
            </div>
            <div className='adaezeDetails'>
              <span>View details</span>
            </div>

            <div className='adaStatus'>
              <p>Status: Approved</p>

            </div>
          </nav>
        </aside>

      </section>

    </div>
  )
}

export default ApprovedUsers
