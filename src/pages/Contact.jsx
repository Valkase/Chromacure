"use client"

import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';

// IMPORTANT: The following is the updated Firebase configuration to handle both the Canvas
// environment and a regular React/Netlify deployment. It checks for the Canvas-specific
// __firebase_config first, then falls back to environment variables. This prevents the
// "process is not defined" error in a local development environment.
// I hate Firebase man
const firebaseConfig = (() => {
  if (typeof __firebase_config !== 'undefined') {
    return JSON.parse(__firebase_config);
  } else {
    return {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    };
  }
})();

// Function to safely get a Firestore instance
const getFirestoreInstance = () => {
  try {
    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    console.log(firebaseConfig);
    return null;
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    userType: "patient",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const firestoreDb = getFirestoreInstance();
        if (firestoreDb) {
          setDb(firestoreDb);
          const auth = getAuth(firestoreDb.app);

          // Sign in the user anonymously for a contact form
          // This code is necessary for the Canvas environment to work, but
          // on Netlify with your environment variables, it will automatically
          // use those.
          const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : '';
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }

          const user = auth.currentUser;
          setUserId(user ? user.uid : 'anonymous');
        }
      } catch (e) {
        console.error("Firebase initialization failed:", e);
        setError("Failed to connect to the database.");
      }
    };
    initFirebase();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      setError("Database is not connected. Please try again later.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Note: `appId` is only available in the Canvas environment.
      // For your live site, you'll need to define a static path.
      // For example, `collection(db, "contacts")` or `collection(db, "formSubmissions")`
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const contactsRef = collection(db, `artifacts/${appId}/public/data/contacts`);
      
      const submissionData = {
        ...formData,
        userId,
        timestamp: new Date().toISOString(),
      };

      await addDoc(contactsRef, submissionData);
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          userType: "patient",
        });
      }, 3000);

    } catch (err) {
      console.error("Error submitting form: ", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Get Support</h1>
          <p>Whether you're a patient, researcher, or supporter, we're here to help</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3>Address</h3>
                <p>
                  National Research Centre
                  <br />
                  Cairo, Egypt
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <p>
                  info@chromacure.com
                  <br />
                  support@chromacure.com
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3>Phone</h3>
                <p>
                  +20 123 456 7890
                  <br />
                  +20 987 654 3210
                </p>
              </div>
            </div>

            <div className="support-types">
              <h3>We Support</h3>
              <div className="support-grid">
                <div className="support-item">
                  <h4>For Patients</h4>
                  <p>Access support resources and track your journey</p>
                </div>
                <div className="support-item">
                  <h4>For Researchers</h4>
                  <p>Collaborate with our research team</p>
                </div>
                <div className="support-item">
                  <h4>For Supporters</h4>
                  <p>Help advance vitiligo research and support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22,4 12,14.01 9,11.01" />
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send us a Message</h2>
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <div className="form-group">
                  <label htmlFor="userType">I am a:</label>
                  <select id="userType" name="userType" value={formData.userType} onChange={handleChange} required>
                    <option value="patient">Patient</option>
                    <option value="researcher">Researcher</option>
                    <option value="supporter">Supporter</option>
                    <option value="healthcare">Healthcare Professional</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Send Message
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22,2 15,22 11,13 2,9 22,2" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
