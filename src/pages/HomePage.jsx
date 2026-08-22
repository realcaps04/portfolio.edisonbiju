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
      <header className={`hp-bar${menuOpen ? ' is-open' : ''}`}>
        <Link to="/" className="hp-bar__logo" aria-label="Edison — home">
          <img src="/logo.png" alt="EB" className="hp-bar__mark" />
        </Link>

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
      </header>

      <section className="hp-hero" aria-label="Hero">
        <div className="hp-hero__glow" aria-hidden="true" />

        <div className="hp-hero__inner">
          <div className="hp-hero__copy">
            <h1 className="hp-hero__title font-gropled">
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
              src="/profile.png"
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
              <p className="hp-intro__gh-note">repos, experiments, and shipped builds</p>
              <div className="hp-intro__bars" aria-hidden="true">
                <span />
                <span />
                <span className="is-live" />
                <span />
              </div>
              <div className="hp-intro__circuit" aria-hidden="true">
                <span className="hp-intro__circuit-glow" />
                <svg viewBox="0 0 160 176" fill="none">
                  <defs>
                    <filter id="hp-circuit-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="2.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g filter="url(#hp-circuit-glow)" stroke="#3b82f6" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M80 0 V62" />
                    <circle cx="80" cy="74" r="11" fill="#080b12" />
                    <circle cx="80" cy="74" r="3.8" fill="#60a5fa" stroke="none" />
                    <path d="M80 85 V128" />
                    <path d="M70.5 82 C48 96 32 112 28 132" />
                    <path d="M89.5 82 C112 96 128 112 132 132" />
                    <circle cx="28" cy="144" r="9.5" fill="#080b12" />
                    <circle cx="28" cy="144" r="3.2" fill="#60a5fa" stroke="none" />
                    <circle cx="80" cy="144" r="9.5" fill="#080b12" />
                    <circle cx="80" cy="144" r="3.2" fill="#60a5fa" stroke="none" />
                    <circle cx="132" cy="144" r="9.5" fill="#080b12" />
                    <circle cx="132" cy="144" r="3.2" fill="#60a5fa" stroke="none" />
                  </g>
                </svg>
              </div>
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#5FA04A"
        d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68C2.99 6.729 2.936 6.825 2.936 6.921v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.599.247-.925.247zm7.101-10.007c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.115.129.199.247.199h1.141c.071 0 .138-.031.186-.081a.26.26 0 0 0 .067-.196c-.177-2.098-1.571-3.076-4.388-3.076-2.508 0-4.004 1.058-4.004 2.833 0 1.925 1.488 2.457 3.895 2.695 2.88.282 3.103.703 3.103 1.269 0 .983-.789 1.402-2.642 1.402-2.327 0-2.839-.584-3.011-1.742-.02-.124-.126-.215-.253-.215h-1.137c-.141 0-.254.112-.254.253 0 1.482.806 3.248 4.655 3.248 2.652.001 4.25-1.096 4.25-3.013z"
      />
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
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#F05032"
        d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
      />
    </svg>
  );
}
