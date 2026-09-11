import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useWaitlist } from '../../context/WaitlistContext';

export function SiteHeader() {
  const { openWaitlist } = useWaitlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll listener for nav border subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) {
        nav.style.borderBottomColor =
          window.scrollY > 40 ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)';
        nav.style.boxShadow =
          window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,0.03)' : 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="topbar">
        <strong>Launching Soon</strong> &#8212; Pre-orders now open
      </div>

      {/* Main Sticky Navigation */}
      <header className="nav" id="nav">
        <div className="container">
          <nav className="nav-inner" aria-label="Main navigation">
            <Link
              to="/"
              className="nav-logo"
              aria-label="Cuddl home"
            >
              <img
                src="/Cuddl logo.jpeg"
                alt="Cuddl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span>Cuddl.</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="nav-links-wrap">
              <ul className="nav-links">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Shop Hoodies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-why"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Our Why
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/why-this-works"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Why This Works
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faqs"
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  >
                    FAQs
                  </NavLink>
                </li>
              </ul>

              <button
                type="button"
                className="nav-cta"
                id="nav-preorder-btn"
                onClick={() => openWaitlist()}
              >
                Preorder Now &#8212; &#x20B9;1,699 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
              </button>
            </div>

            {/* Mobile Header Actions (Preorder button + Hamburger Menu) */}
            <div className="nav-mobile-actions">
              <button
                type="button"
                className="nav-mobile-preorder-btn"
                id="mobile-nav-preorder-btn"
                onClick={() => openWaitlist()}
              >
                Preorder Now
              </button>

              <button
                type="button"
                className={`nav-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-menu-label">Menu</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="nav-mobile-dropdown">
            <div className="container">
              <ul className="nav-mobile-links">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
                  >
                    Shop Hoodies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/our-why"
                    className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
                  >
                    Our Why
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/why-this-works"
                    className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
                  >
                    Why This Works
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faqs"
                    className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
                  >
                    FAQs
                  </NavLink>
                </li>
              </ul>
              <div className="nav-mobile-cta-wrap">
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWaitlist();
                  }}
                >
                  Preorder Now &#8212; &#x20B9;1,699 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
                </button>
                <div className="nav-mobile-social">
                  <a
                    href="https://www.instagram.com/cuddlwear?stkn=NnZkN3BwMnZra2Ew"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-mobile-social-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
