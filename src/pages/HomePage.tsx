import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { COLORWAYS, type Colorway } from '../data/colorways';
import { useWaitlist } from '../context/WaitlistContext';

export function HomePage() {
  const { openWaitlist } = useWaitlist();
  const [activeColorway, setActiveColorway] = useState<Colorway>(COLORWAYS[0]);
  const [isFading, setIsFading] = useState(false);
  const heroWrapRef = useRef<HTMLDivElement | null>(null);

  const handleSelectColorway = (cw: Colorway) => {
    if (cw.id === activeColorway.id) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveColorway(cw);
      setIsFading(false);
    }, 300);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home" aria-label="Hero">
        <div className="hero-content">
          <div className="reveal">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              Sensory Grounding Hoodie
            </div>
          </div>
          <h1 className="hero-headline reveal" style={{ transitionDelay: '0.08s' }}>
            A hug you<br />can <em>wear.</em>
          </h1>
          <p className="hero-subtext reveal" style={{ transitionDelay: '0.16s' }}>
            A stress ball built right into the cuff. CuddlWear is the hoodie built around you. Crafted from buttery soft fabric with a removable stress ball and silent fidgeting relief &#8212; engineered for students and professionals alike.
          </p>
          <div className="hero-actions reveal" style={{ transitionDelay: '0.24s' }}>
            <button
              type="button"
              className="btn-primary"
              id="hero-preorder-btn"
              onClick={() => openWaitlist(activeColorway.name)}
            >
              Preorder Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.75 7H12.25M7 1.75L12.25 7L7 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <Link
              to="/shop"
              className="btn-ghost"
              id="hero-shop-btn"
            >
              Explore all 4 colours
            </Link>
          </div>
          <div className="hero-stats reveal" style={{ transitionDelay: '0.32s' }}>
            <div>
              <div className="hero-stat-value">Buttery Soft</div>
              <div className="hero-stat-label">Plush fabric feel</div>
            </div>
            <div>
              <div className="hero-stat-value price-stat-value">
                <span>&#x20B9;1,999</span>
                <span className="price-badge">29% off</span>
              </div>
              <div className="hero-stat-label">Launch price</div>
            </div>
            <div>
              <div className="hero-stat-value">4 tones</div>
              <div className="hero-stat-label">Colorways</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-bg-tex"></div>
          <div className="float-tag ftag-1">
            <div className="float-tag-icon">&#129525;</div>
            <div>
              <div className="float-tag-text">Grounding Feel</div>
              <div className="float-tag-sub">Soft &amp; breathable</div>
            </div>
          </div>
          <div className="float-tag ftag-2">
            <div className="float-tag-icon">&#129782;</div>
            <div>
              <div className="float-tag-text">Removable Ball</div>
              <div className="float-tag-sub">Either wrist comfort</div>
            </div>
          </div>
          <div className="float-tag ftag-3">
            <div className="float-tag-icon">&#10024;</div>
            <div>
              <div className="float-tag-text">Buttery Soft</div>
              <div className="float-tag-sub">Plush comfort</div>
            </div>
          </div>
          <div className="hero-hoodie-wrap" ref={heroWrapRef}>
            <div className="hero-img-container">
              <img
                id="hero-product-img"
                src={activeColorway.img}
                alt={activeColorway.alt}
                width="520"
                height="520"
                className={isFading ? 'fading' : ''}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Colorway Selector Strip */}
      <section className="colorway-section" id="product" aria-label="Colorway selector">
        <div className="container">
          <div className="colorway-inner">
            <div className="colorway-label-row">
              <span className="label">Pick your colour</span>
              <div className="colorway-name-display">
                Currently: <strong id="active-colorway-name">{activeColorway.name}</strong>
              </div>
            </div>
            <div className="colorway-right-wrap">
              <div className="colorway-price-display">
                <span className="price-main">&#x20B9;1,999</span>
                <span className="price-was">&#x20B9;2,799</span>
                <span className="price-badge">29% off</span>
              </div>
              <div className="colorway-pill-wrap" role="group" aria-label="Hoodie colorway selection">
                {COLORWAYS.map((cw) => (
                  <button
                    key={cw.id}
                    id={cw.id}
                    className={`color-swatch ${activeColorway.id === cw.id ? 'active' : ''}`}
                    style={{ background: cw.bg }}
                    onClick={() => handleSelectColorway(cw)}
                    aria-label={cw.name}
                    title={cw.name}
                  />
                ))}
              </div>
              <Link to={`/shop/${activeColorway.slug}`} className="view-details-inline-link">
                View hoodie details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-item">Buttery Soft Fabric</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Removable Stress Ball</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Grounding Construction</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">&#x20B9;1,999</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Engineered for Focus</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Students &amp; Professionals</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">4 Curated Colorways</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Buttery Soft Fabric</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Removable Stress Ball</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Grounding Construction</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">&#x20B9;1,999</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Engineered for Focus</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Students &amp; Professionals</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">4 Curated Colorways</span>
          <span className="marquee-item">&middot;</span>
        </div>
      </div>

      {/* Features Grid */}
      <section className="features-section" id="features" aria-labelledby="features-title">
        <div className="container">
          <div className="features-head reveal">
            <div className="section-label">Design &amp; Architecture</div>
            <h2 className="section-title" id="features-title">
              Every detail has a <em>reason.</em>
            </h2>
            <p className="section-sub">
              We did not add features to make a novelty hoodie. Every element exists to solve a real moment in your day.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal" style={{ transitionDelay: '0s' }}>
              <div className="feature-icon">&#129782;</div>
              <h3 className="feature-title">Removable Stress Ball</h3>
              <p className="feature-desc">
                Move it to either side of your wrist for the comfort you prefer.
              </p>
            </div>
            <div className="feature-card reveal" style={{ transitionDelay: '0.08s' }}>
              <div className="feature-icon">&#129525;</div>
              <h3 className="feature-title">Grounding fabric construction</h3>
              <p className="feature-desc">
                A soft, breathable cotton-polyester fabric designed for a comfortable, grounding feel &#8212; giving you a calming, reassuring drape throughout the day.
              </p>
            </div>
            <div className="feature-card reveal" style={{ transitionDelay: '0.16s' }}>
              <div className="feature-icon">&#10024;</div>
              <h3 className="feature-title">Buttery Soft Fabric</h3>
              <p className="feature-desc">
                Crafted for a soft, comfortable feel against your skin.
              </p>
            </div>
            <div className="feature-card reveal" style={{ transitionDelay: '0.24s' }}>
              <div className="feature-icon">&#127891;</div>
              <h3 className="feature-title">Built for real life</h3>
              <p className="feature-desc">
                Designed for students aged 18&#8211;25 and professionals. Looks like a normal hoodie. Feels like a focus tool you never want to take off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="audience-section" aria-labelledby="audience-title">
        <div className="container">
          <div className="audience-card reveal">
            <div className="audience-badge">Who It&apos;s For</div>
            <h2 className="audience-title" id="audience-title">
              If any of that sounds familiar,<br /><em>this hoodie may be for you.</em>
            </h2>
            <p className="audience-lead">
              This hoodie is made for college students and young professionals who fidget often, get overstimulated easily, or feel touched out and tired more often than they&apos;d like to admit.
            </p>
            <div className="audience-tags-grid">
              <div className="audience-tag-item">
                <span className="audience-check">&#10003;</span>
                <span>Restless hands during long lectures or meetings</span>
              </div>
              <div className="audience-tag-item">
                <span className="audience-check">&#10003;</span>
                <span>Sensory overload in crowded cafes or workspaces</span>
              </div>
              <div className="audience-tag-item">
                <span className="audience-check">&#10003;</span>
                <span>Seeking discreet, wearable calming support</span>
              </div>
              <div className="audience-tag-item">
                <span className="audience-check">&#10003;</span>
                <span>Values minimalist, premium everyday fashion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fidget Kit Section */}
      <section className="fidget-kit-section" aria-labelledby="fidget-title">
        <div className="container">
          <div className="fidget-grid">
            <div className="fidget-content reveal-left">
              <div className="section-label">Sensory Integration</div>
              <h2 className="section-title" id="fidget-title">
                Your everyday tools,<br /><em>built right in.</em>
              </h2>
              <p className="section-sub" style={{ marginBottom: '20px' }}>
                If you already reach for fidget toys or stress balls, you probably know what helps you. CuddlWear builds that same sense of relief directly into something you can wear throughout the day.
              </p>
              <div className="fidget-features-list">
                <div className="fidget-feature-item">
                  <div className="fidget-num">01</div>
                  <div>
                    <h4>Integrated Wrist Pocket</h4>
                    <p>Designed at the exact natural angle of your arm rest, accessible without drawing any attention.</p>
                  </div>
                </div>
                <div className="fidget-feature-item">
                  <div className="fidget-num">02</div>
                  <div>
                    <h4>Dual-Wrist Placement</h4>
                    <p>Position the removable stress ball on whichever side feels most natural for your posture.</p>
                  </div>
                </div>
                <div className="fidget-feature-item">
                  <div className="fidget-num">03</div>
                  <div>
                    <h4>Zero Clanking or Noise</h4>
                    <p>Completely silent tactile stress-relief materials so you can self-regulate in silent libraries or meeting rooms.</p>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '28px' }}>
                <Link to="/why-this-works" className="btn-ghost">
                  Read the sensory architecture &rarr;
                </Link>
              </div>
            </div>
            <div className="fidget-visual reveal-right">
              <div className="fidget-visual-inner">
                <img
                  src="/Untitled Project - illustrationimage (7).png"
                  alt="CuddlWear sensory hoodie details"
                  loading="lazy"
                />
                <div className="fidget-caption-box">
                  <span className="caption-pill">Discreet Comfort</span>
                  <p>Removable stress ball that can be positioned on either side of your wrist.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight Feature Section */}
      <section className="spotlight" aria-label="Product details">
        <div className="container">
          <div className="spotlight-grid">
            <div className="spotlight-visual reveal-left">
              <div className="spotlight-img-container">
                <img
                  src="/Untitled Project - illustrationimage (6).png"
                  alt="CuddlWear Onyx Hoodie showing the removable stress ball detail"
                  loading="lazy"
                />
              </div>
              <div className="spotlight-caption">
                <div className="spotlight-caption-label">Wrist detail</div>
                <div className="spotlight-caption-text">The removable stress ball &#8212; subtle, intentional.</div>
              </div>
            </div>
            <div className="spotlight-content reveal-right">
              <div className="spotlight-eyebrow">The Signature Hoodie</div>
              <h2 className="spotlight-title">
                Comfort that<br /><em>works for you.</em>
              </h2>
              <p className="spotlight-desc">
                CuddlWear started from a simple question: what if comfort could be an active tool, not just a passive feeling? The result is a hoodie that helps you stay present, regulate stress, and do your best work &#8212; without anyone knowing.
              </p>
              <div className="spec-list" aria-label="Product specifications">
                <div className="spec-row">
                  <span className="spec-key">Fabric feel</span>
                  <span className="spec-val">Buttery Soft Fabric</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Material</span>
                  <span className="spec-val">Soft, breathable cotton-polyester</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Grounding feel</span>
                  <span className="spec-val">Reassuring, hug-like drape</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Stress ball</span>
                  <span className="spec-val">Removable &middot; Either side</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Price</span>
                  <span className="spec-val">
                    <span className="price-sale-group">
                      <strong>&#x20B9;1,999</strong>
                      <s className="price-was">&#x20B9;2,799</s>
                      <span className="price-badge">29% off</span>
                    </span>
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Available colours</span>
                  <span className="spec-val">4 curated tones</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  id="spotlight-cta-btn"
                  onClick={() => openWaitlist()}
                >
                  Preorder Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1.75 7H12.25M7 1.75L12.25 7L7 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <Link to="/shop" className="btn-ghost">
                  View all 4 hoodies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why we made Cuddl. Section */}
      <section className="why-section" id="why-cuddl" aria-labelledby="why-title">
        <div className="container">
          <div className="story-card reveal">
            <h2 className="story-title" id="why-title">
              Why we made Cuddl.
            </h2>
            <div className="story-body">
              <p>
                We kept noticing the same thing. People fidget. With sleeves, with rings, with pen caps. So we built a removable stress ball right into the cuff, positionable on either wrist for your comfort.
              </p>
              <p>
                The rest is simple: a relaxed hoodie, cut oversized, with thumbholes and no loud logos. Made well, priced fairly, built to be your default.
              </p>
              <p className="story-closing">
                One hoodie. Done right.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/our-why" className="story-link">
                  Read our full story &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-order Waitlist CTA */}
      <section className="cta-section" id="preorder" aria-labelledby="cta-title">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow reveal">Limited first run</div>
            <h2 className="cta-title reveal" style={{ transitionDelay: '0.08s' }} id="cta-title">
              Be first to<br /><em>wear the calm.</em>
            </h2>
            <p className="cta-subtitle reveal" style={{ transitionDelay: '0.16s' }}>
              We&apos;re taking pre-orders now for our first production run across four curated colours.
            </p>
            <div className="cta-price-block reveal" style={{ transitionDelay: '0.22s' }}>
              <span className="cta-price-amount">&#x20B9;1,999</span>
              <span className="price-was" style={{ fontSize: '1rem' }}>&#x20B9;2,799</span>
              <span className="price-badge">29% off</span>
            </div>
            <div className="cta-actions reveal" style={{ transitionDelay: '0.28s' }}>
              <button
                type="button"
                className="btn-primary"
                id="main-preorder-btn"
                onClick={() => openWaitlist()}
              >
                Preorder Now &#8212; &#x20B9;1,999 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
              </button>
              <a href="mailto:hello@cuddlwear.in" className="btn-ghost" id="contact-btn">
                Talk to us
              </a>
            </div>
            <p className="cta-note reveal" style={{ transitionDelay: '0.34s' }}>
              Limited first batch release &middot; Pre-orders now open
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
