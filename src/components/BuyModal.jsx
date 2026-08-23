import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './ContactModal.css';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  budget: '',
  message: '',
};

export default function BuyModal({ build, onClose }) {
  const submitInquiry = useMutation(api.buildInquiries.submit);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const titleId = useId();
  const firstField = useRef(null);

  useEffect(() => {
    if (!build) return undefined;

    setForm(EMPTY);
    setStatus('idle');
    setError('');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => firstField.current?.focus(), 30);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
    };
  }, [build, onClose]);

  if (!build || typeof document === 'undefined') return null;

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      await submitInquiry({
        productId: build.id,
        productTitle: build.title,
        productUrl: build.url ?? '',
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        budget: form.budget,
        message: form.message,
      });
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your inquiry. Try again.');
    }
  };

  return createPortal(
    <div className="cm" role="presentation" onClick={onClose}>
      <div
        className="cm__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cm__close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        {status === 'sent' ? (
          <div className="cm__done">
            <p className="cm__kicker">Inquiry received</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              I&apos;ll reach out shortly
            </h2>
            <p className="cm__copy">
              Thanks for your interest in {build.title}. I&apos;ll follow up with next steps and pricing.
            </p>
            <button type="button" className="cm__submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="cm__kicker">For sale</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              Buy <span>{build.title}</span>
            </h2>
            <p className="cm__copy">
              Leave your details and I&apos;ll get back with availability, handover, and pricing.
            </p>

            <form className="cm__form" onSubmit={onSubmit}>
              <div className="cm__row">
                <label>
                  Name
                  <input
                    ref={firstField}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    maxLength={120}
                    value={form.name}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    required
                    maxLength={160}
                    value={form.email}
                    onChange={onChange}
                  />
                </label>
              </div>

              <div className="cm__row">
                <label>
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+91 79079 51080"
                    required
                    maxLength={40}
                    value={form.phone}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="Studio, startup, or personal"
                    maxLength={160}
                    value={form.company}
                    onChange={onChange}
                  />
                </label>
              </div>

              <label>
                Budget
                <select name="budget" value={form.budget} onChange={onChange}>
                  <option value="">Select if you know</option>
                  <option value="Under ₹25,000">Under ₹25,000</option>
                  <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000</option>
                  <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000</option>
                  <option value="₹2,00,000+">₹2,00,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="4"
                  placeholder="How do you want to use this build, and when do you need it?"
                  required
                  maxLength={4000}
                  value={form.message}
                  onChange={onChange}
                />
              </label>

              {status === 'error' && (
                <p className="cm__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="cm__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send inquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
