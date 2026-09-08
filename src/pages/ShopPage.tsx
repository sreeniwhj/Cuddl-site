import { Link } from 'react-router-dom';
import { COLORWAYS } from '../data/colorways';
import { useWaitlist } from '../context/WaitlistContext';

export function ShopPage() {
  const { openWaitlist } = useWaitlist();

  return (
    <div className="shop-page">
      {/* Page Header */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-eyebrow">
              <span className="dot"></span>
              The Cuddl Collection
            </div>
            <h1 className="page-title">
              Four colours.<br /><em>One purpose: calm.</em>
            </h1>
            <p className="page-lead">
              Every CuddlWear hoodie features 450 GSM plush fabric, a right-wrist squish ball opening, and a soft, breathable cotton-polyester fabric designed for a comfortable, grounding feel. Choose your shade below.
            </p>
            <div className="shop-meta-strip">
              <div className="shop-meta-item">
                <strong>Price:</strong>{' '}
                <span className="price-sale-group" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>&#x20B9;1,999</strong>
                  <s className="price-was">&#x20B9;2,799</s>
                  <span className="price-badge">29% off</span>
                </span>
              </div>
              <div className="shop-meta-divider">&middot;</div>
              <div className="shop-meta-item">
                <strong>Shipping:</strong> Free across India
              </div>
              <div className="shop-meta-divider">&middot;</div>
              <div className="shop-meta-item">
                <strong>Origin:</strong> Bengaluru, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="shop-grid-section">
        <div className="container">
          <div className="products-grid">
            {COLORWAYS.map((product) => (
              <div key={product.id} className="product-card reveal">
                <Link to={`/shop/${product.slug}`} className="product-card-img-link" tabIndex={-1} aria-hidden="true">
                  <div className="product-card-img-wrap">
                    <img
                      src={product.img}
                      alt={product.alt}
                      loading="lazy"
                      className="product-card-img"
                    />
                    <div className="product-card-badge">
                      <span className="badge-swatch" style={{ background: product.bg }}></span>
                      <span>{product.name}</span>
                    </div>
                  </div>
                </Link>

                <div className="product-card-content">
                  <div className="product-card-header">
                    <div>
                      <h2 className="product-card-title">
                        <Link to={`/shop/${product.slug}`}>{product.name}</Link>
                      </h2>
                      <p className="product-card-tagline">{product.tagline}</p>
                    </div>
                    <div className="product-card-price">
                      <span>&#x20B9;1,999</span>
                      <span className="price-was">&#x20B9;2,799</span>
                      <span className="price-badge" style={{ fontSize: '0.6rem' }}>29% off</span>
                    </div>
                  </div>

                  <p className="product-card-desc">
                    {product.description}
                  </p>

                  <div className="product-card-specs">
                    <span className="card-spec-tag">450 GSM</span>
                    <span className="card-spec-tag">Grounding Feel</span>
                    <span className="card-spec-tag">Wrist Ball</span>
                  </div>

                  <div className="product-card-actions">
                    <Link
                      to={`/shop/${product.slug}`}
                      className="btn-ghost product-card-btn"
                    >
                      View details
                    </Link>
                    <button
                      type="button"
                      className="btn-primary product-card-btn"
                      onClick={() => openWaitlist(product.name)}
                    >
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Value Banner */}
      <section className="shop-benefits-section">
        <div className="container">
          <div className="shop-benefits-grid">
            <div className="benefit-col">
              <div className="benefit-icon">&#128230;</div>
              <h3>Free Shipping Across India</h3>
              <p>We deliver nationwide with zero added shipping fees on all waitlist pre-orders.</p>
            </div>
            <div className="benefit-col">
              <div className="benefit-icon">&#9878;&#65039;</div>
              <h3>Honest, Flat Pricing</h3>
              <p>
                <span className="price-sale-group" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong>&#x20B9;1,999</strong>
                  <s className="price-was">&#x20B9;2,799</s>
                  <span className="price-badge">29% off</span>
                </span>{' '}
                No hidden fees, no markup games, made to be your daily default.
              </p>
            </div>
            <div className="benefit-col">
              <div className="benefit-icon">&#127981;</div>
              <h3>Made in Bengaluru</h3>
              <p>Crafted locally with high-density 450 GSM plush fleece and precision stitching.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow">First Batch Reservation</div>
            <h2 className="cta-title">
              Ready to feel<br /><em>the difference?</em>
            </h2>
            <p className="cta-subtitle">
              Join the pre-order waitlist today. No payment needed now — we will reach out as soon as your hoodie is ready to ship.
            </p>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => openWaitlist()}
              >
                Join the Waitlist &#8212; &#x20B9;1,999 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
