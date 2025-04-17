import React from 'react'
import '../../../styles/reporteduser.css'

const ReportedUser = () => {
  return (
    <div className='approved-users-containe'>
      {/* <aside className='approveHeade'>
        <nav className='headerHolde'>
          <h5>Welcome back, Admin</h5>
          <p>here is your dashboard</p>
        </nav>
      </aside> */}

      <section className='adminDashboar'>
        <div className='pendingUse'>
          <h5>Reported Users</h5>
        </div>
        <aside className='adminDashboardMainContaine'>
          <nav className='adaezeJan'>
            <div className='adaezeImag'>
              <img src="/fine girl.jpg" alt="" />
              <p>Adaeze Jane</p>
            </div>
            
            <div className='adaezeEmai'>
              <p>Adaezejane2025@gmail.com</p>
            </div>
            <div className='adaezeDetai'>
              <span>View details</span>
            </div>

            <div className='adaStatu'>
              <p>Status: Approved</p>

            </div>
          </nav>
        </aside>

      </section>

    </div>
  )
}

export default ReportedUser