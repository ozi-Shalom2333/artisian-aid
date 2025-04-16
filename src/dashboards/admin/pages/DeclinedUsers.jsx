import React from 'react'
import '../../../styles/declineduser.css'

const DeclinedUsers = () => {
  return (
    <div className='pproved-users-container'>
      <aside className='pproveHeader'>
        <nav className='eaderHolder'>
          <h5>Welcome back, Admin</h5>
          <p>here is your dashboard</p>
        </nav>
      </aside>

      <section className='dminDashboard'>
        <div className='pendingUser'>
          <h5>Declined users</h5>
        </div>
        <aside className='dminDashboardMainContainer'>
          <nav className='daezeJane'>
            <div className='daezeImage'>
              <img src="/fine girl.jpg" alt="" />
              <p>Adaeze Jane</p>
            </div>
            
            <div className='daezeEmail'>
              <p>Adaezejane2025@gmail.com</p>
            </div>
{/* 
            
            <div className='daezeDetails'>
              <span>View details</span>
            </div> */}

            <div className='daStatus'>
              <p>Status: Declined</p>

            </div>
          </nav>
        </aside>

      </section>

    </div>
  )
}

export default DeclinedUsers
