import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useContactModal } from './ContactModal';
import { usePwa } from './pwaContext';
import { scrollToTop } from '../lib/scrollTop';
import NotificationPopup from './NotificationPopup';
import './SiteHeader.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Builds', to: '/builds' },
  { label: 'Pricing', to: '/pricing' },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContact } = useContactModal();
  const { canInstall, promptInstall } = usePwa();
  const activeIndex = NAV_LINKS.findIndex((link) => link.to === pathname);

  return (
    <header className={`hp-bar${menuOpen ? ' is-open' : ''}`}>
      <Link to="/" className="hp-bar__logo" aria-label="Edison — home" onClick={scrollToTop}>
        <img src="/logo.png" alt="EB" className="hp-bar__mark" />
      </Link>

      <nav className="hp-bar__links" aria-label="Primary">
        <span
          className={`hp-bar__pill${activeIndex < 0 ? ' is-hidden' : ''}`}
          style={{ '--pill-index': String(Math.max(0, activeIndex)) }}
          aria-hidden="true"
        />
        {NAV_LINKS.map(({ label, to }) => {
          const active = pathname === to;
          const className = `hp-bar__link${active ? ' is-active' : ''}`;
          return (
            <Link
              key={label}
              to={to}
              className={className}
              onClick={() => {
                setMenuOpen(false);
                scrollToTop();
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="hp-bar__end">
        {canInstall ? (
          <button type="button" className="hp-bar__install" onClick={promptInstall}>
            Install app
          </button>
        ) : null}
        <NotificationBell />
        <button
          type="button"
          className="hp-bar__connect"
          onClick={() => {
            setMenuOpen(false);
            openContact('connect');
          }}
        >
          Connect<span className="hp-bar__connect-rest">{'\u00A0'}with me</span>
        </button>
        <button
          type="button"
          className={`hp-bar__menu${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 18.5a3.5 3.5 0 0 1-7 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.2 10.6a5.8 5.8 0 1 1 11.6 0c0 2.4.64 4.08 1.4 5.4.3.52-.08 1.2-.68 1.2H5.48c-.6 0-.98-.68-.68-1.2.76-1.32 1.4-3 1.4-5.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotificationBell() {
  const convex = useConvex();
  const buttonRef = useRef(null);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [notices, setNotices] = useState(undefined);

  const toggleNotices = async () => {
    if (notifyOpen) {
      setNotifyOpen(false);
      return;
    }
    setNotifyOpen(true);
    try {
      const rows = await convex.query(api.notifications.list, {});
      setNotices(Array.isArray(rows) ? rows : []);
    } catch {
      setNotices([]);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`hp-bar__notify${notifyOpen ? ' is-open' : ''}`}
        aria-label="Notifications"
        aria-expanded={notifyOpen}
        onClick={toggleNotices}
      >
        <BellIcon />
      </button>
      <NotificationPopup
        open={notifyOpen}
        items={notices}
        anchorRef={buttonRef}
        onClose={() => setNotifyOpen(false)}
      />
    </>
  );
}
