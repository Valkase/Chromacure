const Nutrition = () => {
  return (
    <div className="nutrition-page">
      <div className="container">
        <div className="nutrition-header">
          <h1>Patient Nutrition Guide</h1>
          <p>Comprehensive nutritional support for vitiligo patients</p>
        </div>

        <div className="nutrition-content">
          {/* General Advice Section */}
          <div className="nutrition-section">
            <h2>General Advice</h2>
            <div className="nutrition-card">
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

          {/* Foods That Increase Oxidative Stress */}
          <div className="nutrition-section">
            <h2>Foods and Drinks That Increase Oxidative Stress</h2>
            <p style={{ marginBottom: "2rem", color: "var(--dark-brown)" }}>
              These foods accelerate cell damage and should be limited:
            </p>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>🍟 Fried Foods</h3>
                <p>Fried foods cooked in hydrogenated or reused oils increase oxidative stress and inflammation.</p>
              </div>
              <div className="nutrition-card">
                <h3>🥤 Soft Drinks & Energy Drinks</h3>
                <p>High sugar content and artificial ingredients promote inflammation and weaken immune function.</p>
              </div>
              <div className="nutrition-card">
                <h3>🍬 Refined Sugars</h3>
                <p>Excess refined sugars cause blood sugar spikes and increase oxidative stress in the body.</p>
              </div>
            </div>
          </div>

          {/* White Flour Section */}
          <div className="nutrition-section">
            <h2>Why White Flour Is a Problem</h2>
            <div className="nutrition-card">
              <h3>The Issue with Refined Flour</h3>
              <p>
                White flour is refined wheat flour with the bran and germ removed, stripping away most vitamins,
                minerals, and fiber.
              </p>
              <p style={{ marginTop: "1rem" }}>
                It has a high glycemic index, causing rapid blood sugar spikes that increase oxidative stress and weaken
                skin immunity.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Regular consumption can promote chronic inflammation, making autoimmune conditions like vitiligo more
                likely to spread.
              </p>
            </div>

            <h3 style={{ marginTop: "2rem", marginBottom: "1rem", color: "var(--dark-brown)" }}>
              Healthy Alternatives to White Flour
            </h3>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>🍞 Gluten-Free Options</h3>
                <p>Gluten-free oat bread and chickpea or almond flour for baking.</p>
              </div>
              <div className="nutrition-card">
                <h3>🌾 Whole Grains</h3>
                <p>Whole grain bread and rice or quinoa pasta for better nutrition.</p>
              </div>
            </div>
          </div>

          {/* Drinks to Avoid */}
          <div className="nutrition-section">
            <h2>Drinks to Avoid or Limit</h2>
            <div className="nutrition-grid">
              <div className="nutrition-card">
                <h3>🥤 Soft Drinks</h3>
                <p>
                  High in refined sugar and phosphorus, causing rapid blood sugar spikes and inflammation. Some
                  artificial colorings may trigger skin sensitivity.
                </p>
              </div>
              <div className="nutrition-card">
                <h3>🍺 Alcoholic Beverages</h3>
                <p>
                  Weaken the immune system and increase oxidative stress in pigment cells. Affect the liver, which plays
                  a key role in antioxidant balance.
                </p>
              </div>
              <div className="nutrition-card">
                <h3>⚡ Energy Drinks</h3>
                <p>
                  Contain high levels of caffeine and sugar, increasing oxidative stress. Certain artificial ingredients
                  may trigger immune reactions.
                </p>
              </div>
              <div className="nutrition-card">
                <h3>🧃 Packaged Fruit Juices</h3>
                <p>
                  High sugar content promotes inflammation. Depletes essential vitamins like vitamin C and B12 needed
                  for healthy skin.
                </p>
              </div>
              <div className="nutrition-card">
                <h3>🍺 Gluten-Containing Drinks</h3>
                <p>
                  For some vitiligo patients, gluten sensitivity can activate the immune system against pigment cells
                  (e.g., barley beer, wheat-based beverages).
                </p>
              </div>
              <div className="nutrition-card">
                <h3>☕ Excessive Tea or Coffee</h3>
                <p>
                  Too much caffeine may reduce absorption of key minerals like iron and zinc. Increases nervous stress,
                  which can worsen vitiligo.
                </p>
              </div>
              <div className="nutrition-card">
                <h3>🍋 Artificially Acidic Drinks</h3>
                <p>
                  Synthetic lemon juice and citrus-flavored beverages contain artificial acids and colorings that may
                  irritate the stomach and affect nutrient absorption.
                </p>
              </div>
            </div>
          </div>

          {/* Helpful Tips Section */}
          <div className="nutrition-section">
            <div
              className="nutrition-card"
              style={{ background: "rgba(102, 126, 234, 0.1)", border: "1px solid rgba(102, 126, 234, 0.2)" }}
            >
              <h3 style={{ color: "#667eea" }}>💡 Key Takeaway</h3>
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
