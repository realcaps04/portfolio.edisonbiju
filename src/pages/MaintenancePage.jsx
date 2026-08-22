import './MaintenancePage.css';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edison-biju/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/edisonbiju',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/realcaps04',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/917907951080',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function MaintenancePage() {
  const year = new Date().getFullYear();

  return (
    <div className="maintenance">
      <header className="maintenance__bar">
        <a href="mailto:edisonbijumullappallil@gmail.com" className="maintenance__logo" aria-label="Edison">
          <img src="/logo.png" alt="EB" className="maintenance__mark" />
        </a>
        <p className="maintenance__tag">Coming Soon</p>
      </header>

      <main className="maintenance__hero">
        <div className="maintenance__glow" aria-hidden="true" />

        <div className="maintenance__inner">
          <div className="maintenance__copy">
            <p className="maintenance__eyebrow">Portfolio refresh in progress</p>
            <h1 className="maintenance__title font-gropled">
              Designing
              <span className="maintenance__lime">&amp; Deploying</span>
              Things
            </h1>
            <p className="maintenance__lead">
              A new site for Edison Biju, web developer based in India.
              The work is still here — this page is just getting a new identity.
            </p>
            <div className="maintenance__actions">
              <a className="maintenance__cta" href="mailto:edisonbijumullappallil@gmail.com">
                Get in Touch
              </a>
              <p className="maintenance__status">
                <span className="maintenance__dot" aria-hidden="true" />
                Currently rebuilding
              </p>
            </div>
          </div>

          <div className="maintenance__art">
            <span className="maintenance__outline" aria-hidden="true" />
            <span className="maintenance__pill" aria-hidden="true" />
            <span className="maintenance__slab" aria-hidden="true" />
            <div className="maintenance__photo-wrap">
              <img
                src="/profile.png"
                alt="Edison Biju, web developer"
                className="maintenance__photo"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="maintenance__footer">
        <div className="maintenance__socials">
          {SOCIALS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              className="maintenance__social"
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="maintenance__legal">&copy; {year} Edison Biju</p>
      </footer>
    </div>
  );
}
