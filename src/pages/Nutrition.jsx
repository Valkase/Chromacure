const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <div className="container">
        <div className="nutrition-header">
          <h1>Patient Nutrition Guide</h1>
          <p>Comprehensive nutritional support for vitiligo patients</p>
        </div>

        <div className="nutrition-content">
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
