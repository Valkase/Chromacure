import { Link } from "react-router-dom"

import Particles from "../components/ParticlesBG"

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <Particles
            particleColors={["#000000", "#000000"]}
            particleCount={100}
            particleSpread={30}
            speed={0.1}
            particleBaseSize={1100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
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
          <div className="hero-shapes"></div>
          <div className="section-header">
            <h2>Understanding Vitiligo</h2>
            <p>A chronic autoimmune disorder affecting millions worldwide</p>
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
              <p style={{ color: "black" }}>
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

      <section className="challenges">
        <div className="container">
          <div className="section-header">
            <h2>Treatment Challenges</h2>
            <p>Understanding the barriers that make patients lose hope</p>
          </div>

          <div className="treatment-challenges">
            <div className="challenge-highlight">
              <div className="challenge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <div className="challenge-content">
                <h3>Throughout the Treatment Period</h3>
                <p>
                  One of the biggest factors that makes vitiligo patients lose hope in their treatment is the long
                  duration, as they often see little to no noticeable improvement. This depends on the treatment itself,
                  the patient's mental state, and their attention to proper nutrition.
                </p>
                <p className="highlight-text">
                  For this reason, we have redesigned and improved all these aspects to address this issue and
                  significantly reduce the treatment time.
                </p>
              </div>
            </div>

            <div className="challenge-highlight">
              <div className="challenge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="challenge-content">
                <h3>The High Cost of Vitiligo Treatment</h3>
                <p>
                  Treating vitiligo is often expensive because it requires using multiple medications, not just one. On
                  average, a vitiligo patient consumes at least two packages of treatment per month. In addition, if
                  they also use tablets, vitamins, ointments, or supportive formulations, the financial burden becomes
                  significant over time—especially for middle-income patients.
                </p>
                <div className="cost-example">
                  <span className="cost-label">FDA Approved Treatment:</span>
                  <span className="cost-amount">$1,950</span>
                  <span className="cost-description">for just one tube of cream</span>
                </div>
                <p className="highlight-text">
                  We have addressed this issue by ensuring we provide the best quality at the best possible price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-impact">
        <div className="container">
          <div className="section-header">
            <h2>The Social Impact of Vitiligo</h2>
            <p>Understanding the psychological burden beyond the physical symptoms</p>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Social Stigma</h3>
              <p>
                Misconceptions about vitiligo being contagious lead to uncomfortable stares and social avoidance,
                creating psychological isolation and feelings of rejection.
              </p>
            </div>

            <div className="impact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Low Self-Confidence</h3>
              <p>
                Visible patches, especially on face or hands, cause patients to avoid eye contact, social gatherings,
                and new relationships, significantly impacting their confidence.
              </p>
            </div>

            <div className="impact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Employment & Marriage Discrimination</h3>
              <p>
                Patients may face difficulties in job opportunities or marriage prospects due to appearance-based
                discrimination, despite vitiligo not affecting physical abilities.
              </p>
            </div>

            <div className="impact-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Depression & Anxiety</h3>
              <p>
                Constant psychological pressure from stigma and isolation increases risk of depression, social anxiety,
                and PTSD, creating a vicious cycle that can accelerate vitiligo spread.
              </p>
            </div>
          </div>

          <div className="vicious-cycle">
            <h3>Breaking the Vicious Cycle</h3>
            <p>
              Psychological stress elevates cortisol levels, potentially accelerating vitiligo spread, which increases
              frustration and traps patients in a destructive cycle. Our comprehensive approach addresses both the
              physical and psychological aspects of vitiligo.
            </p>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="research">
        <div className="container">
          <div className="section-header">
            <h2>Our Comprehensive Solution</h2>
            <p>Breaking the cycle with innovation, affordability, and support</p>
          </div>

          <div className="research-grid">
            <div className="research-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--primary-light)" }}>
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
                <li>Affordable and competitive alternative to $1,950 treatments</li>
                <li>Addresses common side effects and nutritional factors</li>
              </ul>
            </div>

            <div className="research-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: "var(--primary-light)" }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3>Psychological Support</h3>
                <p>Comprehensive mental health and social support</p>
              </div>
              <ul className="feature-list">
                <li>Cognitive behavioral therapy and counseling support</li>
                <li>Progress tracking and vitiligo type identification</li>
                <li>Educational resources and practical guidance</li>
                <li>Public awareness campaigns to reduce stigma</li>
              </ul>
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
