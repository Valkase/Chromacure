const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <div className="container">
        <div className="nutrition-header">
          <h1>Patient Nutrition Guide</h1>
          <p>Comprehensive nutritional support for vitiligo patients</p>
        </div>

        <div className="nutrition-content">
          <section className="nutrition-section">
            <h2>Essential Nutrients for Skin Health</h2>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>Antioxidants and Vitamins</h3>
                <p>Coming soon - Detailed information about essential vitamins and antioxidants</p>
              </div>
              <div className="nutrition-card">
                <h3>Minerals and Trace Elements</h3>
                <p>Coming soon - Important minerals for melanocyte function</p>
              </div>
            </div>
          </section>

          <section className="nutrition-section">
            <h2>Dietary Recommendations</h2>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>Foods to Include</h3>
                <p>Coming soon - Beneficial foods for vitiligo management</p>
              </div>
              <div className="nutrition-card">
                <h3>Foods to Avoid</h3>
                <p>Coming soon - Foods that may trigger vitiligo symptoms</p>
              </div>
            </div>
          </section>

          <section className="nutrition-section">
            <h2>Meal Planning</h2>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>Weekly Meal Plans</h3>
                <p>Coming soon - Structured meal plans for optimal nutrition</p>
              </div>
              <div className="nutrition-card">
                <h3>Recipe Collections</h3>
                <p>Coming soon - Healthy recipes designed for vitiligo patients</p>
              </div>
            </div>
          </section>

          <section className="nutrition-section">
            <h2>Supplements and Support</h2>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>Recommended Supplements</h3>
                <p>Coming soon - Evidence-based supplement recommendations</p>
              </div>
              <div className="nutrition-card">
                <h3>Consultation Services</h3>
                <p>Coming soon - Connect with nutrition specialists</p>
              </div>
            </div>
          </section>

          <div className="coming-soon-notice">
            <div className="notice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <h3>Content Coming Soon</h3>
            <p>
              Our nutrition experts are currently developing comprehensive content for this section. Check back soon for
              detailed nutritional guidance tailored specifically for vitiligo patients.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
