import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './RecentThings.css';

const RecentThings = () => {
  const relatedContent = [
    {
      type: 'Data explorer',
      title: 'Global Lubricant Consumption Policy Explorer',
      description: 'Key policies and measures that support the deployment of electric and zero-emission vehicles',
      image: '📊'
    },
    {
      type: 'Flagship report',
      title: 'Global Lubricant Consumption Outlook 2025',
      subtitle: 'Expanding sales in diverse markets',
      date: '14 May 2025',
      image: '🚗'
    }
  ];

  return (
    <section className="recent-things">
      <div className="recent-container">
        <div className="recent-header">
          <h2 className="recent-title">Related content</h2>
          <div className="recent-filters">
            <button className="filter-chip active">All</button>
            <button className="filter-chip">Data</button>
            <button className="filter-chip">Reports</button>
            <button className="all-results-button">
              All results
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="content-grid">
          {relatedContent.map((item, index) => (
            <div key={index} className="content-card">
              <div className="card-image">
                <span className="card-emoji">{item.image}</span>
              </div>
              <div className="card-content">
                <span className="card-type">{item.type}</span>
                <h3 className="card-title">{item.title}</h3>
                {item.description && (
                  <p className="card-description">{item.description}</p>
                )}
                {item.subtitle && (
                  <p className="card-subtitle">{item.subtitle}</p>
                )}
                {item.date && (
                  <p className="card-date">{item.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-button">
            <FiChevronLeft size={20} />
          </button>
          <button className="carousel-button">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentThings;