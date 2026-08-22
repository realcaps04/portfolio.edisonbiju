import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContactModal } from './ContactModal';
import { usePwa } from './PwaPrompts';
import './SiteHeader.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Builds', to: '/builds' },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContact } = useContactModal();
  const { canInstall, promptInstall } = usePwa();

  return (
    <header className={`hp-bar${menuOpen ? ' is-open' : ''}`}>
      <Link to="/" className="hp-bar__logo" aria-label="Edison — home">
        <img src="/logo.png" alt="EB" className="hp-bar__mark" />
      </Link>

      <nav className="hp-bar__links" aria-label="Primary">
        {NAV_LINKS.map(({ label, to }) => {
          const active = pathname === to;
          const className = `hp-bar__link${active ? ' is-active' : ''}`;
          return (
            <Link key={label} to={to} className={className} onClick={() => setMenuOpen(false)}>
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
        <button
          type="button"
          className="hp-bar__connect"
          onClick={() => {
            setMenuOpen(false);
            openContact('connect');
          }}
        >
          Connect<span className="hp-bar__connect-rest"> with me</span>
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
