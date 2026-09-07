import React, { useState, useEffect, useCallback } from 'react';
import { submitWaitlistEntry } from '../../services/waitlist';

export interface ColorwayOption {
  id: string;
  name: string;
  bg: string;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableColorways: ColorwayOption[];
  initialColorway: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  consent?: string;
}

export function WaitlistModal({
  isOpen,
  onClose,
  availableColorways,
  initialColorway,
}: WaitlistModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [colorway, setColorway] = useState(initialColorway);
  const [note, setNote] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setFullName('');
    setEmail('');
    setPhone('');
    setNote('');
    setConsent(false);
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
  }, []);

  // When modal opens, sync colorway and reset any previous errors
  useEffect(() => {
    if (isOpen) {
      setColorway(initialColorway);
      setErrors({});
    }
  }, [isOpen, initialColorway]);

  // Handle closing modal
  const handleClose = useCallback(() => {
    if (isSuccess) {
      resetForm();
    }
    onClose();
  }, [isSuccess, resetForm, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full name validation (min 2 chars)
    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // 3. Indian Phone validation (10 digits starting with 6, 7, 8, or 9)
    const cleanedPhone = phone.replace(/\D/g, '').replace(/^91/, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile phone number.';
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    // 4. Consent checkbox validation
    if (!consent) {
      newErrors.consent = 'You must agree to be contacted to join the waitlist.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const cleanedPhone = phone.replace(/\D/g, '').replace(/^91/, '');
      const response = await submitWaitlistEntry({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: cleanedPhone,
        colorway,
        note: note.trim() || undefined,
        consent,
      });

      if (response.success) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('[CuddlWear Waitlist] Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          &times;
        </button>

        {!isSuccess ? (
          <>
            <div className="modal-header">
              <span className="modal-eyebrow">Priority Access</span>
              <h2 id="waitlist-title" className="modal-title">
                Join the Waitlist
              </h2>
              <p className="modal-desc">
                Reserve your spot for the first limited production run of the CuddlWear Hoodie at{' '}
                <strong>&#x20B9;1,999</strong>. No payment required today.
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="modal-name" className="form-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                  placeholder="e.g. Aryan Sharma"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="modal-email" className="form-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="aryan@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="modal-phone" className="form-label">
                  Mobile Number <span className="req">*</span>
                </label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    id="modal-phone"
                    type="tel"
                    className={`form-input phone-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                  />
                </div>
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {/* Preferred Colorway */}
              <div className="form-group">
                <label className="form-label">Preferred Colorway</label>
                <div className="modal-colorway-pills">
                  {availableColorways.map((cw) => (
                    <button
                      type="button"
                      key={cw.id}
                      className={`modal-colorway-pill ${colorway === cw.name ? 'selected' : ''}`}
                      onClick={() => setColorway(cw.name)}
                    >
                      <span className="pill-swatch" style={{ background: cw.bg }} />
                      <span>{cw.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Note */}
              <div className="form-group">
                <label htmlFor="modal-note" className="form-label">
                  Optional Note <span className="opt">(Optional)</span>
                </label>
                <textarea
                  id="modal-note"
                  className="form-textarea"
                  rows={2}
                  placeholder="Any size preference or question for our team?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="form-checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (errors.consent) setErrors({ ...errors, consent: undefined });
                    }}
                  />
                  <span>I agree to be contacted about CuddlWear pre-orders.</span>
                </label>
                {errors.consent && <span className="form-error">{errors.consent}</span>}
              </div>

              {/* Privacy Note */}
              <p className="privacy-note">
                We respect your privacy. Your contact details will only be used to contact you when CuddlWear pre-orders open.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary modal-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Reserving your spot...' : 'Join the Waitlist — ₹1,999'}
              </button>
            </form>
          </>
        ) : (
          <div className="modal-success-view">
            <div className="success-icon">&#10003;</div>
            <h2 className="success-title">You’re on the CuddlWear waitlist.</h2>
            <p className="success-subtitle">We’ll contact you when pre-orders open.</p>

            <div className="success-details-card">
              <div className="success-detail-row">
                <span className="success-detail-key">Preferred Tone</span>
                <span className="success-detail-val">{colorway}</span>
              </div>
              <div className="success-detail-row">
                <span className="success-detail-key">Price</span>
                <span className="success-detail-val">&#x20B9;1,999</span>
              </div>
              <div className="success-detail-row">
                <span className="success-detail-key">Status</span>
                <span className="success-detail-val success-status-tag">Reserved</span>
              </div>
            </div>

            <p className="success-demo-notice">
              Your interest has been saved on this device.
            </p>

            <button type="button" className="btn-primary modal-done-btn" onClick={handleDone}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
