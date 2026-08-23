import SiteHeader from '../components/SiteHeader';
import { useContactModal } from '../components/ContactModal';
import './AboutPage.css';

const CONTACT = [
  { label: 'edisonbijumullappallil@gmail.com', href: 'mailto:edisonbijumullappallil@gmail.com' },
  { label: '+91 79079 51080', href: 'tel:+917907951080' },
  { label: 'Idukki, Kerala, India' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edison-biju', external: true },
];

const SKILL_GROUPS = [
  {
    title: 'MERN & Web',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Responsive design'],
  },
  {
    title: 'Languages & Data',
    items: ['Python', 'PHP', 'MySQL', 'SQL', 'NoSQL', 'Data structures', 'Tableau'],
  },
  {
    title: 'Platforms & Ops',
    items: ['Git / GitHub', 'Vercel', 'Linux', 'Windows', 'macOS', 'Android', 'iOS'],
  },
  {
    title: 'Also',
    items: ['Cybersecurity', 'Ethical hacking', 'LAN / WAN', 'Technical writing', 'MS Office'],
  },
];

const SKILL_ICONS = {
  HTML5: { src: 'https://cdn.simpleicons.org/html5/E34F26' },
  CSS3: { src: 'https://cdn.simpleicons.org/css/1572B6' },
  JavaScript: { src: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  React: { src: 'https://cdn.simpleicons.org/react/61DAFB' },
  'Node.js': { src: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  'Express.js': { src: 'https://cdn.simpleicons.org/express/FFFFFF' },
  MongoDB: { src: 'https://cdn.simpleicons.org/mongodb/47A248' },
  'REST APIs': { src: 'https://cdn.simpleicons.org/postman/FF6C37' },
  Python: { src: 'https://cdn.simpleicons.org/python/3776AB' },
  PHP: { src: 'https://cdn.simpleicons.org/php/777BB4' },
  MySQL: { src: 'https://cdn.simpleicons.org/mysql/4479A1' },
  SQL: { src: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  NoSQL: { src: 'https://cdn.simpleicons.org/redis/FF4438' },
  'Git / GitHub': { src: 'https://cdn.simpleicons.org/github/FFFFFF' },
  Vercel: { src: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
  Linux: { src: 'https://cdn.simpleicons.org/linux/FCC624' },
  Android: { src: 'https://cdn.simpleicons.org/android/3DDC84' },
  iOS: { src: 'https://cdn.simpleicons.org/apple/FFFFFF' },
  macOS: { src: 'https://cdn.simpleicons.org/apple/FFFFFF' },
  'Ethical hacking': { src: 'https://cdn.simpleicons.org/kalilinux/557C94' },
  'Technical writing': { src: 'https://cdn.simpleicons.org/markdown/FFFFFF' },
  'LAN / WAN': { src: 'https://cdn.simpleicons.org/cisco/1BA0D7' },
};

function SkillIcon({ name }) {
  const remote = SKILL_ICONS[name];
  if (remote) {
    return <img src={remote.src} alt="" width="16" height="16" decoding="async" />;
  }

  if (name === 'Windows') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="#0078D4" d="M3 5.4 11.2 4.2v7.4H3V5.4zm9  -.3L21 3.5v8.1h-9V5.1zM3 13.2h8.2v7.4L3 19.4v-6.2zm9 0H21V21.4l-9-1.4v-6.8z" />
      </svg>
    );
  }

  if (name === 'Tableau') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="#E97627" d="M11.1 2h1.8v3.2h3.2v1.8h-3.2V10h-1.8V7h-3.2V5.2h3.2V2zM4 9.2h1.8v2.2H8v1.8H5.8V15.4H4v-2.2H1.8v-1.8H4V9.2zm12.2 0H18v2.2h2.2v1.8H18v2.2h-1.8v-2.2h-2.2v-1.8h2.2V9.2zM11.1 14h1.8v3.2h3.2V19h-3.2v3H11.1v-3H7.9V17.2h3.2V14z" />
      </svg>
    );
  }

  if (name === 'MS Office') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="#D83B01" d="M3 5.2 14.2 3v18L3 18.8V5.2zm12.4-.4 5.4 1.1v12.2l-5.4 1.1V4.8zM5.2 8.4h4.4V10H6.7v1.1h2.6v1.5H6.7v1.2h3V15H5.2V8.4z" />
      </svg>
    );
  }

  if (name === 'Responsive design') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <rect x="2" y="5" width="13" height="10" rx="1.4" fill="none" stroke="#93c5fd" strokeWidth="1.7" />
        <rect x="16" y="10" width="6" height="9" rx="1.1" fill="none" stroke="#ccff00" strokeWidth="1.7" />
      </svg>
    );
  }

  if (name === 'Data structures') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="5" r="2.1" fill="#ccff00" />
        <circle cx="6" cy="18" r="2.1" fill="#60a5fa" />
        <circle cx="18" cy="18" r="2.1" fill="#60a5fa" />
        <path d="M12 7.2v4.2M12 11.4 6.8 16.2M12 11.4l5.2 4.8" fill="none" stroke="#94a3b8" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === 'Cybersecurity') {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path d="M12 3.2 19 6v5.4c0 4.4-3 7.4-7 8.6-4-1.2-7-4.2-7-8.6V6l7-2.8z" fill="none" stroke="#22d3ee" strokeWidth="1.7" />
        <path d="M9.2 12.1 11.1 14l3.8-4" fill="none" stroke="#ccff00" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="#ccff00" strokeWidth="1.8" />
    </svg>
  );
}

