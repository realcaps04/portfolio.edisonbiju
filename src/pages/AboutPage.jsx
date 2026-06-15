import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';

const STATS = [
  {
    value: '5+',
    label: 'Years Experience',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    value: '80+',
    label: 'Projects Delivered',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    value: '40+',
    label: 'Happy Clients',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    value: '6',
    label: 'Live Web Apps',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

const SKILLS = [
  { name: 'Logo Design', level: 95 },
  { name: 'Visual Identity', level: 92 },
  { name: 'Web Development', level: 88 },
  { name: 'UI / UX Design', level: 85 },
  { name: 'React & Vite', level: 87 },
  { name: 'Brand Strategy', level: 80 },
];

const SERVICES = [
  {
    icon: '✦',
    title: 'Brand Identity',
    desc: 'Full identity systems — logo, colour palette, typography, brand guidelines — built to scale across every touchpoint.',
  },
  {
    icon: '⬡',
    title: 'Web Development',
    desc: 'Fast, responsive, and beautifully designed web apps using React, Vite and modern CSS. From landing pages to dashboards.',
  },
  {
    icon: '◈',
    title: 'UI / UX Design',
    desc: 'User interfaces that feel intuitive and look stunning. Wireframes, prototypes, and pixel-perfect final designs.',
  },
  {
    icon: '◎',
    title: 'Creative Direction',
    desc: 'Strategic visual direction for campaigns, social media, and digital presence — with a consistent, recognisable voice.',
  },
];

const TOOLS = [
  {
    name: 'Figma',
    color: '#F24E1E',
    logo: (
      <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5C19 23.25 23.25 19 28.5 19C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.75 19 38 14.75 38 9.5C38 4.25 33.75 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.75 4.25 19 9.5 19H19V0H9.5C4.25 0 0 4.25 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.75 4.25 38 9.5 38H19V19H9.5C4.25 19 0 23.25 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'Adobe Illustrator',
    color: '#FF9A00',
    logo: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="234" rx="42" fill="#300000"/>
        <path d="M106 176H79l-9 29H46l41-122h28l42 122h-24l-9-29H106zm-22-19h18l-9-30-9 30z" fill="#FF9A00"/>
        <path d="M171 98c9 0 17 3 22 9l-10 13c-3-4-7-6-12-6-10 0-17 8-17 21s7 21 17 21c5 0 9-2 12-6l10 13c-5 6-13 9-22 9-21 0-35-16-35-37s14-37 35-37z" fill="#FF9A00"/>
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    color: '#31A8FF',
    logo: (
      <svg viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="234" rx="42" fill="#001D34"/>
        <path d="M54 164V68h37c10 0 18 3 24 8s9 13 9 22c0 10-3 18-9 23s-14 8-25 8H76v35H54zm22-52h14c5 0 9-1 12-4s4-7 4-12-1-9-4-12-7-4-12-4H76v32zm74 55c-8 0-15-2-20-5l6-15c4 3 9 5 15 5 3 0 6-1 7-2 2-2 3-4 3-6 0-3-1-5-3-7s-6-4-11-6c-7-3-12-6-15-10s-5-9-5-15c0-8 3-14 8-19s12-7 21-7c7 0 13 1 18 4l-5 14c-4-2-8-3-13-3-3 0-5 1-7 2-2 2-3 4-3 6 0 2 1 4 3 6s6 4 12 6c7 3 12 6 15 10s5 9 5 16c0 8-3 15-9 20s-14 6-23 6z" fill="#31A8FF"/>
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61DAFB',
    logo: (
      <svg viewBox="-11.5 -10.23 23 20.46" xmlns="http://www.w3.org/2000/svg">
        <circle r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  },
  {
    name: 'Vite',
    color: '#646CFF',
    logo: (
      <svg viewBox="0 0 410 404" xmlns="http://www.w3.org/2000/svg">
        <path d="M399 59L215 388l-22-39L358 59h41z" fill="#41D1FF"/>
        <path d="M357 59L205 340 52 59H176l29 52 29-52H357z" fill="url(#vg)"/>
        <defs>
          <linearGradient id="vg" x1="6%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#41D1FF"/>
            <stop offset="100%" stopColor="#BD34FE"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'HTML5',
    color: '#E34F26',
    logo: (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M71 460L30 0h452l-41 460-185 52L71 460z" fill="#E44D26"/>
        <path d="M256 480l149-41 35-396H256v437z" fill="#F16529"/>
        <path d="M256 208h-75l-5-58h80V94H115l14 156h127v-42zm0 93l-64 18-4-49h-56l8 91 116 32 0-92z" fill="#EBEBEB"/>
        <path d="M256 208v42h70l-7 73-63 17v57l116-32 8-91-9-66H256zm0-114v56h137l4-56H256z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'CSS3',
    color: '#1572B6',
    logo: (
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path d="M71 460L30 0h452l-41 460-185 52L71 460z" fill="#1572B6"/>
        <path d="M256 480l149-41 35-396H256v437z" fill="#33A9DC"/>
        <path d="M114 94h142v56H176l4 45h80v56H122L114 94zm22 150h57l4 45 59 16v59l-116-32-4-88z" fill="#fff"/>
        <path d="M256 94h142l-14 157H256v-56h70l-5-45H256V94zm0 150h63l-6 70-57 15v-59l34-9 2-17H256v-42-17z" fill="#EBEBEB"/>
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    color: '#F7DF1E',
    logo: (
      <svg viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="630" height="630" fill="#F7DF1E"/>
        <path d="M423 492c9 16 22 28 43 28 18 0 30-9 30-22 0-15-12-21-32-29l-11-5c-32-14-53-31-53-67 0-33 25-58 65-58 28 0 48 10 63 36l-34 22c-8-14-16-19-28-19-13 0-21 8-21 19 0 14 8 19 28 28l11 5c37 16 59 33 59 70 0 40-31 61-73 61-41 0-68-20-81-46l35-23zm-175 4c7 12 13 22 27 22 14 0 22-5 22-26V310h43v184c0 43-25 62-62 62-33 0-53-17-63-38l33-22z" fill="#000"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    logo: (
      <svg viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
        <rect width="630" height="630" fill="#3178C6"/>
        <path d="M350 362v35c6 3 13 5 20 6s15 2 23 2c7 0 14-1 20-2 7-1 12-4 17-7 5-3 9-8 12-13 3-6 4-13 4-21 0-6-1-11-3-16s-5-9-8-12c-4-4-8-7-13-9-5-3-10-5-17-8l-11-4c-3-1-5-2-8-3-2-1-4-2-5-4-2-1-3-3-4-5-1-1-1-3-1-6 0-2 1-4 2-6 1-1 2-3 4-4s4-2 6-2c2-1 5-1 8-1 2 0 5 0 7 1 3 0 5 1 7 2 3 1 5 2 7 3v-33c-4-1-9-2-13-3-5-1-10-1-16-1-7 0-14 1-20 3s-12 4-16 8c-5 3-9 8-11 13-3 5-4 12-4 19 0 10 3 18 8 24s13 11 23 16l12 5c4 1 7 3 9 4 3 2 5 3 6 5s2 4 2 7-1 5-2 7c-1 1-3 3-5 4s-4 2-6 2c-3 1-5 1-8 1-5 0-11-1-16-3-6-2-11-5-16-9zm-59-73H354v-33H233v33h56v153h42V289z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    color: '#339933',
    logo: (
      <svg viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L0 74v141l128 74 128-74V74L128 0z" fill="#339933"/>
        <path d="M128 18l110 63v127l-110 63L18 208V81L128 18z" fill="#fff" fillOpacity=".05"/>
        <path d="M128 57c-5 0-9 3-9 8v90l-42 24c-4 2-5 8-3 12 2 3 5 5 9 5 2 0 3 0 5-1l47-27c3-1 5-5 5-8V65c0-5-4-8-9-8h-3z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#3776AB',
    logo: (
      <svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pyB" x1="12%" y1="12%" x2="88%" y2="88%">
            <stop offset="0%" stopColor="#387EB8"/>
            <stop offset="100%" stopColor="#366994"/>
          </linearGradient>
          <linearGradient id="pyY" x1="12%" y1="12%" x2="88%" y2="88%">
            <stop offset="0%" stopColor="#FFE052"/>
            <stop offset="100%" stopColor="#FFC331"/>
          </linearGradient>
        </defs>
        <path d="M126 0C60 0 64 28 64 28l0 29h64v9H40S0 61 0 128s35 64 35 64h21V164s-1-35 34-35h60s33 1 33-32V34S149 0 126 0zm-14 19c6 0 11 5 11 12s-5 12-11 12-11-5-11-12 5-12 11-12z" fill="url(#pyB)"/>
        <path d="M129 255c66 0 63-28 63-28l0-29h-64v-9h88s40 5 40-62-35-64-35-64h-21v28s1 35-34 35H106s-33-1-33 32v54s-5 43 56 43zm14-19c-6 0-11-5-11-12s5-12 11-12 11 5 11 12-5 12-11 12z" fill="url(#pyY)"/>
      </svg>
    ),
  },
  {
    name: 'Tailwind',
    color: '#06B6D4',
    logo: (
      <svg viewBox="0 0 256 154" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="twg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2298BD"/>
            <stop offset="100%" stopColor="#0ED7B5"/>
          </linearGradient>
        </defs>
        <path d="M128 0C93 0 72 18 64 53c13-18 27-24 43-18 9 4 16 11 23 19 12 13 26 28 56 28 35 0 56-18 64-53-13 18-27 24-43 18-9-4-16-11-23-19C172 15 158 0 128 0zM64 77C29 77 8 95 0 130c13-18 27-24 43-18 9 4 16 11 23 19 12 13 26 28 56 28 35 0 56-18 64-53-13 18-27 24-43 18-9-4-16-11-23-19C108 92 94 77 64 77z" fill="url(#twg)"/>
      </svg>
    ),
  },
  {
    name: 'Git',
    color: '#F05032',
    logo: (
      <svg viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 42L50 2a6 6 0 00-8 0L33 11l10 10a7 7 0 019 9l10 10a7 7 0 11-4 4L48 34v25a7 7 0 11-6 0V33l-10-10a7 7 0 010-9L23 5 2 26a6 6 0 000 8l40 40a6 6 0 008 0l40-40a6 6 0 000-8l-0 0z" fill="#F05032"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    color: '#181717',
    logo: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717"/>
      </svg>
    ),
  },
  {
    name: 'ChatGPT',
    color: '#10A37F',
    logo: (
      <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" fill="#10A37F">
        <path d="M37.5 16.5a9 9 0 00-.7-3.5A9.4 9.4 0 0027.6 7a9.3 9.3 0 00-7-3.1 9.4 9.4 0 00-8.9 6.5A9.3 9.3 0 006.2 16a9.4 9.4 0 00-2.7 9.5A9.4 9.4 0 003.2 29a9.4 9.4 0 009.2 6.1 9.3 9.3 0 007 3.1 9.4 9.4 0 008.9-6.5A9.3 9.3 0 0034.8 25a9.4 9.4 0 002.7-8.5zm-14 19.6a7 7 0 01-4.5-1.6l.2-.1 7.5-4.3a1.2 1.2 0 00.6-1.1v-10.5l3.2 1.8v.1a7 7 0 01-7 15.7zm-15-6.4a7 7 0 01-.8-4.7v-.2l7.5 4.3a1.2 1.2 0 001.2 0l9.1-5.3v3.6l-9.2 5.3a7 7 0 01-7.8-3zm-1.9-16.2A7 7 0 0110 10l.1.1v8.7a1.2 1.2 0 00.6 1l9.1 5.3-3.2 1.8h-.1L9 21.7a7 7 0 01-2.4-8.2zm23.8 6l-9.1-5.3 3.2-1.8h.1l7.5 4.3a7 7 0 01-1.1 12.6v-8.7a1.2 1.2 0 00-.6-1.1zm3.1-4.7l-.2-.1-7.5-4.3a1.2 1.2 0 00-1.2 0l-9.1 5.3V12l9.2-5.3a7 7 0 0110.5 7.2l-.3-.1h.1-.2.1-.1.1-.2l.1-.1.1.1h-.1zm-19.8 6.5l-3.2-1.8V16a7 7 0 0111.5-5.4l-.2.1-7.5 4.3a1.2 1.2 0 00-.6 1.1v10.5zm1.7-3.7l4-2.3 4 2.3v4.6l-4 2.3-4-2.3v-4.6z"/>
      </svg>
    ),
  },
  {
    name: 'Framer',
    color: '#0055FF',
    logo: (
      <svg viewBox="0 0 14 21" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h14v7H7L0 0zm0 7h7l7 7H7v7L0 14V7z" fill="#0055FF"/>
      </svg>
    ),
  },
  {
    name: 'VS Code',
    color: '#007ACC',
    logo: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <mask id="vsm">
          <rect width="100" height="100" rx="15" fill="white"/>
          <path d="M70 5l-40 40 20 20 20-20V5z" fill="black"/>
        </mask>
        <rect width="100" height="100" rx="15" fill="#007ACC"/>
        <path d="M72 4L37 40l-22-17L5 31v38l10 8 22-17 35 36 18-9V13L72 4z" fill="white"/>
        <path d="M72 26v48L52 50l20-24zM15 62V38l17 12-17 12z" fill="#007ACC"/>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page">

        {/* ── Hero Banner ── */}
        <section className="ap-hero">
          <div className="ap-hero__glow ap-hero__glow--1" />
          <div className="ap-hero__glow ap-hero__glow--2" />
          <div className="ap-hero__inner">
            <div className="ap-hero__text">
              <span className="ap-eyebrow">About me</span>
              <h1 className="ap-hero__title font-gropled">
                Designer. Developer.<br />
                <span className="ap-hero__title--grad">Problem Solver.</span>
              </h1>
              <p className="ap-hero__sub">
                I'm Edison Biju — a brand &amp; visual designer based in Kerala, India, specialising in
                logo design, visual identity systems, web development, and creative direction.
                I help startups and established businesses find their visual voice and build a
                digital presence that lasts.
              </p>
              <div className="ap-hero__actions">
                <a href="mailto:edisonbijumullappallil@gmail.com" className="btn btn--primary">
                  Get in touch
                </a>
                <Link to="/" className="btn btn--ghost ap-back">
                  ← Back to home
                </Link>
              </div>
            </div>

            <div className="ap-hero__image-wrap">
              <div className="ap-hero__img-glow" />
              <div className="ap-hero__img-card">
                <img src="/profile.jpg" alt="Edison Biju" className="ap-hero__img" />
              </div>
              <div className="ap-hero__badge">
                <span className="ap-hero__badge-dot" />
                Open to work
              </div>
              <div className="ap-hero__tag ap-hero__tag--tl">Brand &amp; Design</div>
              <div className="ap-hero__tag ap-hero__tag--br">Web Dev</div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="ap-stats">
          <div className="ap-stats__inner">
            {STATS.map(({ value, label, icon }) => (
              <div className="ap-stat" key={label}>
                <span className="ap-stat__icon">{icon}</span>
                <span className="ap-stat__value">{value}</span>
                <span className="ap-stat__label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="ap-section ap-skills-section">
          <div className="ap-section__inner">
            <div className="ap-section__header">
              <span className="ap-eyebrow">Expertise</span>
              <h2 className="ap-section__title font-gropled">Skills &amp; Proficiency</h2>
            </div>
            <div className="ap-skills">
              {SKILLS.map(({ name, level }) => (
                <div className="ap-skill" key={name}>
                  <div className="ap-skill__meta">
                    <span className="ap-skill__name">{name}</span>
                    <span className="ap-skill__pct">{level}%</span>
                  </div>
                  <div className="ap-skill__track">
                    <div
                      className="ap-skill__bar"
                      style={{ '--w': `${level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="ap-section ap-services-section">
          <div className="ap-section__inner">
            <div className="ap-section__header">
              <span className="ap-eyebrow">What I do</span>
              <h2 className="ap-section__title font-gropled">Services</h2>
            </div>
            <div className="ap-services">
              {SERVICES.map(({ icon, title, desc }) => (
                <div className="ap-service" key={title}>
                  <span className="ap-service__icon">{icon}</span>
                  <h3 className="ap-service__title">{title}</h3>
                  <p className="ap-service__desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tools ── */}
        <section className="ap-tools-section">
          <div className="ap-section__header" style={{ marginBottom: '2.5rem' }}>
            <span className="ap-eyebrow">My Stack</span>
            <h2 className="ap-section__title font-gropled">Tools &amp; Technologies</h2>
          </div>
          {/* Marquee track — duplicated for seamless infinite loop */}
          <div className="ap-marquee">
            <div className="ap-marquee__track">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <div className="ap-tool" key={i}>
                  <span className="ap-tool__logo">{tool.logo}</span>
                  <span className="ap-tool__name">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ap-cta">
          <div className="ap-cta__glow" />
          <div className="ap-cta__inner">
            <span className="ap-eyebrow">Let's collaborate</span>
            <h2 className="ap-cta__title font-gropled">
              Ready to build something<br />
              <span className="ap-cta__title--grad">remarkable?</span>
            </h2>
            <p className="ap-cta__sub">
              Whether it's a brand identity, a web app, or a bold new concept —
              I'd love to hear about your project.
            </p>
            <a href="mailto:edisonbijumullappallil@gmail.com" className="btn btn--primary ap-cta__btn">
              Say hello
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
