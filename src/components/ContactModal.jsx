import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './ContactModal.css';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };
const ContactContext = createContext(null);

export function useContactModal() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactModal must be used inside ContactProvider');
  }
  return context;
}

export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('popup');

  const openContact = useCallback((nextSource = 'popup') => {
    setSource(nextSource);
    setOpen(true);
  }, []);

  const closeContact = useCallback(() => setOpen(false), []);

  return (
    <ContactContext.Provider value={{ open, source, openContact, closeContact }}>
      {children}
      <ContactModal />
    </ContactContext.Provider>
  );
}

function ContactModal() {
  const { open, source, closeContact } = useContactModal();
  const submitContact = useMutation(api.contacts.submit);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const titleId = useId();
  const firstField = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    setStatus('idle');
    setError('');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => firstField.current?.focus(), 30);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeContact();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, closeContact]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      await submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
        source,
      });
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your message. Try again.');
    }
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="cm" role="presentation" onClick={closeContact}>
      <div
        className="cm__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cm__close" onClick={closeContact} aria-label="Close">
          <span />
          <span />
        </button>

        {status === 'sent' ? (
          <div className="cm__done">
            <p className="cm__kicker">Message received</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              I&apos;ll get back to you soon
            </h2>
            <p className="cm__copy">Thanks for reaching out. I usually reply within a day.</p>
            <button type="button" className="cm__submit" onClick={closeContact}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="cm__kicker">Let&apos;s work</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              Get in <span>touch</span>
            </h2>
            <p className="cm__copy">Tell me a bit about you and what you want to build.</p>

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
                    maxLength={40}
                    value={form.phone}
                    onChange={onChange}
                  />
                </label>
                <label>
                  Subject
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project, role, or hello"
                    required
                    maxLength={160}
                    value={form.subject}
                    onChange={onChange}
                  />
                </label>
              </div>

              <label>
                Message
                <textarea
                  name="message"
                  rows="4"
                  placeholder="What are you looking for?"
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
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
