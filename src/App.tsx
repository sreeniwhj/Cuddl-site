import React, { useState, useEffect, useRef } from 'react';
import { WaitlistModal } from './components/waitlist/WaitlistModal';

interface Colorway {
  id: string;
  name: string;
  bg: string;
  img: string;
  alt: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: 'swatch-grey',
    name: 'Ash Grey',
    bg: '#B0ADA8',
    img: '/Untitled Project - illustrationImage (4).png',
    alt: 'CuddlWear Signature Hoodie in Ash Grey'
  },
  {
    id: 'swatch-beige',
    name: 'Sand Beige',
    bg: '#F0EAD6',
    img: '/Untitled Project - illustrationimage (5).png',
    alt: 'CuddlWear Signature Hoodie in Sand Beige'
  },
  {
    id: 'swatch-green',
    name: 'Forest Green',
    bg: '#3D5A45',
    img: '/Untitled Project - illustrationimage (3).png',
    alt: 'CuddlWear Signature Hoodie in Forest Green'
  },
  {
    id: 'swatch-black',
    name: 'Midnight Black',
    bg: '#1E1E1E',
    img: '/Untitled Project - illustrationimage (6).png',
    alt: 'CuddlWear Signature Hoodie in Midnight Black'
  },
  {
    id: 'swatch-blue',
    name: 'Powder Blue',
    bg: '#A8C4D4',
    img: '/Untitled Project - illustrationimage (7).png',
    alt: 'CuddlWear Signature Hoodie in Powder Blue'
  }
];

