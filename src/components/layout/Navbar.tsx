import type { FC } from "react";
import { Container, Button } from "../ui";

export const Navbar: FC = () => {
  return (
    <header className="cw-navbar">
      <Container size="xl">
        <div className="cw-navbar__inner">
          
          {/* Brand Logo */}
          <a href="#" className="cw-navbar__brand">
            <img
              src="/brand/cuddl-logo.png"
              alt="Cuddl Logo"
              className="cw-brand-logo"
            />
          </a>

          {/* Navigation Links */}
          <ul className="cw-navbar__links">
            <li>
              <a href="#intro" className="cw-navbar__link">
                Introduction
              </a>
            </li>
            <li>
              <a href="#features" className="cw-navbar__link">
                Features
              </a>
            </li>
            <li>
              <a href="#lifestyle" className="cw-navbar__link">
                Lifestyle
              </a>
            </li>
            <li>
              <a href="#details" className="cw-navbar__link">
                Details
              </a>
            </li>
          </ul>

          {/* Actions */}
          <div className="cw-navbar__actions">
            <Button as="a" href="#details" variant="primary" size="sm">
              Explore CuddlWear
            </Button>
          </div>

        </div>
      </Container>
    </header>
  );
};

export default Navbar;
