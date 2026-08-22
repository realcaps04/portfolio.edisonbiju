import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import ProjectCard from '../components/ProjectCard';
import { useContactModal } from '../components/ContactModal';
import { useWorkModal } from '../components/WorkModal';
import { PROJECTS } from '../data/projects';
import './HomePage.css';

export default function HomePage() {
  const { openContact } = useContactModal();

  return (
    <div className="hp">
      <SiteHeader />

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
              <button type="button" className="hp-hero__cta" onClick={() => openContact('home-hero')}>
                Get in Touch
              </button>
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
            <div className="hp-hero__photo-wrap">
              <img
                src="/profile.png"
                alt="Edison Biju, web developer"
                className="hp-hero__photo"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hp-intro" id="intro" aria-labelledby="intro-title">
        <div className="hp-intro__glow hp-intro__glow--left" aria-hidden="true" />
        <div className="hp-intro__glow hp-intro__glow--right" aria-hidden="true" />

        <div className="hp-intro__inner">
          <div className="hp-intro__copy">
            <p className="hp-intro__label">Introduction</p>
            <h2 className="hp-intro__title font-gropled" id="intro-title">
              Hello!, I&apos;m <span className="hp-intro__name">Edison Biju</span>
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

      <section className="hp-projects" id="projects" aria-labelledby="home-projects-title">
        <div className="hp-projects__glow" aria-hidden="true" />
        <div className="hp-projects__inner">
          <div className="hp-projects__head">
            <div>
              <p className="hp-intro__label">Portfolio</p>
              <h2 className="hp-intro__title font-gropled" id="home-projects-title">
                Selected <span className="hp-hero__lime">Projects</span>
              </h2>
            </div>
            <Link to="/projects" className="hp-hero__cta">
              View all
            </Link>
          </div>

          <div className="pp-grid">
            {PROJECTS.slice(0, 5).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ProfileSection />
      <ClientsSection />
      <QuoteSection />
    </div>
  );
}

function ProfileSection() {
  const [shared, setShared] = useState(false);

  const facts = [
    "I'm based in Idukki, Kerala, India",
    'Recent BCA graduate from JPM Arts and Science College, Labbakkada',
    'I build with MERN, Python, PHP, and MySQL',
    "I'm a full stack developer and designer",
    'My phone number in India +91 79079 51080',
  ];

  const share = async () => {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Edison Biju', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <section className="hp-profile" id="about" aria-labelledby="profile-title">
      <div className="hp-profile__map" aria-hidden="true">
        <IdukkiMap />
      </div>

      <article className="hp-profile__card">
        <div className="hp-profile__socials">
          <a
            href="https://wa.me/917907951080"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <a
            href="https://www.instagram.com/edisonbiju"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <button type="button" onClick={share} aria-label={shared ? 'Link copied' : 'Share'}>
            <ShareIcon />
          </button>
        </div>

        <h2 className="hp-profile__name font-gropled" id="profile-title">
          I&apos;m <span>Edison</span> Biju
        </h2>

        <ul className="hp-profile__facts">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </article>

      <div className="hp-profile__photo">
        <img src="/profile.png" alt="Edison Biju" />
      </div>
    </section>
  );
}

function ClientsSection() {
  const { openWork } = useWorkModal();
  const clients = [
    {
      name: 'SBI',
      href: 'https://sbi.co.in/',
      src: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
    },
    {
      name: 'irohub',
      href: 'https://irohub.com/',
      src: 'https://www.irohub.com/home/images/irohub-footer-white.webp',
    },
    {
      name: 'JPM',
      href: 'https://jpmcollege.ac.in/',
      src: 'https://jpmcollege.ac.in/public/images/JPM-Arts-and-Science-College-white.svg',
    },
    {
      name: 'Console',
      href: 'https://consoleonline.vercel.app/',
      src: '/clients/console.svg',
    },
  ];

  return (
    <section className="hp-clients" id="clients" aria-labelledby="clients-title">
      <div className="hp-clients__inner">
        <div className="hp-clients__head">
          <h2 className="hp-clients__title font-gropled" id="clients-title">
            Clients &amp; Companies i&apos;ve worked with
          </h2>
          <p className="hp-clients__copy">
            From tech leadership at JPM and an internship at Irohub, to product work
            on Console and operations at SBI. Teams I&apos;ve shipped with — and room
            for the next one.
          </p>
        </div>

        <ul className="hp-clients__row">
          {clients.map((client) => (
            <li key={client.name}>
              <a
                className={`hp-clients__brand hp-clients__brand--${client.name.toLowerCase()}`}
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={client.src} alt={client.name} referrerPolicy="no-referrer" />
              </a>
            </li>
          ))}
          <li>
            <button type="button" className="hp-clients__next" onClick={openWork}>
              You&apos;re next? <span aria-hidden="true">→</span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="hp-quote" aria-label="Design quote">
      <div className="hp-quote__bar">
        <blockquote className="hp-quote__inner">
          <p>Good design is a language, not a style</p>
          <footer>— Massimo Vignelli</footer>
        </blockquote>
      </div>
    </section>
  );
}

function IdukkiMap() {
  return (
    <svg viewBox="0 0 300 380" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="idukki-fill" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#9aaec2" />
          <stop offset="55%" stopColor="#4a5563" />
          <stop offset="100%" stopColor="#1c222b" />
        </linearGradient>
      </defs>

      <path className="hp-profile__taluk" d="M109.8,49.3L114.5,55.2L126.1,56.4L135.8,59.1L144.1,55.7L152.3,51.0L161.6,43.2L164.8,35.6L177.2,30.4L188.0,25.9L205.0,16.1L215.6,17.4L220.8,29.0L233.2,45.6L231.5,54.5L234.9,54.7L243.5,60.5L239.8,63.9L236.4,81.8L236.5,88.9L227.9,89.7L221.2,92.1L214.1,93.0L212.8,101.1L200.3,111.1L178.4,117.7L164.0,123.9L164.9,130.0L161.3,137.6L153.4,138.0L142.4,136.5L127.9,143.1L109.9,134.2L83.8,121.8L72.1,116.6L63.8,110.1L45.1,96.0L30.5,84.7L22.2,80.0L26.3,66.2L33.0,49.2L41.7,44.0L56.9,40.8L65.9,42.7L73.1,41.0L83.9,40.2L88.1,38.8L97.9,43.4L102.4,45.6L109.8,49.3Z" />
      <path className="hp-profile__taluk" d="M87.8,122.4L117.2,137.0L130.5,144.6L134.3,150.8L133.6,159.1L132.4,169.8L134.4,179.3L133.2,181.9L141.7,187.8L152.3,196.7L150.2,203.3L148.6,215.1L142.5,220.0L120.3,217.4L96.6,216.3L84.1,204.9L63.3,191.5L54.3,192.9L42.8,187.0L35.7,183.5L30.3,180.3L17.6,179.4L17.2,172.3L16.6,163.7L17.5,157.1L25.7,156.1L33.6,156.1L39.7,158.3L39.4,152.9L46.0,143.5L48.9,136.0L62.1,134.6L66.0,121.6L79.7,123.8L87.8,122.4Z" />
      <path className="hp-profile__taluk" d="M96.6,216.3L120.3,217.4L142.5,220.0L153.4,222.7L150.4,227.4L152.1,233.3L147.0,239.6L170.3,236.9L177.2,243.0L191.0,243.4L199.7,246.0L199.9,253.7L210.9,254.9L218.3,258.1L226.7,263.3L233.8,266.7L242.2,261.7L255.5,258.7L254.5,265.0L268.4,258.9L265.7,260.4L263.2,269.4L267.6,272.8L273.7,282.8L283.5,286.2L279.8,297.3L275.8,305.2L268.7,303.8L261.9,312.9L260.4,321.7L257.8,327.4L254.4,340.8L246.6,343.3L246.6,348.7L242.0,353.8L240.0,364.0L231.0,359.4L224.0,357.2L223.6,345.6L223.7,339.1L228.1,328.7L220.2,316.8L215.2,309.0L211.8,306.9L206.1,305.4L204.8,300.1L199.8,300.3L191.3,298.3L185.0,296.8L172.7,303.1L164.3,303.8L162.2,312.0L157.5,318.4L151.5,320.2L142.5,315.3L123.2,312.6L127.5,305.7L138.0,297.9L129.0,290.5L119.5,289.8L104.1,271.9L106.7,263.4L104.7,253.1L107.2,249.3L121.0,252.2L118.3,243.0L109.9,231.5L98.1,218.0L96.6,216.3Z" />
      <path
        className="hp-profile__taluk hp-profile__taluk--hot"
        d="M214.3,103.5L223.1,110.9L231.7,119.5L230.1,127.1L232.1,133.1L237.2,138.8L228.7,146.0L223.3,153.6L216.7,169.0L224.3,175.6L219.3,186.7L227.5,192.2L219.6,197.8L218.4,211.5L212.5,224.3L209.3,236.2L204.7,243.5L196.3,246.6L188.9,244.7L173.9,240.2L158.3,245.4L149.3,237.8L151.6,230.4L152.5,225.7L151.9,220.3L147.8,207.1L154.1,199.3L143.9,190.3L137.2,184.4L135.8,180.7L131.5,173.9L134.8,163.1L133.5,153.9L137.6,146.3L150.6,138.6L158.5,138.4L164.7,133.7L166.6,126.6L169.8,117.2L190.9,116.0L208.9,108.0L214.3,103.5Z"
      />

      <g className="hp-profile__marker" transform="translate(185.1 174.8)">
        <line x1="0" y1="0" x2="0" y2="-48" />
        <circle className="hp-profile__marker-tip" cx="0" cy="-48" r="2.15" />
        <circle className="hp-profile__marker-ring" cx="0" cy="0" r="9.5" />
        <circle className="hp-profile__marker-core" cx="0" cy="0" r="4.4" />
      </g>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 4v12M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
