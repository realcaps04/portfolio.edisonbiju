import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Brand Identity — Renova',
    category: 'Branding',
    tags: ['Logo Design', 'Identity System'],
    year: '2025',
    color: '#0d2818',
    emoji: '💎',
  },
  {
    id: 2,
    title: 'Diamond Everyday',
    category: 'Visual Design',
    tags: ['3D Design', 'Brand Mark'],
    year: '2025',
    color: '#1a1800',
    emoji: '🔷',
  },
  {
    id: 3,
    title: 'NFT Worlds',
    category: 'Digital Art',
    tags: ['NFT', 'Concept Art'],
    year: '2024',
    color: '#1a0a00',
    emoji: '🌐',
  },
  {
    id: 4,
    title: 'Neon Suggestion',
    category: 'Typography',
    tags: ['3D Type', 'Neon'],
    year: '2024',
    color: '#120018',
    emoji: '✨',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="projects__inner">
        <div className="projects__header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 className="projects__title" id="projects-title">My Projects Highlight</h2>
          <a href="#contact" className="btn btn--outline projects__cta-top">
            Hire me
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <article
              className="project-card"
              key={project.id}
              style={{ '--card-bg': project.color }}
              aria-label={`Project: ${project.title}`}
            >
              {/* Placeholder visual */}
              <div className="project-card__visual">
                <span className="project-card__emoji" aria-hidden="true">{project.emoji}</span>
                <div className="project-card__overlay">
                  <button className="project-card__view" aria-label={`View ${project.title}`}>
                    View Project
                  </button>
                </div>
              </div>

              <div className="project-card__info">
                <div className="project-card__meta">
                  <span className="project-card__category">{project.category}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__footer">
          <a href="#contact" className="btn btn--primary">
            See all projects
          </a>
        </div>
      </div>
    </section>
  );
}