const EXPERIENCE = [
  {
    role: 'State Bank Operations Executive',
    place: 'State Bank of India',
    dates: 'Sept 2025 – May 2026',
    points: [
      'Processed and verified NEFT, RTGS, IMPS, and cheque transactions.',
      'Supported account opening, KYC documentation, and accurate customer records.',
    ],
  },
  {
    role: 'Console Ecommerce — Final Project',
    place: 'RISS Technologies',
    dates: '2025',
    points: [
      'Built a terminal-based ecommerce flow that simulates a full shopping experience without a GUI.',
      'Developed during final-year training with a focus on complete order and catalog logic.',
    ],
  },
  {
    role: 'Technical Head',
    place: 'JPM Arts and Science College, Labbakkada',
    dates: '2022 – 2025',
    points: [
      'Looked after networks, hardware, and digital platforms used for academics.',
      'Coordinated technical workshops, events, and department projects.',
    ],
  },
  {
    role: 'Internship — Digital Products',
    place: 'Irohub Infotech, Cochin',
    dates: '2023',
    points: [
      'Worked across ideation, research, design, development, and launch of web and mobile products.',
      'Collaborated with product, UI/UX, engineering, and marketing teams.',
    ],
  },
  {
    role: 'Team Manager — Xenos',
    place: 'JPM Arts and Science College, Labbakkada',
    dates: '2022',
    points: [
      'Led the student tech team Xenos for IT competitions, workshops, and hackathons.',
    ],
  },
];

const WORK = [
  {
    title: 'Console Ecommerce',
    url: 'https://consoleonline.vercel.app/',
    blurb: 'Product listings, category browsing, and a modern shopping flow on a responsive frontend.',
  },
  {
    title: 'Givit',
    url: 'https://givit-online.vercel.app/',
    blurb: 'A gift store for curated boxes and personal picks — unique presents in one place.',
  },
  {
    title: 'This Portfolio',
    url: 'https://www.consoleprojectsbycaps.in/',
    blurb: 'Personal site for projects, skills, and MERN work, including Console and other web apps.',
  },
];

const EDUCATION = [
  {
    title: 'Bachelor of Computer Applications',
    place: 'Mahatma Gandhi University — JPM Arts and Science College, Labbakkada',
    dates: '2022 – 2025',
    blurb: 'Three-year full-time BCA covering programming, web technologies, software development, and business applications.',
  },
  {
    title: 'Higher Secondary — Bio Science',
    place: 'ST Thomas HSS Thankamany, Idukki · Kerala State Board',
    dates: '2022',
    blurb: 'Plus Two with Physics, Chemistry, Biology, and Mathematics.',
  },
];

const CERTS = [
  'Offenso Hackers Academy — Ethical Hacker Starter Program',
  'Full Stack Developer (MERN) — Entri App',
  'Web Development — Steyp',
];

const LANGUAGES = [
  { name: 'Malayalam', level: 'Read, write, speak' },
  { name: 'English', level: 'Read, write, speak' },
  { name: 'Hindi', level: 'Read, write, speak' },
  { name: 'Tamil', level: 'Speak' },
];

const RESUME = '/Resume_EDISON_BIJU.pdf';

