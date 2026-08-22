import { useEffect, useState } from 'react';
import { useContactModal } from './ContactModal';
import './RightClickGuard.css';

// Set to false to turn this off. Do not comment out the whole file —
// App.jsx still needs the default export.
const ENABLED = false;

export default function RightClickGuard() {
  const [open, setOpen] = useState(false);
  const { openContact } = useContactModal();

  useEffect(() => {
    if (!ENABLED) return undefined;

    const onContextMenu = (event) => {
      event.preventDefault();
      setOpen(true);
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!ENABLED || !open) return undefined;

    const timer = window.setTimeout(() => setOpen(false), 6500);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!ENABLED || !open) return null;

  return (
    <div
      className="rcg"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rcg-title"
      onClick={() => setOpen(false)}
    >
      <div className="rcg__card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="rcg__close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <span />
          <span />
        </button>

        <p className="rcg__eyebrow">Hey, easy there</p>
        <h2 className="rcg__title font-gropled" id="rcg-title">
          Why using <span>right click?</span>
        </h2>
        <p className="rcg__copy">
          Just explore the work and connect with me. Everything you need is already on this page.
        </p>

        <div className="rcg__actions">
          <button
            type="button"
            className="rcg__cta"
            onClick={() => {
              setOpen(false);
              openContact('right-click');
            }}
          >
            Connect with me
          </button>
          <button type="button" className="rcg__ghost" onClick={() => setOpen(false)}>
            Keep exploring
          </button>
        </div>
      </div>
    </div>
  );
}
