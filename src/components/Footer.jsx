import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/footer.css';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa6';
import { RiArrowDropRightLine } from 'react-icons/ri';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const linkSections = [
    { title: 'Artisans', links: [{ text: 'Create Profile', path: '/create-profile' }] },
    { title: 'Employers', links: [{ text: 'Explore Artisans', path: '/artisanpage' }] },
    { title: 'Platform', links: [{ text: 'About Us', path: '/about' }, { text: 'How it works', path: '/how-it-works' }] },
    { title: 'Support', links: [{ text: 'Help Center', path: '/help' }, { text: 'FAQ', path: '/faq' }] },
    { title: 'Legal', links: [{ text: 'Terms of Service', path: '/terms' }, { text: 'Privacy Policy', path: '/privacy' }] },
  ];

  const socialIcons = [
    { Icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
    { Icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { Icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Call to Action */}
        <div className="footer-cta">
          <h3 className="footer-cta-title">
            Experience the Art of Expert Craftsmanship -{' '}
            <span className="highlight-blue">Explore Now!</span>
          </h3>
          <button
            className="footer-cta-button"
            onClick={() => handleNavigate('/artisanpage')}
            aria-label="Explore Artisans"
          >
            Explore Artisans <RiArrowDropRightLine size={20} />
          </button>
        </div>

        {/* Secondary Call to Action */}
        <div className="footer-cta-secondary">
          <h3 className="footer-cta-title">
            Unlock New Opportunities - Get Started{' '}
            <span className="highlight-orange">Now!</span>
          </h3>
          <button
            className="footer-cta-button"
            onClick={() => handleNavigate('/authoption')}
            aria-label="Get Started"
          >
            Get Started <RiArrowDropRightLine size={20} />
          </button>
        </div>

        {/* Link Sections */}
        <div className="footer-links">
          {linkSections.map((section) => (
            <div key={section.title} className="footer-link-section">
              <h4>{section.title}</h4>
              {section.links.map((link) => (
                <button
                  key={link.text}
                  className="footer-link"
                  onClick={() => handleNavigate(link.path)}
                >
                  {link.text}
                </button>
              ))}
            </div>
          ))}
        </div>

        <hr className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 ArtisanAid. All Rights Reserved.</p>
          <div className="footer-social">
            {socialIcons.map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;