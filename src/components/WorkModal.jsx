import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import './ContactModal.css';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  details: '',
};

const WorkContext = createContext(null);

export function useWorkModal() {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error('useWorkModal must be used inside WorkProvider');
  }
  return context;
}

export function WorkProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openWork = useCallback(() => setOpen(true), []);
  const closeWork = useCallback(() => setOpen(false), []);

  return (
    <WorkContext.Provider value={{ open, openWork, closeWork }}>
      {children}
      <WorkModal />
    </WorkContext.Provider>
  );
}

function WorkModal() {
  const { open, closeWork } = useWorkModal();
  const submitWork = useMutation(api.workInquiries.submit);
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
      if (event.key === 'Escape') closeWork();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(timer);
    };
  }, [open, closeWork]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      await submitWork(form);
      setForm(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send the brief. Try again.');
    }
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="cm" role="presentation" onClick={closeWork}>
      <div
        className="cm__dialog cm__dialog--work"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cm__close" onClick={closeWork} aria-label="Close">
          <span />
          <span />
        </button>

        {status === 'sent' ? (
          <div className="cm__done">
            <p className="cm__kicker">Brief received</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              You&apos;re on the list
            </h2>
            <p className="cm__copy">I&apos;ll read the details and get back to you soon.</p>
            <button type="button" className="cm__submit" onClick={closeWork}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="cm__kicker">You&apos;re next</p>
            <h2 className="cm__title font-gropled" id={titleId}>
              Tell me about the <span>work</span>
            </h2>
            <p className="cm__copy">Company, type of build, budget, timeline — whatever you already know.</p>

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
              </div>

              <div className="cm__row">
                <label>
                  Project type
                  <select name="projectType" required value={form.projectType} onChange={onChange}>
                    <option value="">Select one</option>
                    <option value="Website">Website</option>
                    <option value="Web app">Web app</option>
                    <option value="UI / UX design">UI / UX design</option>
                    <option value="Brand identity">Brand identity</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
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
              </div>

              <label>
                Timeline
                <select name="timeline" value={form.timeline} onChange={onChange}>
                  <option value="">When do you need this?</option>
                  <option value="ASAP">ASAP</option>
                  <option value="2–4 weeks">2–4 weeks</option>
                  <option value="1–2 months">1–2 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </label>

              <label>
                Work details
                <textarea
                  name="details"
                  rows="4"
                  placeholder="What should we build, who is it for, and what does success look like?"
                  required
                  maxLength={5000}
                  value={form.details}
                  onChange={onChange}
                />
              </label>

              {status === 'error' && (
                <p className="cm__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="cm__submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send brief'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
