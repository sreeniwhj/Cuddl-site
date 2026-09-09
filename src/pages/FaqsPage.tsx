import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWaitlist } from '../context/WaitlistContext';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string | React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Product & Design',
    question: 'Who is CuddlWear designed for?',
    answer: 'This hoodie is made for college students and young professionals who fidget often, get overstimulated easily, or feel touched out and tired more often than they’d like to admit. If any of that sounds familiar, this hoodie may be for you.'
  },
  {
    id: 'faq-2',
    category: 'Audience',
    question: 'Why is it especially helpful for college students and working professionals?',
    answer: 'Modern campus and office environments are full of sensory triggers — buzzing fluorescent lights, back-to-back presentations, noisy open-plan layouts, and long screen hours. CuddlWear provides silent, on-body tactile relief via the removable stress ball and a reassuring, grounding fabric drape without calling attention to yourself.'
  },
  {
    id: 'faq-3',
    category: 'Product & Design',
    question: 'What does the hoodie actually feel like when wearing it?',
    answer: 'It feels like a warm, supportive hug. Crafted from buttery soft fabric for a gentle, comfortable feel. The fabric has a substantial, premium drape that immediately reduces drafts and ambient tension while remaining breathable enough for comfortable indoor wear all day long.'
  },
  {
    id: 'faq-4',
    category: 'Sensory Architecture',
    question: 'How does the sensory design and grounding feel work?',
    answer: 'The hoodie uses a soft, breathable cotton-polyester fabric designed for a comfortable, grounding feel. Combined with a removable stress ball that can be positioned on either side of your wrist, it provides both a reassuring, hug-like drape and instant fingertip fidgeting relief.'
  },
  {
    id: 'faq-5',
    category: 'Sensory Architecture',
    question: 'Does CuddlWear replace professional medical or mental health care?',
    answer: 'No. CuddlWear is an everyday lifestyle garment and tactile comfort tool. It is not a medical device, nor is it intended to diagnose, treat, prevent, or substitute for professional medical, psychiatric, or psychological care.'
  },
  {
    id: 'faq-6',
    category: 'Product & Design',
    question: 'How does the stress ball work?',
    answer: 'Every CuddlWear hoodie comes complete with a removable stress ball that can be positioned on either side of your wrist for personalized comfort.'
  },
  {
    id: 'faq-7',
    category: 'Product & Design',
    question: 'Can I wear this hoodie all day during classes, meetings, or at home?',
    answer: 'Yes! We intentionally chose a breathable, buttery soft fabric and an oversized, drop-shoulder cut so it never feels constricting or overly hot. It looks just like a clean, designer hoodie with no loud branding.'
  },
  {
    id: 'faq-8',
    category: 'Product & Design',
    question: 'What colorways are available and how do I choose?',
    answer: 'We offer four curated, soothing colorways: Ash (understated neutral), Oat (warm & earthy), Onyx (stealth & matte), and Sky (calm & clarifying). All colorways feature the exact same buttery soft fabric construction and removable stress ball.'
  },
  {
    id: 'faq-9',
    category: 'Ordering & Pre-orders',
    question: 'How does pre-ordering work?',
    answer: 'Pre-ordering reserves your hoodie for our limited first production batch. As soon as the first run is ready for fulfillment, we will send an email invite allowing you to complete your order at the guaranteed launch price of ₹1,999 (was ₹2,799 — 29% off).'
  },
  {
    id: 'faq-10',
    category: 'Ordering & Pre-orders',
    question: 'When will orders ship?',
    answer: 'We work quickly to ship your order as soon as possible. Once your order ships, you’ll receive an email with further tracking information. Delivery times vary depending on your location.'
  },
  {
    id: 'faq-11',
    category: 'Manufacturing',
    question: 'Where are CuddlWear products manufactured?',
    answer: 'Our products are manufactured in Bengaluru, India. We partner directly with specialized local apparel makers to maintain rigorous fabric quality and durable construction.'
  }
];

export function FaqsPage() {
  const { openWaitlist } = useWaitlist();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Product & Design', 'Audience', 'Sensory Architecture', 'Ordering & Pre-orders', 'Manufacturing'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="faqs-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner">
            <div className="page-eyebrow">
              <span className="dot"></span>
              Questions &amp; Answers
            </div>
            <h1 className="page-title">
              Everything you need to know about <em>CuddlWear.</em>
            </h1>
            <p className="page-lead">
              Have questions about how the sensory focus hoodie works, who it’s for, or our pre-order process? Find all the answers below.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs-main-section">
        <div className="container">
          {/* Category Filter Chips */}
          <div className="faq-category-filters" role="tablist" aria-label="FAQ Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`faq-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-list">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="faq-answer-panel"
                    >
                      <p className="faq-answer-text">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions */}
          <div className="faq-contact-card">
            <div className="faq-contact-content">
              <h3>Still have a question?</h3>
              <p>We are happy to answer any questions about sizing, materials, or delivery.</p>
            </div>
            <a href="mailto:hello@cuddlwear.in" className="btn-ghost">
              Email hello@cuddlwear.in
            </a>
          </div>
        </div>
      </section>

      {/* Pre-order Waitlist CTA */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow">Limited First Batch</div>
            <h2 className="cta-title">
              Ready to wear<br /><em>the calm?</em>
            </h2>
            <p className="cta-subtitle">
              Pre-order your hoodie today.{' '}
              <span className="price-sale-group" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                <strong>&#x20B9;1,999</strong>
                <s className="price-was">&#x20B9;2,799</s>
                <span className="price-badge">29% off</span>
              </span>
            </p>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => openWaitlist()}
              >
                Preorder Now &#8212; &#x20B9;1,999 <s style={{ opacity: 0.5, fontWeight: 400, fontSize: '0.85em' }}>&#x20B9;2,799</s>
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
