import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProjectsPage.css';

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Console — Project Dashboard',
    category: 'Web App',
    year: '2025',
    description:
      'A comprehensive open-source project management dashboard to manage projects, track analytics, and collaborate with your team in real time. Built with a modern React architecture and a clean, developer-friendly UI.',
    tags: ['React', 'Dashboard', 'Analytics', 'Open Source'],
    url: 'https://consoleonline.vercel.app/',
    accent: '#16a34a',
    highlights: ['Real-time analytics', 'Team collaboration', 'Open source', 'Responsive design'],
  },
  {
    id: 2,
    title: 'JPM Arts & Science College',
    category: 'Education',
    year: '2025',
    description:
      'Official website for a NAAC B++ accredited institution affiliated to MG University. Features admissions info, academics, campus life, and a fully responsive design optimised for SEO and accessibility.',
    tags: ['React', 'Education', 'Responsive', 'SEO'],
    url: 'https://jpm-college.vercel.app/',
    accent: '#2563eb',
    highlights: ['NAAC B++ accredited', 'MG University affiliated', 'SEO optimised', 'Mobile first'],
  },
  {
    id: 3,
    title: 'Kerala PSC Thulasi Portal',
    category: 'Gov Portal',
    year: '2024',
    description:
      'Official login portal for Kerala Public Service Commission — a One-Time Registration system for government job aspirants across Kerala. Designed for clarity, accessibility, and trust.',
    tags: ['React', 'Gov', 'OTR System', 'Portal'],
    url: 'https://kerala-psc.vercel.app/',
    accent: '#dc2626',
    highlights: ['One-Time Registration', 'Government grade UI', 'Accessibility focused', 'Secure auth flow'],
  },
  {
    id: 4,
    title: 'Concept Admin Panel',
    category: 'UI Design',
    year: '2024',
    description:
      'A sleek, secure admin portal login concept featuring animated floating cursor elements, glassmorphism card design, and a modern authentication UX. A showcase of premium UI design patterns.',
    tags: ['HTML/CSS', 'Admin', 'Glassmorphism', 'Animation'],
    url: 'https://concept-admin.vercel.app/',
    accent: '#7c3aed',
    highlights: ['Glassmorphism UI', 'Cursor animation', 'Premium login UX', 'Pure HTML/CSS'],
  },
  {
    id: 5,
    title: 'TVA — Ruling the Streets',
    category: 'Community',
    year: '2024',
    description:
      'A bold, high-energy landing page for the TVA Family crew dominating GTA RP. Designed with street aesthetics, dark immersive visuals, and dynamic animations that match the crew\'s identity.',
    tags: ['React', 'Gaming', 'Landing Page', 'Dark UI'],
    url: 'https://official-tva-online.vercel.app/',
    accent: '#ea580c',
    highlights: ['GTA RP community', 'Dark aesthetic UI', 'Dynamic animations', 'Crew identity'],
  },
  {
    id: 6,
    title: 'Console Invoice Generator',
    category: 'Productivity',
    year: '2025',
    description:
      'A professional invoice generator for Console Projects — create, preview, and export polished invoices with a clean, minimal interface. Supports custom line items, branding, and PDF export.',
    tags: ['React', 'Invoice', 'PDF Export', 'Finance'],
    url: 'https://console-billing.vercel.app/',
    accent: '#0891b2',
    highlights: ['PDF export', 'Custom branding', 'Line item editor', 'Print-ready layouts'],
  },
];

const CATEGORIES = ['All', ...new Set(ALL_PROJECTS.map(p => p.category))];

const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="projects-page">

        {/* ── Hero Banner ── */}
        <section className="pp-hero">
          <div className="pp-hero__glow pp-hero__glow--1" />
          <div className="pp-hero__glow pp-hero__glow--2" />
          <div className="pp-hero__inner">
            <Link to="/" className="pp-back">← Back to home</Link>
            <span className="pp-eyebrow">Portfolio</span>
            <h1 className="pp-hero__title font-gropled">
              All Projects
            </h1>
            <p className="pp-hero__sub">
              A collection of real-world web apps, portals, and digital experiences —
              built with performance, design, and user experience at the core.
            </p>
          </div>
        </section>

        {/* ── Filter Pills ── */}
        <div className="pp-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pp-filter${activeCategory === cat ? ' pp-filter--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Projects Grid ── */}
        <section className="pp-grid-section">
          <div className="pp-grid">
            {filtered.map(project => (
              <article
                key={project.id}
                className="pp-card"
                style={{ '--accent': project.accent }}
              >
                {/* Screenshot */}
                <div className="pp-card__visual">
                  <img
                    src={screenshotUrl(project.url)}
                    alt={`Screenshot of ${project.title}`}
                    className="pp-card__screenshot"
                    loading="lazy"
                  />
                  <div className="pp-card__overlay">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-card__view-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Open Live
                    </a>
                  </div>
                  <span className="pp-card__badge">{project.category}</span>
                  <span className="pp-card__year">{project.year}</span>
                </div>

                {/* Info */}
                <div className="pp-card__body">
                  <h2 className="pp-card__title">{project.title}</h2>
                  <p className="pp-card__desc">{project.description}</p>

                  {/* Highlights */}
                  <ul className="pp-card__highlights">
                    {project.highlights.map(h => (
                      <li key={h}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="pp-card__tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="pp-card__tag">{tag}</span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pp-card__link"
                    style={{ color: project.accent }}
                  >
                    View Live Project
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pp-cta">
          <div className="pp-cta__glow" />
          <div className="pp-cta__inner">
            <span className="pp-eyebrow pp-eyebrow--light">Let's collaborate</span>
            <h2 className="pp-cta__title font-gropled">
              Got a project in mind?
            </h2>
            <p className="pp-cta__sub">
              I'd love to hear about it. Let's build something remarkable together.
            </p>
            <a href="mailto:edisonbijumullappallil@gmail.com" className="btn btn--primary pp-cta__btn">
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
