"use client"

import { useState, useEffect } from "react"
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Firebase configuration - hardcoded for Netlify deployment
const firebaseConfig = {
  apiKey: "AIzaSyBmMMzrSolqcqy0W-BZ5nSUZTrcxjNxSX8",
  authDomain: "chromacure-4aac2.firebaseapp.com",
  projectId: "chromacure-4aac2",
  storageBucket: "chromacure-4aac2.firebasestorage.app",
  messagingSenderId: "659675138326",
  appId: "1:659675138326:web:70317441370a6d682ee837",
  measurementId: "G-LK4JQB238F"
};

// Initialize Firebase app
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

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
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (!auth || !db) {
        setError("Firebase initialization failed");
        return;
      }

      try {
        // Sign in anonymously for public contact form
        await signInAnonymously(auth);
        setIsFirebaseReady(true);
        console.log("Firebase authentication successful");
      } catch (e) {
        console.error("Firebase authentication failed:", e);
        setError("Failed to connect to the database: " + e.message);
      }
    };

    initAuth();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFirebaseReady || !db) {
      setError("Database is not ready. Please try again in a moment.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use a simple collection path for Netlify deployment
      const contactsRef = collection(db, 'contacts');
      
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'website_contact_form'
      };

      console.log("Submitting data:", submissionData);
      await addDoc(contactsRef, submissionData);
      
      console.log("Form submitted successfully");
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
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
      }, 5000);

    } catch (err) {
      console.error("Error submitting form: ", err);
      setError("Failed to send message: " + err.message);
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
            {!isFirebaseReady && !error && (
              <div className="loading-message">
                <p>Connecting to database...</p>
              </div>
            )}
            
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
                {error && (
                  <div style={{ 
                    color: 'red', 
                    background: '#ffebee', 
                    padding: '10px', 
                    borderRadius: '4px',
                    marginBottom: '15px'
                  }}>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="userType">I am a:</label>
                  <select 
                    id="userType" 
                    name="userType" 
                    value={formData.userType} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="researcher">Researcher</option>
                    <option value="supporter">Supporter</option>
                    <option value="healthcare">Healthcare Professional</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
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
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                    />
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

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isLoading || !isFirebaseReady}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
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