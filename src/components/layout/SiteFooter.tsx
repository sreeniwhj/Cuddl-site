import { Link } from 'react-router-dom';
import { useWaitlist } from '../../context/WaitlistContext';

export function SiteFooter() {
  const { openWaitlist } = useWaitlist();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/Cuddl logo.jpeg"
                alt="Cuddl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span>Cuddl.</span>
            </div>
            <p className="footer-tagline">
              Comfort designed for focus. Sensory focus hoodie crafted from buttery soft fabric with removable stress ball.
            </p>
            <div className="footer-origin-badge">
              <span className="origin-dot"></span>
              Manufactured in Bengaluru, India.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <div className="footer-col-title">Pages</div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop Hoodies</Link>
              <Link to="/our-why">Our Why</Link>
              <Link to="/why-this-works">Why This Works</Link>
              <Link to="/faqs">FAQs</Link>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => openWaitlist()}
              >
                Preorder Now
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="footer-col-title">The Hoodie</div>
            <div className="footer-links">
              <Link to="/why-this-works">Buttery Soft Fabric</Link>
              <Link to="/why-this-works">Grounding Construction</Link>
              <Link to="/why-this-works">Removable Stress Ball</Link>
              <Link to="/shop">4 Curated Colorways</Link>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => openWaitlist()}
              >
                Price: &#x20B9;1,699 <s style={{ opacity: 0.55, fontSize: '0.85em' }}>&#x20B9;2,799</s> &mdash; 39% off
              </button>
            </div>
          </div>

          {/* Shipping & Support */}
          <div>
            <div className="footer-col-title">Shipping &amp; Support</div>
            <div className="footer-shipping-note">
              We work quickly to ship your order as soon as possible. Once your order ships, you&apos;ll receive an email with further information. Delivery times vary depending on your location.
            </div>
            <div className="footer-links" style={{ marginTop: '16px' }}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=permissionwear3@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                permissionwear3@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} CuddlWear. All rights reserved. Made in Bengaluru, India.
          </div>
          <div className="footer-social">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=permissionwear3@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              permissionwear3@gmail.com
            </a>
            <a
              href="https://www.instagram.com/cuddlwear?stkn=NnZkN3BwMnZra2Ew"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
