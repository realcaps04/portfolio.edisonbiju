import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://behance.net',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.5 11.25c1.38 0 2.25-.87 2.25-2.12C9.75 7.88 9 7 7.5 7H3v10h4.75c1.62 0 2.75-1.12 2.75-2.62 0-1.26-.88-2.63-3-3.13zM5 9h2.25c.75 0 1.25.38 1.25 1.13S8 11.25 7.25 11.25H5V9zm2.5 6H5v-2.5h2.5c.88 0 1.5.5 1.5 1.25S8.38 15 7.5 15zm6.25-6.75h3.5v1h-3.5v-1zm5.25 4.5c0 .38-.06.75-.19 1.25H15c.06.87.75 1.5 1.62 1.5.5 0 1-.19 1.38-.56l1 .94c-.56.56-1.44.87-2.38.87-1.87 0-3-1.25-3-3s1.13-3 3-3 3 1.25 3 3c0 .13 0 .19-.12.5zm-4.06-1c0-.87.56-1.38 1.31-1.38.75 0 1.25.56 1.25 1.38h-2.56z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo">EDISON</a>
            <p className="footer__tagline">
              Brand & visual designer crafting<br />
              identities that endure.
            </p>
          </div>

          {/* Links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            <p className="footer__nav-title">Navigation</p>
            <ul role="list">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="footer__nav-link">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer__contact">
            <p className="footer__nav-title">Contact</p>
            <a href="mailto:info@edison.com" className="footer__email">
              info@edison.com
            </a>
            <div className="footer__socials">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer__social"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} Edison. All rights reserved.
          </p>
          <p className="footer__credit">
            Designed &amp; built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
