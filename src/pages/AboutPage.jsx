import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutPage.css';

const STATS = [
  { value: '5+', label: 'Years Experience', icon: '🗓️' },
  { value: '80+', label: 'Projects Delivered', icon: '🚀' },
  { value: '40+', label: 'Happy Clients', icon: '🤝' },
  { value: '6', label: 'Live Web Apps', icon: '🌐' },
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
  'Figma', 'Adobe Illustrator', 'Photoshop', 'React', 'Vite',
  'HTML / CSS', 'JavaScript', 'Git & GitHub', 'Framer',
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
        <section className="ap-section ap-tools-section">
          <div className="ap-section__inner">
            <div className="ap-section__header">
              <span className="ap-eyebrow">My Stack</span>
              <h2 className="ap-section__title font-gropled">Tools &amp; Technologies</h2>
            </div>
            <div className="ap-tools">
              {TOOLS.map(tool => (
                <span className="ap-tool" key={tool}>{tool}</span>
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
              Say hello ✉️
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
