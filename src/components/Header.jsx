"use client"
import ThemeToggle from "./ThemeToggle.jsx"

import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <div style={{ position: 'relative' }}>
                <p className="logo desktop-logo">VitaCure</p>
            </div> 
            <img src="https://i.postimg.cc/Wzf2rq0b/Asset-6.png" alt="Chromacure" className="logo mobile-logo" />
          </Link>

          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={handleNavClick}>
              About
            </Link>
            <Link to="/research" className="nav-link" onClick={handleNavClick}>
              Research
            </Link>
            <Link to="/nutrition" className="nav-link" onClick={handleNavClick}>
              Nutrition
            </Link>
            <Link to="/contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </Link>
            <ThemeToggle />
          </nav>

          <Link to="/contact" className="get-support-btn">
            Get Support
          </Link>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
