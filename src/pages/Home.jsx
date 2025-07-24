import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Innovative Medical Research</div>
            <h1 className="hero-title">
              Revolutionary Treatment for <span className="highlight">Vitiligo</span>
            </h1>
            <p className="hero-subtitle">
              Towards an Innovative Treatment for Vitiligo and Comprehensive Patient Support
            </p>
            <div className="hero-buttons">
              <Link to="/explore-research" className="btn btn-primary">
                Explore Research
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            
          </div>
          <div className="section-header">
            <h2>Understanding Vitiligo</h2>
            <p>A chronic autoimmune disorder affecting millions worldwide</p>
            <div className="shape shape-2"></div>
          </div>
          
          <div className="about-grid">
            <div className="about-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
                  <path d="M19 11h-4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
                  <path d="M12 2L8 6h8l-4-4z" />
                </svg>
              </div>
              <h3>What is Vitiligo?</h3>
              <p>
                Vitiligo is a chronic autoimmune disorder that results in the loss of skin pigmentation due to the
                immune system attacking melanocytes—cells responsible for producing skin pigment.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4>Global Impact</h4>
                <p>65-95 million people worldwide affected according to WHO 2022 statistics</p>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <h4>Contributing Factors</h4>
                <p>Psychological factors, emotional trauma, genetics, and other autoimmune diseases</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="challenges">
        <div className="container">
          <div className="section-header">
            <h2>Current Challenges</h2>
            <p>Understanding the obstacles patients face today</p>
          </div>

          <div className="challenges-grid">
            <div className="challenge-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <h3>Long Duration</h3>
              <p>Treatment can extend from 1 to 7 years</p>
            </div>

            <div className="challenge-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>High Costs</h3>
              <p>Treatments cost up to $1,950, limiting access</p>
            </div>

            <div className="challenge-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Social Impact</h3>
              <p>Stigma leading to depression and anxiety</p>
            </div>

            <div className="challenge-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Low Awareness</h3>
              <p>Limited understanding due to no physical pain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="research">
        <div className="container">
          <div className="section-header">
            <h2>Our Solution</h2>
            <p>A comprehensive approach combining innovation and support</p>
          </div>

          <div className="research-grid">
            <div className="research-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                </div>
                <h3>Innovative Treatment</h3>
                <p>Revolutionary approach to vitiligo treatment</p>
              </div>
              <ul className="feature-list">
                <li>Reactivation of melanocytes to restore natural skin color</li>
                <li>Significantly reduced treatment duration</li>
                <li>Affordable and competitive alternative</li>
                <li>Addresses common side effects</li>
              </ul>
            </div>

            <div className="research-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3>Patient Support</h3>
                <p>Comprehensive online support platform</p>
              </div>
              <ul className="feature-list">
                <li>Online platform offering psychological support</li>
                <li>Progress tracking and vitiligo type identification</li>
                <li>Educational resources for disease management</li>
                <li>Enhanced mental well-being support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements">
        <div className="container">
          <div className="section-header">
            <h2>Research Progress</h2>
            <p>Milestones in our development journey</p>
          </div>

          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Patent Filed</h3>
              <p>Successfully filed patent for our innovative treatment</p>
            </div>

            <div className="achievement-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
                </svg>
              </div>
              <h3>Ethical Approval</h3>
              <p>Obtained approval for animal testing protocols</p>
            </div>

            <div className="achievement-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <h3>Research Publication</h3>
              <p>Preparing scientific paper for publication</p>
            </div>
          </div>

          <div className="implementation-note">
            <div className="note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="7,6.5 12,9.5 17,6.5" />
              </svg>
            </div>
            <div>
              <h4>Implementation Partner</h4>
              <p>
                Project implemented at the <strong>National Research Centre</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              We strive to provide effective and affordable treatment for vitiligo patients, improve their mental
              health, and help them regain self-confidence, ensuring a better quality of life and a more understanding
              society.
            </p>
            <div className="mission-buttons">
              <Link to="/join-community" className="btn btn-primary">
                Join Our Community
              </Link>
              <Link to="/support-research" className="btn btn-secondary">
                Support Research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
