import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './Contact.css';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const submitMessage = useMutation(api.messages.submit);
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
      await submitMessage({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your message. Try again.');
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__glow" aria-hidden="true" />

        <span className="section-eyebrow contact__eyebrow">Let&apos;s build together</span>
        <h2 className="contact__title font-gropled" id="contact-title">
          Ready to start your next project?
        </h2>
        <p className="contact__sub">
          Fill out the form below and I&apos;ll get back to you within 24 hours.
        </p>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="contact__form-row">
            <div className="contact__input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div className="contact__input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                value={form.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="contact__input-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Project Inquiry"
              required
              value={form.subject}
              onChange={onChange}
            />
          </div>

          <div className="contact__input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell me about your project..."
              required
              value={form.message}
              onChange={onChange}
            />
          </div>

          {status === 'sent' && (
            <p className="contact__note contact__note--ok" role="status">
              Message received. I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__note contact__note--err" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn--primary contact__submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
