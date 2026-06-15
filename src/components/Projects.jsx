import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Console — Project Dashboard',
    category: 'Web App',
    year: '2025',
    description: 'A comprehensive open-source project management dashboard to manage projects, track analytics, and collaborate with your team.',
    tags: ['React', 'Dashboard', 'Analytics', 'Open Source'],
    url: 'https://consoleonline.vercel.app/',
    accent: '#16a34a',
  },
  {
    id: 2,
    title: 'JPM Arts & Science College',
    category: 'Education',
    year: '2025',
    description: 'Official website for a NAAC B++ accredited institution affiliated to MG University, featuring admissions, academics, and campus life.',
    tags: ['React', 'Education', 'Responsive', 'SEO'],
    url: 'https://jpm-college.vercel.app/',
    accent: '#2563eb',
  },
  {
    id: 3,
    title: 'Kerala PSC Thulasi Portal',
    category: 'Gov Portal',
    year: '2024',
    description: 'Official login portal for Kerala Public Service Commission — One-Time Registration system for government job aspirants across Kerala.',
    tags: ['React', 'Gov', 'OTR System', 'Portal'],
    url: 'https://kerala-psc.vercel.app/',
    accent: '#dc2626',
  },
  {
    id: 4,
    title: 'Concept Admin Panel',
    category: 'UI Design',
    year: '2024',
    description: 'A sleek, secure admin portal login concept featuring animated cursor elements, glassmorphism card design, and modern authentication UX.',
    tags: ['HTML/CSS', 'Admin', 'Glassmorphism', 'Animation'],
    url: 'https://concept-admin.vercel.app/',
    accent: '#7c3aed',
  },
  {
    id: 5,
    title: 'TVA — Ruling the Streets',
    category: 'Community',
    year: '2024',
    description: 'A bold, high-energy landing page for the TVA Family crew dominating GTA RP. Designed with street aesthetics and immersive visuals.',
    tags: ['React', 'Gaming', 'Landing Page', 'Dark UI'],
    url: 'https://official-tva-online.vercel.app/',
    accent: '#ea580c',
  },
  {
    id: 6,
    title: 'Console Invoice Generator',
    category: 'Productivity',
    year: '2025',
    description: 'Professional invoice generator for Console Projects — create, preview, and export polished invoices with a clean, minimal interface.',
    tags: ['React', 'Invoice', 'PDF Export', 'Finance'],
    url: 'https://console-billing.vercel.app/',
    accent: '#0891b2',
  },
];

// Live screenshot via Microlink API (free, no key needed)
const screenshotUrl = (siteUrl) =>
  `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&screenshot=true&meta=false&embed=screenshot.url`;

export default function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="projects__inner">
        <div className="projects__header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="projects__title font-gropled" id="projects-title">My Projects Highlight</h2>
          <p className="projects__subtitle">
            A selection of real-world web apps built with performance, design, and user experience in mind.
          </p>
          <a href="#contact" className="btn btn--outline projects__cta-top">
            Hire me
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="projects__grid">
          {PROJECTS.slice(0, 4).map((project) => (
            <article
              className="project-card"
              key={project.id}
              style={{ '--card-accent': project.accent }}
              aria-label={`Project: ${project.title}`}
            >
              {/* Screenshot preview */}
              <div className="project-card__visual">
                <img
                  src={screenshotUrl(project.url)}
                  alt={`Screenshot of ${project.title}`}
                  className="project-card__screenshot"
                  loading="lazy"
                />
                <div className="project-card__overlay">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card__view"
                    aria-label={`View ${project.title}`}
                  >
                    View Project ↗
                  </a>
                </div>
                <span className="project-card__category-badge">{project.category}</span>
              </div>

              {/* Info */}
              <div className="project-card__info">
                <div className="project-card__meta">
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__year">{project.year}</span>
                </div>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                >
                  <span>View Live</span>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__footer">
          <a href="#contact" className="btn btn--primary">
            Let&apos;s build something together
          </a>
        </div>
      </div>
    </section>
  );
}
