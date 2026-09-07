import type { FC } from "react";
import { Container, Button } from "../ui";

export const HeroSection: FC = () => {
  return (
    <section id="hero" className="cw-hero">
      <Container size="xl">
        <div className="cw-hero__grid">
          
          {/* Left Hero Content */}
          <div className="cw-hero__content">
            <span className="cw-eyebrow">Everyday Weighted Comfort</span>

            <h1 className="cw-hero__headline">
              The hoodie designed to ground your day.
            </h1>

            <p className="cw-hero__subheadline">
              Crafted with soft, plush ~400 GSM material, built-in weighted pads, and a subtle right-wrist squish ball for calm focus during work, study, and downtime.
            </p>

            {/* CTAs */}
            <div className="cw-hero__cta-group">
              <Button as="a" href="#details" variant="primary" size="lg">
                Explore CuddlWear
              </Button>
              <Button as="a" href="#features" variant="outline" size="lg">
                Discover Features
              </Button>
            </div>

            {/* Confirmed Metric Highlights */}
            <div className="cw-hero__pills">
              <div className="cw-hero__pill-item">
                <span className="cw-hero__pill-value">~400 GSM</span>
                <span className="cw-hero__pill-label">Plush Fabric</span>
              </div>
              <div className="cw-hero__pill-item">
                <span className="cw-hero__pill-value">Weighted</span>
                <span className="cw-hero__pill-label">Built-in Pads</span>
              </div>
              <div className="cw-hero__pill-item">
                <span className="cw-hero__pill-value">~₹1,999</span>
                <span className="cw-hero__pill-label">Target Price</span>
              </div>
            </div>
          </div>

          {/* Right Hero Product Visual Stage */}
          <div className="cw-hero__visual">
            <div className="cw-hero__image-stage">
              <img
                src="/product/hoodie-hero.jpeg"
                alt="CuddlWear Premium Weighted Hoodie"
                className="cw-hero__image"
                loading="eager"
              />
              <div className="cw-hero__tag">
                Right-Wrist Squish Ball Inside
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