export default function AboutPage() {
  const { openContact } = useContactModal();

  return (
    <div className="hp ab">
      <SiteHeader />

      <section className="ab-hero" aria-labelledby="about-title">
        <div className="ab-hero__glow" aria-hidden="true" />
        <div className="ab-hero__inner">
          <div className="ab-hero__copy">
            <p className="ab-label">About</p>
            <h1 className="ab-hero__title font-gropled" id="about-title">
              Edison <span className="ab-lime">Biju</span>
            </h1>
            <p className="ab-hero__role">
              <span>Full Stack Developer</span>
              <span>based in Idukki, Kerala</span>
            </p>
            <p className="ab-hero__summary">
              Recent BCA graduate from JPM Arts and Science College, Labbakkada (Mahatma Gandhi
              University). Self-taught across HTML, CSS, JavaScript, Node.js, Python, PHP, and MySQL,
              with a strong eye for design and user experience. Looking for an entry-level software
              developer or designer role where I can ship real product.
            </p>
            <div className="ab-hero__actions">
              <button type="button" className="ab-btn" onClick={() => openContact('about-hero')}>
                Get in Touch
              </button>
              <a className="ab-btn ab-btn--ghost" href={RESUME} download="Edison_Biju_Resume.pdf">
                Download Resume
              </a>
              <p className="ab-status">
                <span className="ab-status__dot" aria-hidden="true" />
                Open to work
              </p>
            </div>
          </div>

          <aside className="ab-card" aria-label="Contact">
            <p className="ab-card__kicker">Connect</p>
            <ul className="ab-card__list">
              {CONTACT.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
            <a className="ab-card__resume" href={RESUME} download="Edison_Biju_Resume.pdf">
              Resume PDF
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 1.5v7M4 6.2l2.5 2.5L9 6.2M2 11.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </aside>
        </div>
      </section>

      <section className="ab-block" aria-labelledby="skills-title">
        <p className="ab-label">Skills</p>
        <h2 className="ab-title font-gropled" id="skills-title">
          What I work <span className="ab-lime">with</span>
        </h2>
        <div className="ab-skills">
          {SKILL_GROUPS.map((group) => (
            <article className="ab-skill" key={group.title}>
              <h3>{group.title}</h3>
              <div className="ab-chips">
                {group.items.map((item) => (
                  <span key={item}>
                    <SkillIcon name={item} />
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ab-block" aria-labelledby="exp-title">
        <p className="ab-label">Experience</p>
        <h2 className="ab-title font-gropled" id="exp-title">
          Roles &amp; <span className="ab-lime">training</span>
        </h2>
        <ol className="ab-timeline">
          {EXPERIENCE.map((job) => (
            <li key={job.role}>
              <p className="ab-timeline__meta">
                <span>{job.dates}</span>
                <span>{job.place}</span>
              </p>
              <h3>{job.role}</h3>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="ab-block" aria-labelledby="work-title">
        <p className="ab-label">Selected work</p>
        <h2 className="ab-title font-gropled" id="work-title">
          Live <span className="ab-lime">projects</span>
        </h2>
        <div className="ab-work">
          {WORK.map((item) => (
            <a
              className="ab-work__card"
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
              <span>Open live</span>
            </a>
          ))}
        </div>
      </section>

      <section className="ab-block ab-split" aria-labelledby="edu-title">
        <div>
          <p className="ab-label">Education</p>
          <h2 className="ab-title font-gropled" id="edu-title">
            School &amp; <span className="ab-lime">degree</span>
          </h2>
          <div className="ab-edu">
            {EDUCATION.map((item) => (
              <article key={item.title}>
                <p>{item.dates}</p>
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <p>{item.blurb}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="ab-label">Also</p>
          <h2 className="ab-title font-gropled" id="certs-title">
            Certs &amp; <span className="ab-lime">languages</span>
          </h2>
          <ul className="ab-certs">
            {CERTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="ab-langs">
            {LANGUAGES.map((item) => (
              <p key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.level}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-bottom" aria-labelledby="ab-collab">
        <div className="ab-bottom__glow" aria-hidden="true" />
        <p className="ab-label">Let&apos;s collaborate</p>
        <h2 className="ab-title font-gropled" id="ab-collab">
          Got a role <span className="ab-lime">in mind?</span>
        </h2>
        <p className="ab-bottom__sub">
          I&apos;m looking for a software developer or designer seat. Send a note — I&apos;ll reply fast.
        </p>
        <div className="ab-hero__actions">
          <button type="button" className="ab-btn" onClick={() => openContact('about-cta')}>
            Get in Touch
          </button>
          <a className="ab-btn ab-btn--ghost" href={RESUME} download="Edison_Biju_Resume.pdf">
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
}
