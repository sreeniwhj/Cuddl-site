import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { COLORWAYS, getColorwayBySlug } from '../data/colorways';
import { useWaitlist } from '../context/WaitlistContext';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openWaitlist } = useWaitlist();
  const [activeTab, setActiveTab] = useState<'features' | 'care' | 'sizing' | 'shipping'>('features');

  if (!slug) {
    return <Navigate to="/shop" replace />;
  }

  const product = getColorwayBySlug(slug);

  if (!product) {
    return (
      <div className="product-not-found container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', marginBottom: '16px' }}>Colorway Not Found</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: '24px' }}>The shade you are looking for does not exist or has been retired.</p>
        <Link to="/shop" className="btn-primary">
          View All Hoodies
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Breadcrumbs */}
      <div className="pdp-breadcrumbs-wrap">
        <div className="container">
          <nav className="pdp-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="pdp-crumb-sep">/</span>
            <Link to="/shop">Shop</Link>
            <span className="pdp-crumb-sep">/</span>
            <span className="pdp-crumb-current">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Layout */}
      <section className="pdp-main-section">
        <div className="container">
          <div className="pdp-grid">
            {/* Left: Product Visual */}
            <div className="pdp-visual">
              <div className="pdp-img-wrap">
                <img
                  src={product.img}
                  alt={product.alt}
                  className="pdp-img"
                />
                <div className="pdp-img-badge">
                  <span className="badge-swatch" style={{ background: product.bg }}></span>
                  <span>{product.name}</span>
                </div>
              </div>
              <div className="pdp-micro-features">
                <div className="micro-feat">
                  <span className="feat-icon">&#129525;</span>
                  <span>Grounding feel</span>
                </div>
                <div className="micro-feat">
                  <span className="feat-icon">&#129782;</span>
                  <span>Wrist squish</span>
                </div>
                <div className="micro-feat">
                  <span className="feat-icon">&#10024;</span>
                  <span>450 GSM plush</span>
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="pdp-info">
              <div className="pdp-eyebrow">Signature Focus Hoodie</div>
              <h1 className="pdp-title">{product.name}</h1>
              <p className="pdp-tagline">{product.tagline}</p>

              <div className="pdp-price-row">
                <div className="pdp-price-group">
                  <span className="pdp-price">&#x20B9;1,999</span>
                  <span className="price-was">&#x20B9;2,799</span>
                  <span className="price-badge">29% off</span>
                </div>
                <span className="pdp-price-tax">All taxes included &middot; Free shipping</span>
              </div>

              <div className="pdp-swatches-block">
                <div className="pdp-swatch-label">
                  Colourway: <strong>{product.name}</strong>
                </div>
                <div className="pdp-swatches-list">
                  {COLORWAYS.map((cw) => (
                    <Link
                      key={cw.id}
                      to={`/shop/${cw.slug}`}
                      className={`pdp-swatch-link ${cw.slug === product.slug ? 'active' : ''}`}
                      style={{ background: cw.bg }}
                      title={cw.name}
                      aria-label={`Select ${cw.name}`}
                    >
                      {cw.slug === product.slug && <span className="swatch-check">&#10003;</span>}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pdp-description">
                <p>{product.description}</p>
                <p>
                  Engineered with 450 GSM plush fleece, deep ergonomic pockets, a soft cotton-polyester construction, and an integrated right-wrist squish ball opening designed to give your hands relief without drawing attention.
                </p>
              </div>

              {/* Waitlist CTA Area */}
              <div className="pdp-actions-wrap">
                <button
                  type="button"
                  className="btn-primary pdp-cta-btn"
                  onClick={() => openWaitlist(product.name)}
                >
                  Join the Waitlist &#8212; &#x20B9;1,999 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1.75 7H12.25M7 1.75L12.25 7L7 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="pdp-cta-subtext">
                  <span>&#10003; No payment today</span>
                  <span>&#10003; Preselects {product.name}</span>
                  <span>&#10003; Free delivery across India</span>
                </div>
              </div>

              {/* Local Manufacturing & Shipping Note */}
              <div className="pdp-origin-box">
                <div className="origin-row">
                  <span className="origin-icon">&#127981;</span>
                  <div>
                    <strong>Crafted in Bengaluru, India</strong>
                    <p>Locally designed and produced with high-grade plush materials.</p>
                  </div>
                </div>
                <div className="origin-row" style={{ marginTop: '12px' }}>
                  <span className="origin-icon">&#128666;</span>
                  <div>
                    <strong>Shipping Timeline</strong>
                    <p>We work quickly to ship your order as soon as possible. Once your order ships, you&apos;ll receive an email with tracking details.</p>
                  </div>
                </div>
              </div>

              {/* Tabbed Specs Accordion */}
              <div className="pdp-tabs">
                <div className="pdp-tab-nav" role="tablist">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'features'}
                    className={`pdp-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                    onClick={() => setActiveTab('features')}
                  >
                    Features
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'care'}
                    className={`pdp-tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                    onClick={() => setActiveTab('care')}
                  >
                    Material &amp; Care
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'sizing'}
                    className={`pdp-tab-btn ${activeTab === 'sizing' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sizing')}
                  >
                    Sizing &amp; Fit
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'shipping'}
                    className={`pdp-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                    onClick={() => setActiveTab('shipping')}
                  >
                    Shipping
                  </button>
                </div>

                <div className="pdp-tab-panel">
                  {activeTab === 'features' && (
                    <ul className="pdp-specs-list">
                      <li><strong>450 GSM Plush Fleece:</strong> Dense, soft, high-warmth construction that holds shape.</li>
                      <li><strong>Grounding Construction:</strong> Soft, breathable cotton-polyester fabric designed for a comfortable, hug-like grounding feel.</li>
                      <li><strong>Right-Wrist Squish Ball:</strong> Discrete opening at the cuff for silent fidgeting and stress relief.</li>
                      <li><strong>Double-Lined Hood:</strong> Oversized hood that blocks out ambient light and sensory distractions.</li>
                      <li><strong>Sensory Kit Included:</strong> Comes with a set of tactile fidget tools you can swap in or take on the go.</li>
                    </ul>
                  )}
                  {activeTab === 'care' && (
                    <div className="pdp-tab-text">
                      <p><strong>Fabric:</strong> Soft, breathable cotton-polyester plush fleece (450 GSM).</p>
                      <p><strong>Washing Instructions:</strong> Machine wash cold (30&deg;C) on gentle cycle. Turn inside out before washing. Do not bleach. Air dry or tumble dry low. Iron on low heat if needed.</p>
                    </div>
                  )}
                  {activeTab === 'sizing' && (
                    <div className="pdp-tab-text">
                      <p><strong>Fit Style:</strong> Relaxed, oversized drop-shoulder cut designed for maximum comfort and easy layering.</p>
                      <p><strong>Recommendation:</strong> Take your regular size for an effortlessly relaxed, cozy drape. If you prefer a fitted look, size down one size.</p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="pdp-tab-text">
                      <p><strong>Domestic Delivery:</strong> Free standard shipping across all Indian pin codes.</p>
                      <p><strong>Tracking:</strong> You will receive a tracking link via email as soon as your hoodie leaves our Bengaluru production facility.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Colors */}
      <section className="pdp-other-colors-section">
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '24px', textAlign: 'center', marginBottom: '32px' }}>
            Explore Other Colours
          </h2>
          <div className="pdp-other-colors-grid">
            {COLORWAYS.filter((cw) => cw.slug !== product.slug).map((cw) => (
              <Link key={cw.id} to={`/shop/${cw.slug}`} className="other-color-card">
                <div className="other-color-img-wrap">
                  <img src={cw.img} alt={cw.alt} loading="lazy" />
                </div>
                <div className="other-color-info">
                  <span className="other-color-swatch" style={{ background: cw.bg }}></span>
                  <span className="other-color-name">{cw.name}</span>
                  <span className="other-color-price">
                    <span>&#x20B9;1,999</span>
                    <s className="price-was" style={{ fontSize: '0.75em' }}>&#x20B9;2,799</s>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
