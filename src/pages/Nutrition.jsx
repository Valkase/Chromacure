const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <div className="container">
        <div className="nutrition-header">
          <h1>Patient Nutrition Guide</h1>
          <p>Comprehensive nutritional support for vitiligo patients</p>
          <div className="nutrition-hero-image">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/healthy-colorful-foods-0rjLb7zhHNvLJ5xqNJEqXEMhPF8GhJ.png"
              alt="Healthy nutrition foods including colorful vegetables and fruits"
              className="hero-img"
            />
          </div>
        </div>

        <div className="nutrition-content">
          {/* General Advice Section */}
          <div className="nutrition-section">
            <div className="section-title-with-icon">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                </svg>
              </div>
              <h2>General Advice</h2>
            </div>
            <div className="nutrition-card featured-card">
              <div className="card-image">
                <img
                  src="https://i.postimg.cc/FKNRcJB3/Master-Food-Safety-Audits-with-Our-Comprehensive-Guide.jpg"
                  alt="Person monitoring food diary for healthy eating"
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <p>
                  Vitiligo patients respond differently to various foods, so it's important to monitor your body and
                  notice if certain foods or drinks worsen or spread the patches.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  On the other hand, supporting your body with foods rich in{" "}
                  <strong>copper, zinc, vitamin C, vitamin B12, folic acid, and antioxidants</strong> can help protect
                  pigment cells and reduce the risk of disease progression.
                </p>
              </div>
            </div>
          </div>

          {/* Foods That Increase Oxidative Stress */}
          <div className="nutrition-section">
            <div className="section-title-with-icon">
              <div className="section-icon warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2>Foods and Drinks That Increase Oxidative Stress</h2>
            </div>
            <p className="section-description">These foods accelerate cell damage and should be limited:</p>
            <div className="nutrition-grid">
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/Cxj5z4mw/food-8504111-1280.jpg" alt="Fried foods and french fries" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Fried Foods</h3>
                </div>
                <p>Fried foods cooked in hydrogenated or reused oils increase oxidative stress and inflammation.</p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/90rz05Nk/dafewar.jpg" alt="Soft drinks and energy drinks" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Soft Drinks & Energy Drinks</h3>
                </div>
                <p>High sugar content and artificial ingredients promote inflammation and weaken immune function.</p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/xjh15ZZ0/image.jpg" alt="Refined sugar, candy and sweets" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Refined Sugars</h3>
                </div>
                <p>Excess refined sugars cause blood sugar spikes and increase oxidative stress in the body.</p>
              </div>
            </div>
          </div>

          {/* White Flour Section */}
          <div className="nutrition-section">
            <div className="section-title-with-icon">
              <div className="section-icon info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h2>Why White Flour Is a Problem</h2>
            </div>
            <div className="nutrition-card info-card">
              <div className="card-image">
                <img
                  src="https://i.postimg.cc/tTrY9CDP/All-Purpose-White-Flour-for-Emergency-Food-Storage-53-servings.jpg"
                  alt="White flour and refined wheat products"
                  className="card-img"
                />
              </div>
              <div className="card-content">
                <h3>The Issue with Refined Flour</h3>
                <p>
                  White flour is refined wheat flour with the bran and germ removed, stripping away most vitamins,
                  minerals, and fiber.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  It has a high glycemic index, causing rapid blood sugar spikes that increase oxidative stress and
                  weaken skin immunity.
                </p>
                <p style={{ marginTop: "1rem" }}>
                  Regular consumption can promote chronic inflammation, making autoimmune conditions like vitiligo more
                  likely to spread.
                </p>
              </div>
            </div>

            <div className="alternatives-section">
              <h3 className="alternatives-title">
                <div className="alternatives-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                Healthy Alternatives to White Flour
              </h3>
              <div className="nutrition-grid">
                <div className="nutrition-card good-card">
                  <div className="card-image">
                    <img src="https://i.postimg.cc/mgxhLn3d/Easy-Dairy-Free-Bread-Recipes-Gluten-Free-Option-Blooming-Health-Secrets.jpg" alt="Gluten-free bread and oat bread" className="card-img" />
                  </div>
                  <div className="card-icon-title">
                    <div className="card-icon good">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3>Gluten-Free Options</h3>
                  </div>
                  <p>Gluten-free oat bread and chickpea or almond flour for baking.</p>
                </div>
                <div className="nutrition-card good-card">
                  <div className="card-image">
                    <img
                      src="https://i.postimg.cc/T1z2Pyby/Whole-Wheat-Pasta-Salad-Recipe.jpg"
                      alt=""
                      className="card-img"
                    />
                  </div>
                  <div className="card-icon-title">
                    <div className="card-icon good">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3>Whole Grains</h3>
                  </div>
                  <p>Whole grain bread and rice or quinoa pasta for better nutrition.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Drinks to Avoid */}
          <div className="nutrition-section">
            <div className="section-title-with-icon">
              <div className="section-icon warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12V7a7 7 0 0 1 14 0v5" />
                  <rect x="2" y="12" width="20" height="8" rx="2" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2>Drinks to Avoid or Limit</h2>
            </div>
            <div className="nutrition-grid drinks-grid">
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/QNyHPCFZ/Drinks.jpg" alt="Soft drinks and cola" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Soft Drinks</h3>
                </div>
                <p>
                  High in refined sugar and phosphorus, causing rapid blood sugar spikes and inflammation. Some
                  artificial colorings may trigger skin sensitivity.
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img
                    src="https://i.postimg.cc/kGzGt10g/Choosing-our-beer-XD-newton.jpg"
                    alt="Alcoholic beverages including beer and wine"
                    className="card-img"
                  />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Alcoholic Beverages</h3>
                </div>
                <p>
                  Weaken the immune system and increase oxidative stress in pigment cells. Affect the liver, which plays
                  a key role in antioxidant balance.
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/rmYFvZFN/Monster-background.jpg" alt="Energy drinks with high caffeine" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Energy Drinks</h3>
                </div>
                <p>
                  Contain high levels of caffeine and sugar, increasing oxidative stress. Certain artificial ingredients
                  may trigger immune reactions.
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/YSRSxq5V/healthy.jpg" alt="Packaged fruit juices" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Packaged Fruit Juices</h3>
                </div>
                <p>
                  High sugar content promotes inflammation. Depletes essential vitamins like vitamin C and B12 needed
                  for healthy skin.
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img src="https://i.postimg.cc/FRFYtJbN/coolberg.jpg" alt="Gluten-containing drinks like beer" className="card-img" />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Gluten-Containing Drinks</h3>
                </div>
                <p>
                  For some vitiligo patients, gluten sensitivity can activate the immune system against pigment cells
                  (e.g., barley beer, wheat-based beverages).
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img
                    src="https://i.postimg.cc/m21tG49z/Fat-Burning-Coffee-The-Best-Coffee-Recipes-for-Weight-Loss-Style-Persuit.jpg"
                    alt="Coffee and tea with excessive caffeine"
                    className="card-img"
                  />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Excessive Tea or Coffee</h3>
                </div>
                <p>
                  Too much caffeine may reduce absorption of key minerals like iron and zinc. Increases nervous stress,
                  which can worsen vitiligo.
                </p>
              </div>
              <div className="nutrition-card avoid-card">
                <div className="card-image">
                  <img
                    src="https://i.postimg.cc/QNyHPCFZ/Drinks.jpg"
                    alt="Artificial acidic drinks with synthetic ingredients"
                    className="card-img"
                  />
                </div>
                <div className="card-icon-title">
                  <div className="card-icon avoid">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h3>Artificially Acidic Drinks</h3>
                </div>
                <p>
                  Synthetic lemon juice and citrus-flavored beverages contain artificial acids and colorings that may
                  irritate the stomach and affect nutrient absorption.
                </p>
              </div>
            </div>
          </div>

          {/* Helpful Tips Section */}
          <div className="nutrition-section">
            <div className="nutrition-card key-takeaway-card">
              <div className="takeaway-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3>Key Takeaway</h3>
              <p>
                Remember that every person with vitiligo may respond differently to foods. Keep a food diary to track
                how your skin responds to different dietary choices, and consult with your healthcare provider for
                personalized nutrition advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
