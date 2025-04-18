import React from 'react'
import { FaTwitter, FaInstagram } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import '../styles/MeetTeam.css'

const teamData = [
  {
    name: 'Prince Jehoshaphat',
    role: 'Team Lead / Product Designer',
    image: '/images/prince.jpg',
    bgColor: '#FFB648', // orange
  },
  {
    name: 'Ernest Shaibu',
    role: 'Back-end Developer',
    image: '/images/ernest.jpg',
    bgColor: '#2F80ED', // blue
  },
  {
    name: 'Victoria Trust',
    role: 'Front-end Developer',
    image: '/images/victoria.jpg',
    bgColor: '#2F80ED', // blue
  },
  {
    name: 'Ozioma Okafor',
    role: 'Front-end Dev / UI Engineer',
    image: '/images/ozioma.jpg',
    bgColor: '#FFB648', // orange
  },
  {
    name: 'Yusuf Olamilekan',
    role: 'Back-end Developer',
    image: '/images/yusuf.jpg',
    bgColor: '#2F80ED', // blue
  },
  {
    name: 'Ikechukwu Joshua',
    role: 'Front-end Developer',
    image: '/images/ikechukwu.jpg',
    bgColor: '#FFB648', // orange
  },
  {
    name: 'Gerald Elibe',
    role: 'Front-end Developer',
    image: '/images/gerald.jpg',
    bgColor: '#2F80ED', // blue
  },
  {
    name: 'Christopher Ichigou',
    role: 'Back-end Developer',
    image: '/images/christopher.jpg',
    bgColor: '#FFB648', // orange
  },
]

const MeetTeam = () => {
  return (
    <div className="meet-team-container">
      <h1 className="meet-team-title">Meet The Team Behind The Vision</h1>

      <div className="team-grid">
        {teamData.map((member, index) => (
          <div
            className="team-card"
            key={index}
            style={{ backgroundColor: member.bgColor }}
          >
            <div className="image-wrapper">
              <img
                src={member.image}
                alt={member.name}
                className="team-image"
              />
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>

            <div className="card-footer">
              <span className="follow-label">Follow on</span>
              <div className="social-icons">
                <FaTwitter className="social-icon" />
                <FaInstagram className="social-icon" />
                <AiFillFacebook className="social-icon" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeetTeam
