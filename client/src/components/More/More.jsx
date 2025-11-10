import './More.css';

const More = () => {
  return (
    <section className="more">
      <div className="more-container">
        <div className="more-grid">
          <div className="more-card newsletters">
            <div className="more-card-content">
              <h3 className="more-card-title">Newsletters</h3>
              <p className="more-card-description">
                The best of the IEA sent straight to your inbox
              </p>
              <button className="more-button primary">
                Subscribe to newsletters
              </button>
            </div>
            <div className="more-card-image">
              <div className="newsletter-preview">📧</div>
            </div>
          </div>

          <div className="more-card podcasts">
            <div className="more-card-content">
              <h3 className="more-card-title">Podcasts</h3>
              <p className="more-card-description">
                Top energy experts put IEA analysis in context
              </p>
              <button className="more-button primary">
                Listen to our podcast
              </button>
            </div>
            <div className="more-card-image">
              <div className="podcast-preview">🎙️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default More;