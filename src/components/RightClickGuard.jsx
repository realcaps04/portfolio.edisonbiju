import { useEffect, useState } from 'react';
import './RightClickGuard.css';

// Set to false to turn this off. Do not comment out the whole file —
// App.jsx still needs the default export.
const ENABLED = true;

const EMAIL = 'mailto:edisonbijumullappallil@gmail.com';

export default function RightClickGuard() {
  const [open, setOpen] = useState(false);

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
          <a className="rcg__cta" href={EMAIL} onClick={() => setOpen(false)}>
            Connect with me
          </a>
          <button type="button" className="rcg__ghost" onClick={() => setOpen(false)}>
            Keep exploring
          </button>
        </div>
      </div>
    </div>
  );
}
