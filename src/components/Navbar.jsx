import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" aria-label="Edison — home">
          EDISON
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link">{label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" className="btn btn--outline navbar__cta">
          Contact
        </a>

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
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="navbar__mobile-link" onClick={handleLinkClick}>{label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn btn--primary navbar__mobile-cta" onClick={handleLinkClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
