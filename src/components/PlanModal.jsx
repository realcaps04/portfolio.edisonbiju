import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { formatPrice } from '../data/pricing';
import { startLenis, stopLenis } from '../lib/scrollTop';
import './ContactModal.css';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

export default function PlanModal({ plan, currency, onClose }) {
  const submitInquiry = useMutation(api.planInquiries.submit);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const titleId = useId();
  const firstField = useRef(null);

  const inRupees = currency === 'INR';
  const displayedPrice = plan?.custom
    ? 'Custom quote'
    : plan
      ? formatPrice(inRupees ? plan.inr : plan.usd, currency)
      : '';

  useEffect(() => {
    if (!plan) return undefined;

    setForm({
      ...EMPTY,
      message: plan.custom
        ? 'I want a custom plan. Here is what I need: '
        : `I want to start the ${plan.name} plan.`,
    });
    setStatus('idle');
    setError('');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    stopLenis();
    const timer = window.setTimeout(() => {
      if (window.matchMedia('(min-width: 720px)').matches) {
        firstField.current?.focus();
      }
    }, 30);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
      startLenis();
    };
  }, [plan, onClose]);

  if (!plan || typeof document === 'undefined') return null;

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
        planId: plan.id,
        planName: plan.name,
        currency,
        priceUsd: plan.usd,
        priceInr: plan.inr,
        displayedPrice,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: form.message,
      });
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your request. Try again.');
    }
  };

  return createPortal(
    <div
      className="cm"
      role="presentation"
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      onClick={onClose}
    >
      <div
        className="cm__dialog cm__dialog--plan"
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
            <p className="cm__kicker">Plan request received</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              I&apos;ll follow up on {plan.name}
            </h2>
            <p className="cm__copy">
              Thanks. I have your details
              {plan.custom ? ' for a custom plan' : ` for the ${plan.name} plan at ${displayedPrice}`}
              . I&apos;ll write back with next steps.
            </p>
            <button type="button" className="cm__submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="cm__form cm__form--plan" onSubmit={onSubmit}>
            <div className="cm__plan-scroll">
              <p className="cm__kicker">{plan.custom ? 'Custom plan' : 'Selected plan'}</p>
              <h2 className="cm__title font-gropled" id={titleId}>
                {plan.custom ? 'Tell me the' : 'Start'} <span>{plan.custom ? 'build' : plan.name}</span>
              </h2>
              <p className="cm__copy">{plan.blurb}</p>

              <div className="cm__plan">
                <p>
                  <strong>{displayedPrice}</strong>
                  <span>{plan.custom ? plan.time : `starting · ${plan.time}`}</span>
                </p>
                <ul>
                  {plan.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

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
                Message
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Anything I should know about this build?"
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
            </div>

            <button type="submit" className="cm__submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : plan.custom ? 'Send custom request' : 'Send plan request'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
