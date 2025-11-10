import { useState } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      title: 'Energy system',
      items: ['Reports', 'News and commentaries', 'Events', 'Energy system', 'Topics', 'Countries and regions', 'Glossary']
    },
    {
      title: 'Topics',
      items: ['Electric Vehicles', 'Batteries', 'Charging Infrastructure', 'Oil Displacement', 'CO2 Emissions']
    },
    {
      title: 'Countries',
      items: ['World', 'China', 'Europe', 'United States', 'India', 'Rest of World']
    },
    {
      title: 'Data',
      items: ['Data explorers', 'Data sets', 'Policies database', 'Chart library', 'Energy Statistics Browser']
    },
    {
      title: 'Reports',
      items: ['Global Lubricant Consumption Outlook', 'Energy Technology Perspectives', 'World Energy Outlook', 'Market Reports']
    }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <svg width="60" height="32" viewBox="0 0 60 32" fill="none">
            <rect width="60" height="32" rx="4" fill="#0066CC" />
            <text x="30" y="22" fontFamily="Arial" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">GMI</text>
          </svg>
        </div>

        <div className="navbar-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search everything" className="search-input" />
        </div>

        <div className="navbar-menu">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="navbar-item"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="navbar-button">
                {item.title}
                <svg className="dropdown-icon" width="12" height="8" viewBox="0 0 12 8">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </button>
              {activeDropdown === item.title && (
                <div className="navbar-dropdown">
                  {item.items.map((subItem, subIndex) => (
                    <a key={subIndex} href="#" className="dropdown-item">
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="navbar-icon-button">
            <FiUser size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;