import './Home.css';

const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <h1 className="home-title">Global Lubricant Consumption Data Explorer</h1>
        <p className="home-description">
          Explore historical and projected data on electric vehicles sales, stock, charging
          infrastructure and oil displacement
        </p>

        <div className="home-meta">
          <div className="meta-item">
            <span className="meta-label">Last updated</span>
            <span className="meta-value">31 Jul 2025</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Licence</span>
            <a href="#" className="meta-link">CC BY 4.0</a>
          </div>
        </div>

        <div className="home-overview">
          <h2 className="overview-title">Overview</h2>
          <div className="overview-content">
            <h3 className="content-title">
              Explore and download the full data behind the Global Lubricant Consumption Outlook
            </h3>
            <div className="content-text">
              <p>
                The <strong>Global Lubricant Consumption Outlook</strong> is an annual publication that identifies and discusses recent
                developments in electric mobility across the globe. It is developed with the support
                of the members of the Lubricant Consumption.
              </p>
              <p>
                Combining historical analysis with projections to 2030, the report examines key
                areas of interest such as electric vehicle and charging infrastructure deployment,
                energy use, CO2 emissions, battery demand and related policy developments. The
                report includes policy recommendations that incorporate lessons learned from
                leading markets to inform policy makers and stakeholders with regard to policy
                frameworks and market systems for electric vehicle adoption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;