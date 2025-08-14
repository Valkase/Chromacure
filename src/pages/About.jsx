import { Link } from "react-router-dom"
import "../styles/About.css"
import ChromaGrid from "../components/ChromaGrid"
import Particles from "../components/ParticlesBG"

const About = () => {
  const team = [
    {
      image: "https://i.pravatar.cc/300?img=1",
      title: "واحد كده",
      subtitle: "بيعمل اي شغلانه",
      handle: "@اي اسم",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.chess.com/"
    },
    {
      image: "https://i.pravatar.cc/300?img=2",
      title: "Dr. ميكا",
      subtitle: "عيل شكله حلو",
      handle: "@ميكانيكا",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://www.youtube.com/"
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "واحد كده برضو",
      subtitle: "احلى شغلانه في مصر",
      handle: "@احللى اسم ف مصر",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://www.facebook.com/"
    },
    {
      image: "https://i.pravatar.cc/300?img=4",
      title: "البرنس الصغير",
      subtitle: "منقذ البلاد",
      handle: "@!!!!!!",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg, #EF4444, #000)",
      url: "https://www.tiktok.com/"
    },
    {
      image: "https://i.pravatar.cc/300?img=5",
      title: "دي واحده",
      subtitle: "مش بتعمل حاجه",
      handle: "@(ˉ﹃ˉ)",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg, #8B5CF6, #000)",
      url: "https://stevenuniverse.best/"
    },
    {
      image: "https://i.pravatar.cc/300?img=6",
      title: "دا مش انا",
      subtitle: "الجينيص بتاعنا",
      handle: "@(☞ﾟヮﾟ)☞ genius",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #000)",
      url: "https://dictionary.cambridge.org/dictionary/english/chill"
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <Particles
            particleColors={['#000000', '#000000']}
            particleCount={80}
            particleSpread={25}
            speed={0.08}
            particleBaseSize={1000}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">About VitaCure</div>
            <h1 className="hero-title">
              Pioneering <span className="highlight">Vitiligo Treatment</span>
            </h1>
            <p className="hero-subtitle">
              Dedicated to revolutionizing vitiligo care through innovative research, 
              comprehensive support, and cutting-edge treatment solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="our-mission">
        <div className="container">
          <div className="section-header">
            <h2>Our Mission</h2>
            <p>Transforming lives through innovative vitiligo treatment and support</p>
          </div>
          <div className="mission-content">
            <div className="mission-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
                  <path d="M19 11h-4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
                  <path d="M12 2L8 6h8l-4-4z" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>
                At VitaCure, we are dedicated to revolutionizing the treatment of vitiligo through
                innovative solutions that restore confidence and improve the quality of life for those
                affected by this condition.
              </p>
            </div>
            <div className="mission-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Compassion</h3>
              <p>
                Our mission is to provide effective, affordable, and accessible treatments that 
                empower individuals to embrace their unique skin and regain their confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide our work and commitment to patients</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <h3>Excellence</h3>
              <p>We strive for the highest standards in research, treatment, and patient care.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Accessibility</h3>
              <p>Making advanced vitiligo treatment accessible to patients worldwide.</p>
            </div>
            <div className="value-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Transparency</h3>
              <p>Open communication about our research, progress, and treatment outcomes.</p>
            </div>
            <div className="value-card">
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
              <h3>Innovation</h3>
              <p>Continuously advancing treatment methods through cutting-edge research.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>Dedicated professionals working to advance vitiligo treatment</p>
          </div>
          {/* <div className="team-grid">
            <ChromaGrid
              items={team}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div> */}
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Mission</h2>
            <p>
              Whether you're a patient seeking treatment, a researcher interested in collaboration, 
              or someone who wants to support our cause, we welcome you to be part of our journey.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Support
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/research" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
