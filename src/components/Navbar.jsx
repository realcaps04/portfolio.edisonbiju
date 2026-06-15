import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '/', isRoute: false },
  { label: 'About', href: '/about', isRoute: true },
  { label: 'Projects', href: '#projects', isRoute: false },
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
            {NAV_LINKS.map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute
                  ? <Link to={href} className="navbar__mobile-link" onClick={handleLinkClick}>{label}</Link>
                  : <a href={href} className="navbar__mobile-link" onClick={handleLinkClick}>{label}</a>
                }
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
