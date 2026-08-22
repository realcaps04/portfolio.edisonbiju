import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SiteHeader.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
];

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a className="hp-bar__connect" href="mailto:edisonbijumullappallil@gmail.com">
          Connect with me
        </a>
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
