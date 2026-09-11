import { Link } from 'react-router-dom';
import { useWaitlist } from '../context/WaitlistContext';

export function OurWhyPage() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="our-why-page">
      {/* Editorial Page Hero */}
      <section className="editorial-hero">
        <div className="container">
          <div className="editorial-hero-inner">
            <div className="page-eyebrow">
              <span className="dot"></span>
              Our Philosophy
            </div>
            <h1 className="editorial-title">
              We made Cuddl for the days when the world feels <em>a little too loud.</em>
            </h1>
            <p className="editorial-lead">
              Every detail in CuddlWear was born from an everyday observation: we all have moments when we need grounding, but our clothes weren&apos;t designed to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Article */}
      <section className="editorial-content-section">
        <div className="container">
          <div className="story-container">
            <div className="story-lead-block">
              <p>
                We kept noticing the exact same thing across college libraries, late-night study sessions, and corporate desks. People fidget. They roll their cuffs, twist rings, click pen caps, or pick at loose threads. It isn&apos;t a distraction — it&apos;s a natural human impulse to self-regulate and find focus.
              </p>
            </div>

            <div className="story-pullquote">
              &ldquo;What if comfort wasn&apos;t just passive warmth, but an active tool you can wear?&rdquo;
            </div>

            <div className="story-narrative-text">
              <h2>One Simple Idea: Comfort in the Cuff</h2>
              <p>
                So we designed a removable stress ball right into the wrist cuff, easily positioned on either side for the comfort you prefer. When tension builds during a difficult conversation, a long lecture, or an overstimulating commute, relief is already there. No unzipping a bag, no noisy toys on a desk, and no awkward stares.
              </p>

              <h2>Designed for Everyday Overwhelm</h2>
              <p>
                This hoodie is made for college students and young professionals who fidget often, get overstimulated easily, or feel touched out and tired more often than they&apos;d like to admit. If modern life feels heavy and you want a subtle tool that helps you stay calm and centered, CuddlWear is built for you.
              </p>

              <div className="story-values-grid">
                <div className="value-card">
                  <div className="value-num">01</div>
                  <h3>No Loud Logos</h3>
                  <p>Clean, minimalist aesthetic that works anywhere from campus to office to sofa.</p>
                </div>
                <div className="value-card">
                  <div className="value-num">02</div>
                  <h3>Grounding Sensory Comfort</h3>
                  <p>Crafted from buttery soft fabric for a gentle, comfortable feel, featuring a removable stress ball.</p>
                </div>
                <div className="value-card">
                  <div className="value-num">03</div>
                  <h3>Honest Pricing</h3>
                  <p>
                    <span className="price-sale-group" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <strong>&#x20B9;1,699</strong>
                      <s className="price-was">&#x20B9;2,799</s>
                      <span className="price-badge">39% off</span>
                    </span>{' '}
                    — quality made accessible.
                  </p>
                </div>
              </div>

              <h2>Crafted in Bengaluru</h2>
              <p>
                Our products are manufactured in Bengaluru, India. We partner directly with skilled garment technicians who understand heavy knit fabrics and specialized pocket construction. Each hoodie undergoes rigorous stitching checks to ensure seams stay clean and balanced and the wrist tool remains durable through countless washes.
              </p>

              <div className="story-signature-block">
                <p className="signature-punchline">One hoodie. Done right.</p>
                <p className="signature-team">&#8212; The CuddlWear Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow">First Batch Reservation</div>
            <h2 className="cta-title">
              Experience the comfort<br /><em>for yourself.</em>
            </h2>
            <p className="cta-subtitle">
              Pre-orders are now open for our initial release across four timeless shades.
            </p>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => openWaitlist()}
              >
                Preorder Now &#8212; &#x20B9;1,699 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
              </button>
              <Link to="/shop" className="btn-ghost">
                View the 4 colours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
