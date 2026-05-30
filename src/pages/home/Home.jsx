import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useTheme } from '../../context/ThemeContext.jsx';

/* ── SVG Icons ── */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const FilePlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const UserCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
  </svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="nostos-landing">
      {/* ── NAVBAR ── */}
      <header className="h-navbar">
        <div className="container nav-content">
          <Link to="/" className="nav-brand">
            <SearchIcon />
            Nostos
          </Link>

          <nav className="nav-links">
            <a href="#home"         className="nav-link">Home</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#features"     className="nav-link">Features</a>
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
            </button>
            <Link to="/login"    className="btn-ghost">Sign In</Link>
            <Link to="/register" className="btn-primary">Get Started <ArrowRightIcon /></Link>
          </div>

          <button className="mobile-nav-toggle" aria-label="Open menu">
            <MenuIcon />
          </button>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section id="home" className="hero container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              University Lost &amp; Found Platform
            </div>

            <h1 className="hero-title">
              Reuniting People with{' '}
              <span className="gradient-text">Their Lost Belongings.</span>
            </h1>

            <p className="hero-subtitle">
              Nostos helps students securely report lost items, post found items, and reconnect them with their rightful owners — all verified via university email.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn-primary btn-lg">
                Report Lost Item <ArrowRightIcon />
              </Link>
              <Link to="/login" className="btn-secondary btn-lg">
                Report Found Item
              </Link>
            </div>
          </div>

          {/* ── RIGHT-SIDE ILLUSTRATION ── */}
          <div className="hero-image">
            <div className="hero-illustration">
              {/* Outer decorative dot grid */}
              <div className="hero-dot-grid" aria-hidden="true">
                {Array.from({ length: 49 }).map((_, i) => (
                  <span key={i} className="hero-dot" />
                ))}
              </div>

              {/* Pulsing ring */}
              <div className="hero-ring hero-ring-outer" aria-hidden="true" />
              <div className="hero-ring hero-ring-inner" aria-hidden="true" />

              {/* Center icon */}
              <div className="hero-center-icon" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Floating item chips */}
              <div className="hero-chip hero-chip-1">🎒 Backpack</div>
              <div className="hero-chip hero-chip-2">🔑 Keys</div>
              <div className="hero-chip hero-chip-3">💳 ID Card</div>
              <div className="hero-chip hero-chip-4">📱 Phone</div>
              <div className="hero-chip hero-chip-5">🎧 Earphones</div>
              <div className="hero-chip hero-chip-6">🖊️ Pen Drive</div>

              {/* Status pill — bottom */}
              <div className="hero-status-pill" aria-hidden="true">
                <span className="hero-status-dot" />
                Campus-wide scanning active
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="section-padding bg-soft">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Simple Process</span>
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">A secure, three-step process to reunite lost items with their owners.</p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon-wrapper"><FilePlusIcon /></div>
                <h3 className="step-title">1. Report</h3>
                <p className="step-desc">Report a lost or found item with details and photos. Your university email is verified for trust.</p>
              </div>
              <div className="step-card">
                <div className="step-icon-wrapper"><ShieldIcon /></div>
                <h3 className="step-title">2. Claim &amp; Verify</h3>
                <p className="step-desc">Claim an item and provide private proof details only the true owner would know.</p>
              </div>
              <div className="step-card">
                <div className="step-icon-wrapper"><UserCheckIcon /></div>
                <h3 className="step-title">3. Reconnect</h3>
                <p className="step-desc">Meet securely on campus and reunite the item with its rightful owner.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Why Nostos?</span>
              <h2 className="section-title">Built for Campus Safety</h2>
              <p className="section-subtitle">Every feature is designed for a trustworthy, fraud-resistant university experience.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-wrap"><MailIcon /></div>
                <h3>Secure Email OTP</h3>
                <p>Every user is verified via their university email using secure one-time passwords — no imposters.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrap"><CheckCircleIcon /></div>
                <h3>Claim Verification</h3>
                <p>A strict proof-based verification ensures items are returned only to original owners.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrap"><ZapIcon /></div>
                <h3>Smart Matching</h3>
                <p>Intelligent tagging and search connects reported lost items to corresponding found posts in seconds.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrap"><EyeIcon /></div>
                <h3>Admin Moderation</h3>
                <p>Platform administrators constantly review claims and activity to prevent fraud and abuse.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding">
          <div className="container">
            <div className="cta-section">
              <div className="cta-container">
                <h2 className="cta-title">Start Reuniting Lost Items Today.</h2>
                <p className="cta-subtitle">Join thousands of students on the safest university lost and found network. Free and easy to use.</p>
                <Link to="/register" className="btn-cta">Create Your Free Account</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <Link to="/" className="nav-brand"><SearchIcon />Nostos</Link>
            <p className="footer-desc">Your trusted university lost and found management system. Securely reconnecting students with their belongings.</p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <nav>
              <a href="#home">Home</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#features">Features</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <nav>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <span>Nostos</span>. All rights reserved. Built for campus communities.</p>
        </div>
      </footer>
    </div>
  );
}
