import type { FC } from "react";
import { Container } from "../ui";

export const Footer: FC = () => {
  return (
    <footer className="cw-footer">
      <Container size="xl">
        <div className="cw-footer__grid">
          
          {/* Brand Column */}
          <div className="cw-footer__brand-col">
            <img
              src="/brand/cuddl-logo.png"
              alt="Cuddl Logo"
              className="cw-brand-logo"
            />
            <p className="cw-footer__tagline">
              Premium weighted hoodie designed for comfort, relaxation, and focused everyday use.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="cw-footer__col-title">Navigation</h4>
            <ul className="cw-footer__list">
              <li><a href="#hero" className="cw-footer__link">Overview</a></li>
              <li><a href="#intro" className="cw-footer__link">Philosophy</a></li>
              <li><a href="#features" className="cw-footer__link">Features</a></li>
              <li><a href="#lifestyle" className="cw-footer__link">Lifestyle</a></li>
              <li><a href="#details" className="cw-footer__link">Product Details</a></li>
            </ul>
          </div>

          {/* Contact Placeholder */}
          <div>
            <h4 className="cw-footer__col-title">Contact</h4>
            <ul className="cw-footer__list">
              <li><a href="mailto:hello@cuddlwear.com" className="cw-footer__link">hello@cuddlwear.com</a></li>
              <li><span className="cw-footer__link">Bengaluru, India</span></li>
              <li><span className="cw-footer__link">Support: Mon–Fri, 10am–6pm</span></li>
            </ul>
          </div>

          {/* Policies Placeholder */}
          <div>
            <h4 className="cw-footer__col-title">Policies</h4>
            <ul className="cw-footer__list">
              <li><span className="cw-footer__link">Privacy Policy (Coming Soon)</span></li>
              <li><span className="cw-footer__link">Terms of Service</span></li>
              <li><span className="cw-footer__link">Shipping &amp; Returns</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="cw-footer__bottom">
          <span>&copy; {new Date().getFullYear()} CuddlWear. All rights reserved.</span>
          <span>Target Price: Approximately ₹1,999</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
