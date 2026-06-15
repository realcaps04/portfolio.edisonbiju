import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/', isRoute: false },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Projects', href: '/projects', isRoute: true },
  { label: 'Testimonials', href: '#testimonials', isRoute: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${hidden ? ' navbar--hidden' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" aria-label="Edison — home">
          <img src="/profile.jpg" alt="Edison" className="navbar__logo-avatar" />
          <span className="navbar__logo-name">EDISON</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href, isRoute }) => (
            <li key={label}>
              {isRoute
                ? <Link to={href} className="navbar__link">{label}</Link>
                : <a href={href} className="navbar__link">{label}</a>
              }
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__resume-icon"
            aria-label="View Resume"
            title="View Resume"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn--outline navbar__cta">
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <ul role="list">
            {NAV_LINKS.map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute
                  ? <Link to={href} className="navbar__mobile-link" onClick={handleLinkClick}>{label}</Link>
                  : <a href={href} className="navbar__mobile-link" onClick={handleLinkClick}>{label}</a>
                }
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline navbar__mobile-cta"
                onClick={handleLinkClick}
                style={{ marginBottom: '0.5rem', width: '100%' }}
              >
                View Resume
              </a>
              <a href="#contact" className="btn btn--primary navbar__mobile-cta" onClick={handleLinkClick}>
                Hire me
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
