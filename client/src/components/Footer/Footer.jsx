import { FiYoutube, FiLinkedin, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Understand energy',
      links: ['Reports', 'News and commentaries', 'Events', 'Energy system', 'Topics', 'Countries and regions', 'Glossary']
    },
    {
      title: 'Explore data',
      links: ['Data explorers', 'Data sets', 'Policies database', 'Chart library', 'Energy Statistics Browser']
    },
    {
      title: 'GMI essentials',
      links: ['About', 'Mission', 'Membership', 'Structure', 'Programmes', 'International collaborations', 'Technology collaboration', 'Training']
    },
    {
      title: 'Connect',
      links: ['Contact', 'Press', 'Jobs', 'Internships', 'Delegates', 'Help centre']
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© 2025 GMI</span>
            <a href="#" className="footer-bottom-link">Terms</a>
            <a href="#" className="footer-bottom-link">Privacy</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="YouTube">
              <FiYoutube size={20} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FiTwitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <FiFacebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FiInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;