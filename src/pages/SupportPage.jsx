import { useState } from 'react';
import { useMutation } from 'convex/react';
import SiteHeader from '../components/SiteHeader';
import { api } from '../../convex/_generated/api';
import './ProjectsPage.css';
import './SupportPage.css';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  product: 'cloak',
  category: 'bug',
  subject: '',
  message: '',
};

const PRODUCTS = [
  { value: 'cloak', label: 'Cloak' },
  { value: 'portfolio', label: 'Portfolio / website' },
  { value: 'free-tools', label: 'Free to use tools' },
  { value: 'builds', label: 'Builds / shipped work' },
  { value: 'other', label: 'Other' },
];

const CATEGORIES = [
  { value: 'bug', label: 'Bug / not working' },
  { value: 'account', label: 'Account / access' },
  { value: 'billing', label: 'Billing / plans' },
  { value: 'feature', label: 'Feature request' },
  { value: 'other', label: 'Other' },
];

const FAQ = [
  {
    q: 'How fast do you reply?',
    a: 'Most tickets get a first reply within 24–48 hours on working days.',
  },
  {
    q: 'Is Cloak support here?',
    a: 'Yes. Choose Cloak as the product. For Discord-only help you can also use the Cloak Discord after you join.',
  },
  {
    q: 'What should I include?',
    a: 'Your email, what you were doing, what went wrong, and any screenshots or error text you can paste.',
  },
];

export default function SupportPage() {
  const submitTicket = useMutation(api.support.submit);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      await submitTicket({
        name: form.name,
        email: form.email,
        phone: form.phone,
        product: form.product,
        category: form.category,
        subject: form.subject,
        message: form.message,
        source: 'support-page',
      });
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your ticket. Try again.');
    }
  };

  return (
    <div className="hp pp sp">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="support-title">
        <div className="pp-hero__glow" aria-hidden="true" />
        <div className="pp-hero__inner">
          <p className="pp-label">Help center</p>
          <h1 className="pp-hero__title font-gropled" id="support-title">
            Support
            <span className="pp-hero__lime">tickets</span>
          </h1>
          <p className="pp-hero__sub">
            Open a ticket for Cloak, free tools, builds, or this site. Tickets land in the admin inbox so they can
            be tracked and closed.
          </p>
        </div>
      </section>

      <section className="sp-layout" aria-label="Support form and FAQ">
        <form className="sp-form" onSubmit={onSubmit}>
          <div className="sp-form__row">
            <label className="sp-field">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
                maxLength={120}
              />
            </label>
            <label className="sp-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
                required
                maxLength={160}
              />
            </label>
          </div>

          <div className="sp-form__row">
            <label className="sp-field">
              <span>Phone (optional)</span>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                autoComplete="tel"
                maxLength={40}
              />
            </label>
            <label className="sp-field">
              <span>Product</span>
              <select name="product" value={form.product} onChange={onChange} required>
                {PRODUCTS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="sp-field">
            <span>Category</span>
            <select name="category" value={form.category} onChange={onChange} required>
              {CATEGORIES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="sp-field">
            <span>Subject</span>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              required
              maxLength={160}
              placeholder="Short summary of the issue"
            />
          </label>

          <label className="sp-field">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              maxLength={4000}
              placeholder="What happened, what you expected, and any error text"
            />
          </label>

          {status === 'sent' ? (
            <p className="sp-note sp-note--ok" role="status">
              Ticket sent. We&apos;ll follow up by email.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="sp-note sp-note--err" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="pp-cta" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit ticket'}
          </button>
        </form>

        <aside className="sp-side">
          <p className="pp-label">Quick answers</p>
          <h2 className="sp-side__title font-gropled">Before you write</h2>
          <ul className="sp-faq">
            {FAQ.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong>
                <p>{item.a}</p>
              </li>
            ))}
          </ul>
          <a className="sp-side__mail" href="mailto:edisonbijumullappallil@gmail.com">
            edisonbijumullappallil@gmail.com
          </a>
        </aside>
      </section>
    </div>
  );
}
