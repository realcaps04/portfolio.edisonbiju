import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HomePage.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Content', to: '#intro' },
];

export default function HomePage() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="hp">
      <header className="hp-bar">
        <Link to="/" className="hp-bar__logo" aria-label="Edison — home">
          <img src="/logo.png" alt="EB" className="hp-bar__mark" />
        </Link>

        <div className={`hp-bar__end${menuOpen ? ' is-open' : ''}`}>
          <nav className="hp-bar__links" aria-label="Primary">
            {NAV_LINKS.map(({ label, to }) => {
              const active = to.startsWith('#') ? false : pathname === to;
              const className = `hp-bar__link${active ? ' is-active' : ''}`;
              return to.startsWith('#') ? (
                <a key={label} href={to} className={className} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ) : (
                <Link key={label} to={to} className={className} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              );
            })}
          </nav>
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

      <section className="hp-hero" aria-label="Hero">
        <div className="hp-hero__glow" aria-hidden="true" />

        <div className="hp-hero__inner">
          <div className="hp-hero__copy">
            <h1 className="hp-hero__title">
              Designing
              <span className="hp-hero__lime">&amp; Deploying</span>
              Things
            </h1>
            <div className="hp-hero__actions">
              <a className="hp-hero__cta" href="mailto:edisonbijumullappallil@gmail.com">
                Get in Touch
              </a>
              <p className="hp-hero__status">
                <span className="hp-hero__dot" aria-hidden="true" />
                Available for Hire
              </p>
            </div>
          </div>

          <div className="hp-hero__art">
            <span className="hp-hero__outline" aria-hidden="true" />
            <span className="hp-hero__pill" aria-hidden="true" />
            <span className="hp-hero__slab" aria-hidden="true" />
            <img
              src="/profile.jpg"
              alt="Edison Biju, web developer"
              className="hp-hero__photo"
            />
          </div>
        </div>
      </section>

      <section className="hp-intro" id="intro" aria-labelledby="intro-title">
        <div className="hp-intro__glow hp-intro__glow--left" aria-hidden="true" />
        <div className="hp-intro__glow hp-intro__glow--right" aria-hidden="true" />

        <div className="hp-intro__inner">
          <div className="hp-intro__copy">
            <p className="hp-intro__label">Introduction</p>
            <h2 className="hp-intro__title" id="intro-title">
              Hello!, I&apos;m Edison Biju
              <br />
              <span className="hp-intro__role">Programmer</span>
              <br />
              based on India
            </h2>
            <p className="hp-intro__bio">
              I build fast, clean web apps with React, Node, and a strong eye for UI.
              From landing pages to full dashboards, I care about performance, clarity,
              and shipping work that actually feels good to use. Always up for a new build.
            </p>
          </div>

          <div className="hp-intro__visual">
            <article className="hp-intro__gh">
              <p className="hp-intro__gh-path">
                github /{' '}
                <a href="https://github.com/realcaps04" target="_blank" rel="noopener noreferrer">
                  <strong>realcaps04</strong>
                </a>
              </p>
              <div className="hp-intro__bars" aria-hidden="true">
                <span />
                <span />
                <span className="is-live" />
                <span />
              </div>
              <svg className="hp-intro__circuit" viewBox="0 0 220 80" fill="none" aria-hidden="true">
                <path d="M20 18 C20 48 70 58 110 58 C150 58 170 34 200 34" stroke="#3b82f6" strokeWidth="2.4" />
                <path d="M110 58 V72" stroke="#3b82f6" strokeWidth="2.4" />
                <circle cx="20" cy="18" r="5" fill="#60a5fa" />
                <circle cx="110" cy="72" r="5" fill="#60a5fa" />
                <circle cx="200" cy="34" r="5" fill="#60a5fa" />
              </svg>
            </article>

            <article className="hp-intro__stack">
              <p>Tech Stack</p>
              <div className="hp-intro__icons">
                <span title="React"><ReactIcon /></span>
                <span title="Node.js"><NodeIcon /></span>
                <span title="Figma"><FigmaIcon /></span>
                <span title="Git"><GitIcon /></span>
              </div>
            </article>

            <span className="hp-intro__cursor" aria-hidden="true">
              <CursorIcon />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M4.2 3.2 22.4 15.1l-7.4 1.4 3.9 8.3-3.3 1.6-3.9-8.4-6.4 4.8z"
        fill="#8b5cf6"
        stroke="#1a0a2a"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 256 289" aria-hidden="true">
      <path d="M128 0 18 64v129l110 64 110-64V64L128 0z" fill="#339933" />
      <path d="M128 18 238 81v127L128 271 18 208V81L128 18z" fill="#fff" fillOpacity=".06" />
      <path d="M128 57c-5 0-9 3-9 8v90l-42 24c-4 2-5 8-3 12 2 3 5 5 9 5 2 0 3 0 5-1l47-27c3-1 5-5 5-8V65c0-5-4-8-9-8h-3z" fill="#fff" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg viewBox="0 0 38 57" aria-hidden="true">
      <path d="M19 28.5c0-5.25 4.25-9.5 9.5-9.5S38 23.25 38 28.5 33.75 38 28.5 38 19 33.75 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19v9.5C19 52.75 14.75 57 9.5 57S0 52.75 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0v19h9.5C33.75 19 38 14.75 38 9.5S33.75 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5C4.25 0 0 4.25 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5C4.25 19 0 23.25 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 92 92" aria-hidden="true">
      <path d="M90 42 50 2a6 6 0 0 0-8 0L33 11l10 10a7 7 0 0 1 9 9l10 10a7 7 0 1 1-4 4L48 34v25a7 7 0 1 1-6 0V33L32 23a7 7 0 0 1 0-9L23 5 2 26a6 6 0 0 0 0 8l40 40a6 6 0 0 0 8 0l40-40a6 6 0 0 0 0-8Z" fill="#F05032" />
    </svg>
  );
}
