import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero section">
      {/* Background glow blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Available for freelance work</p>
        <h1 className="hero__title">
          Adaptive Logo Design<br />
          <span className="hero__title--highlight">for Your Brand</span>
        </h1>
        <p className="hero__sub">
          Crafting bold, timeless identities that make brands impossible to ignore.
          Let&apos;s build something that lasts.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary hero__cta">
            View Projects
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#about" className="btn btn--ghost">
            About me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
