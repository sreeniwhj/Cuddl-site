import { Link } from 'react-router-dom';
import { useWaitlist } from '../context/WaitlistContext';

export function WhyThisWorksPage() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="why-works-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-eyebrow">
              <span className="dot"></span>
              Sensory Architecture
            </div>
            <h1 className="page-title">
              Designed to help your nervous system <em>settle.</em>
            </h1>
            <p className="page-lead">
              CuddlWear combines tactile sensory stimulation, soft grounding drape, and plush thermal comfort into a single everyday silhouette.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Blocks Section */}
      <section className="why-blocks-section">
        <div className="container">
          {/* Block 1 */}
          <div className="why-block-card reveal">
            <div className="why-block-grid">
              <div className="why-block-content">
                <div className="why-block-num">01 / Fabric Architecture</div>
                <h2 className="why-block-title">
                  A Hug Your Brain Actually Believes.
                </h2>
                <p className="why-block-body">
                  Plush, breathable fabric wraps around you like a calming hug. Your body gets the signal to relax.
                </p>
                <p className="why-block-sub">
                  Crafted from buttery soft fabric for a gentle, comfortable feel, creating a soothing cocoon that reduces sensory sensitivity to draft, harsh air conditioning, and unpredictable ambient stimuli.
                </p>
                <div className="why-block-pills">
                  <span className="pill-tag">Buttery Soft Fabric</span>
                  <span className="pill-tag">Thermal Regulation</span>
                  <span className="pill-tag">Sensory Cocoon</span>
                </div>
              </div>
              <div className="why-block-visual">
                <div className="why-visual-frame">
                  <img
                    src="/Untitled Project - illustrationimage (5).png"
                    alt="CuddlWear plush fabric and hood structure"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div className="why-block-card reveal" style={{ marginTop: '48px' }}>
            <div className="why-block-grid reverse">
              <div className="why-block-content">
                <div className="why-block-num">02 / This Grounds You, Fast</div>
                <h2 className="why-block-title">
                  This Grounds You, Fast.
                </h2>
                <p className="why-block-body">
                  A soft, breathable cotton-polyester fabric designed for a comfortable, grounding feel.
                </p>
                <p className="why-block-sub">
                  The reassuring physical presence and gentle drape of our buttery soft fabric help bring you back down, easing restlessness, improving focus, and helping you transition smoothly between tasks.
                </p>
                <div className="why-block-pills">
                  <span className="pill-tag">Grounding Drape</span>
                  <span className="pill-tag">Sensory Calming</span>
                  <span className="pill-tag">Restlessness Relief</span>
                </div>
              </div>
              <div className="why-block-visual">
                <div className="why-visual-frame">
                  <img
                    src="/Untitled Project - illustrationImage (4).png"
                    alt="CuddlWear Signature Focus Hoodie silhouette"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Block 3 */}
          <div className="why-block-card reveal" style={{ marginTop: '48px' }}>
            <div className="why-block-grid">
              <div className="why-block-content">
                <div className="why-block-num">03 / Discreet Tactile Input</div>
                <h2 className="why-block-title">
                  Wear Your Coping Tool.
                </h2>
                <p className="why-block-body">
                  The relief is built into your sleeves, invisible to everyone else, always there when you need it.
                </p>
                <p className="why-block-sub">
                  Instead of carrying conspicuous stress balls or fidget toys that click and distract others in quiet rooms, our removable stress ball can be positioned on either side of your wrist so you can choose the placement that feels right for you.
                </p>
                <div className="why-block-pills">
                  <span className="pill-tag">Removable Stress Ball</span>
                  <span className="pill-tag">Dual Wrist Placement</span>
                  <span className="pill-tag">100% Discreet</span>
                </div>
              </div>
              <div className="why-block-visual">
                <div className="why-visual-frame">
                  <img
                    src="/Untitled Project - illustrationimage (6).png"
                    alt="CuddlWear sleeve removable stress ball opening"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fidget Kit Callout Banner */}
      <section className="why-fidget-banner">
        <div className="container">
          <div className="fidget-callout-box reveal">
            <div className="callout-icon">&#129782;</div>
            <h2>Built For Your Existing Habits</h2>
            <p>
              If you already reach for fidget toys or stress balls, you probably know what helps you. CuddlWear builds that same sense of relief directly into something you can wear throughout the day.
            </p>
            <div className="callout-specs">
              <div className="cs-item">
                <strong>No Battery / No Noise:</strong> 100% analog sensory relief.
              </div>
              <div className="cs-item">
                <strong>Inclusive Design:</strong> Made for all genders and body types.
              </div>
              <div className="cs-item">
                <strong>Everyday Staple:</strong> Looks just like a minimalist designer hoodie.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Medical Disclaimer */}
      <section className="disclaimer-section">
        <div className="container">
          <div className="disclaimer-box">
            <p>
              <strong>Please Note:</strong> CuddlWear is an everyday lifestyle garment designed for physical comfort, relaxation, and self-soothing sensory feedback. It is not a medical device and is not intended to diagnose, treat, cure, or replace professional healthcare or mental health treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Pre-order Waitlist CTA */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow">Try CuddlWear First</div>
            <h2 className="cta-title">
              Ready to feel<br /><em>grounded?</em>
            </h2>
            <p className="cta-subtitle">
              Pre-order your hoodie today.{' '}
              <span className="price-sale-group" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                <strong>&#x20B9;1,699</strong>
                <s className="price-was">&#x20B9;2,799</s>
                <span className="price-badge">39% off</span>
              </span>
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
                Shop 4 Colours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
