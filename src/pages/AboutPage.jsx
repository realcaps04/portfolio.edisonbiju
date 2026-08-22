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
    url: 'https://portfolio-edisonbiju.vercel.app/',
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
                  <span key={item}>{item}</span>
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