export default function App() {
  const [activeColorway, setActiveColorway] = useState<Colorway>(COLORWAYS[0]);
  const [isFading, setIsFading] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const heroWrapRef = useRef<HTMLDivElement | null>(null);

  const openWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  const handleSelectColorway = (cw: Colorway) => {
    if (cw.id === activeColorway.id) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveColorway(cw);
      setIsFading(false);
    }, 320);
  };

  useEffect(() => {
    // Scroll reveal observer
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => revealObs.observe(el));

    // Nav border on scroll
    const handleScroll = () => {
      const nav = document.getElementById('nav');
      if (nav) {
        nav.style.borderBottomColor =
          window.scrollY > 80 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)';
      }

      // Parallax
      if (heroWrapRef.current && window.innerWidth > 900) {
        heroWrapRef.current.style.transform = `translateY(${window.scrollY * 0.05}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div className="topbar">
        <strong>Launching Soon</strong> &#8212; Pre-order waitlist open &middot; Free shipping across India
      </div>

      {/* Navigation */}
      <header className="nav" id="nav">
        <div className="container">
          <nav className="nav-inner" aria-label="Main navigation">
            <a
              href="#"
              className="nav-logo"
              aria-label="Cuddl home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="/Cuddl logo.jpeg"
                alt="Cuddl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span>Cuddl.</span>
            </a>
            <div className="nav-links-wrap">
              <ul className="nav-links">
                <li><a href="#product" onClick={(e) => handleSmoothScroll(e, '#product')}>Product</a></li>
                <li><a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a></li>
                <li><a href="#why-cuddl" onClick={(e) => handleSmoothScroll(e, '#why-cuddl')}>Why Cuddl</a></li>
              </ul>
              <button
                type="button"
                className="nav-cta"
                id="nav-preorder-btn"
                onClick={openWaitlist}
              >
                Join the Waitlist &#8212; &#x20B9;1,999
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home" aria-label="Hero">
        <div className="hero-content">
          <div className="reveal">
            <div className="hero-eyebrow">
              <span className="dot"></span>
              Premium Weighted Hoodie
            </div>
          </div>
          <h1 className="hero-headline reveal" style={{ transitionDelay: '0.08s' }}>
            Wear calm.<br />Stay <em>focused.</em>
          </h1>
          <p className="hero-subtext reveal" style={{ transitionDelay: '0.16s' }}>
            CuddlWear is the hoodie built around you. 400&nbsp;GSM plush fabric, built-in weighted pads, and a right-wrist squish ball for fidgeting and focus &#8212; engineered for students and professionals alike.
          </p>
          <div className="hero-actions reveal" style={{ transitionDelay: '0.24s' }}>
            <button
              type="button"
              className="btn-primary"
              id="hero-preorder-btn"
              onClick={openWaitlist}
            >
              Join the Waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.75 7H12.25M7 1.75L12.25 7L7 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#features"
              className="btn-ghost"
              id="hero-learn-btn"
              onClick={(e) => handleSmoothScroll(e, '#features')}
            >
              See how it works
            </a>
          </div>
          <div className="hero-stats reveal" style={{ transitionDelay: '0.32s' }}>
            <div>
              <div className="hero-stat-value">400 GSM</div>
              <div className="hero-stat-label">Plush fabric weight</div>
            </div>
            <div>
              <div className="hero-stat-value price-stat-value">
                <span>&#x20B9;1,999</span>
              </div>
              <div className="hero-stat-label">Price</div>
            </div>
            <div>
              <div className="hero-stat-value">5 tones</div>
              <div className="hero-stat-label">Colorways</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-bg-tex"></div>
          <div className="float-tag ftag-1">
            <div className="float-tag-icon">&#129368;</div>
            <div>
              <div className="float-tag-text">Weighted Pads</div>
              <div className="float-tag-sub">Built-in for calm</div>
            </div>
          </div>
          <div className="float-tag ftag-2">
            <div className="float-tag-icon">&#129782;</div>
            <div>
              <div className="float-tag-text">Squish Ball</div>
              <div className="float-tag-sub">Right-wrist opening</div>
            </div>
          </div>
          <div className="float-tag ftag-3">
            <div className="float-tag-icon">&#10024;</div>
            <div>
              <div className="float-tag-text">400 GSM</div>
              <div className="float-tag-sub">Plush &amp; premium</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          <span className="marquee-item">400 GSM Plush Fabric</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Right-Wrist Squish Ball</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Built-in Weighted Pads</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">&#x20B9;1,999</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Engineered for Focus</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Students &amp; Professionals</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">5 Curated Colorways</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">400 GSM Plush Fabric</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Right-Wrist Squish Ball</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Built-in Weighted Pads</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">&#x20B9;1,999</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Engineered for Focus</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">Students &amp; Professionals</span>
          <span className="marquee-item">&middot;</span>
          <span className="marquee-item">5 Curated Colorways</span>
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
              <h3 className="feature-title">Right-wrist squish ball</h3>
              <p className="feature-desc">
                A soft squish ball sits right in the wrist opening. Squeeze it during a lecture, a meeting, or a hard moment. Discreet, grounding, always there.
              </p>
            </div>
            <div className="feature-card reveal" style={{ transitionDelay: '0.08s' }}>
              <div className="feature-icon">&#129704;</div>
              <h3 className="feature-title">Built-in weighted pads</h3>
              <p className="feature-desc">
                Gentle weight distributed through the garment provides a sense of calm and groundedness &#8212; the same principle as a weighted blanket, made wearable.
              </p>
            </div>
            <div className="feature-card reveal" style={{ transitionDelay: '0.16s' }}>
              <div className="feature-icon">&#129525;</div>
              <h3 className="feature-title">400 GSM plush fabric</h3>
              <p className="feature-desc">
                Thick, soft, premium-feeling material that feels like a warm embrace. Heavy enough to feel substantial. Light enough to wear all day.
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

      {/* Spotlight Feature Section */}
      <section className="spotlight" aria-label="Product details">
        <div className="container">
          <div className="spotlight-grid">
            <div className="spotlight-visual reveal-left">
              <div className="spotlight-img-container">
                <img
                  src="/Untitled Project - illustrationimage (6).png"
                  alt="CuddlWear Midnight Black Hoodie showing the right-wrist squish ball opening detail"
                  loading="lazy"
                />
              </div>
              <div className="spotlight-caption">
                <div className="spotlight-caption-label">Wrist detail</div>
                <div className="spotlight-caption-text">The squish ball opening &#8212; subtle, intentional.</div>
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
                  <span className="spec-key">Fabric weight</span>
                  <span className="spec-val">~400 GSM</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Material</span>
                  <span className="spec-val">Soft, plush premium fabric</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Weighted pads</span>
                  <span className="spec-val">Built-in, distributed</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Squish ball</span>
                  <span className="spec-val">Right-wrist opening</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Price</span>
                  <span className="spec-val">&#x20B9;1,999</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Available colours</span>
                  <span className="spec-val">5 curated tones</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-primary"
                id="spotlight-cta-btn"
                onClick={openWaitlist}
              >
                Join the Waitlist
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1.75 7H12.25M7 1.75L12.25 7L7 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
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
                We kept noticing the same thing. People fidget. With sleeves, with rings, with pen caps. So we put a soft stress ball right in the cuff, where your hand already goes.
              </p>
              <p>
                The rest is simple: a lighter-weight hoodie, cut oversized, with thumbholes and no loud logos. Made well, priced fairly, built to be your default.
              </p>
              <p className="story-closing">
                One hoodie. Done right.
              </p>
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
              We&#8217;re taking pre-orders now for our first production run. Five colours. Free shipping across India.
            </p>
            <div className="cta-price-block reveal" style={{ transitionDelay: '0.22s' }}>
              <span className="cta-price-amount">&#x20B9;1,999</span>
              <span className="cta-price-label">Free delivery across India</span>
            </div>
            <div className="cta-actions reveal" style={{ transitionDelay: '0.28s' }}>
              <button
                type="button"
                className="btn-primary"
                id="main-preorder-btn"
                onClick={openWaitlist}
              >
                Join the Waitlist &#8212; &#x20B9;1,999
              </button>
              <a href="mailto:hello@cuddlwear.in" className="btn-ghost" id="contact-btn">
                Talk to us
              </a>
            </div>
            <p className="cta-note reveal" style={{ transitionDelay: '0.34s' }}>
              No payment required today &middot; Notify me when ready
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" aria-label="Site footer">
        <div className="container">
          <div className="footer-grid">
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
                Comfort designed for focus. 400 GSM weighted hoodie with right-wrist squish ball.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Navigation</div>
              <div className="footer-links">
                <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a>
                <a href="#product" onClick={(e) => handleSmoothScroll(e, '#product')}>Colorways</a>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a>
                <a href="#why-cuddl" onClick={(e) => handleSmoothScroll(e, '#why-cuddl')}>Why Cuddl</a>
                <button
                  type="button"
                  style={{ textAlign: 'left', font: 'inherit', color: 'var(--text-2)', cursor: 'pointer', padding: 0 }}
                  onClick={openWaitlist}
                >
                  Join the Waitlist
                </button>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Product</div>
              <div className="footer-links">
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>400 GSM Fabric</a>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Weighted Pads</a>
                <a href="#features" onClick={(e) => handleSmoothScroll(e, '#features')}>Wrist Squish Ball</a>
                <button
                  type="button"
                  style={{ textAlign: 'left', font: 'inherit', color: 'var(--text-2)', cursor: 'pointer', padding: 0 }}
                  onClick={openWaitlist}
                >
                  Pricing (&#x20B9;1,999)
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">&copy; {new Date().getFullYear()} CuddlWear. All rights reserved.</div>
            <div className="footer-social">
              <a href="mailto:hello@cuddlwear.in">hello@cuddlwear.in</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        availableColorways={COLORWAYS}
        initialColorway={activeColorway.name}
      />
    </>
  );
}
