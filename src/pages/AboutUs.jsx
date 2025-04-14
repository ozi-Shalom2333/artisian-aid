import React from 'react'
import '../styles/about.css'


const AboutUs = () => {
  return (
    <div className='aboutUsMainBody'>
      <main className='aboutTopBackgroundImage'>
        <section className='aboutUsBackgroundImageText'>
          <p>About us</p>
          <h2>
            We're Set Out To Providing <span style={{color:`#FFA500`}}>Timeless</span> Solutions To Artisan & Busy Professionals 
          </h2>
        </section>
      </main>

      
      <aside className='aboutUsOurValues'>
        <div className='aboutUsOurValuesChild'>
          <h2>Our Values</h2>
          <section className='aboutUsQuality'>
             <div className='aboutUsReliable'>
              <nav>
              <img src="/Vector (3).png" alt="" />
              </nav>
              <aside className='aboutUsText'>
              <span style={{color:`#2F80ED`}}>Reliable & Efficient Workers at Your Service.</span><p style={{color:`000435`}}>Trust Our Vetted Artisans to Deliver Quality Work on Time,Every Time.</p>
              </aside>
             </div>


             <div className='aboutUsReliable'>
              <nav>
              <img src="/Vector (4).png" alt="" />
              </nav>
              <aside className='aboutUsText'>
              <span style={{color:`#FFA500`}}>Flexible earning opportunities</span><p style={{color:`#000435`}}>Taskers can set their own hours and choose tasks that fit their skills and availability, providing a flexible way to earn income.</p>
              </aside>
             </div>

             <div className='aboutUsReliable'>
              <nav>
              <img src="/Clip path group (1).png" alt="" />
              </nav>
              <aside className='aboutUsText'>
              <span style={{color:`#2F80ED`}}>Personalized Service Guaranteed:</span><p style={{color:`#000435`}}>Enjoy Direct,One-on-One Interaction with Our Skilled Artisans for a Seamless Experience.</p>
              </aside>
             </div>
          </section>


        </div>

      </aside>
      <div className='aboutUsOurAim'>
        <section className='aboutUsAimSection'>
          <aside className='aboutUsAimSectionText'>
            <h2>Our Aim</h2>
            
            <div className='aboutUsFullText'>
              <span>
              Our aim is to empower busy professionals with unparalleled convenience and flexibility, while providing artisans and taskers with the freedom to earn on their own terms. By offering a transparent, secure, and supportive platform.
              </span>

              <p>
              We bridge the gap between those seeking to offload time-consuming tasks and those looking to monetize their skills flexibly. Through a diverse range of task categories, we foster a community that values mutual support and growth, ensuring that both task posters and taskers benefit from a seamless and rewarding experience.
              </p>
            </div>
          </aside>
          <nav className='aboutUsAimImageSection'></nav>

        </section>
      </div>

    </div>
  )
}

export default AboutUs
