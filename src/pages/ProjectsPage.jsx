import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';
import './ProjectsPage.css';

const CATEGORIES = ['All', ...new Set(PROJECTS.map((p) => p.category))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="hp pp">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="projects-title">
        <div className="pp-hero__glow" aria-hidden="true" />

        <div className="pp-hero__inner">
          <p className="pp-label">Portfolio</p>
          <h1 className="pp-hero__title font-gropled" id="projects-title">
            Selected
            <span className="pp-hero__lime">Projects</span>
          </h1>
          <p className="pp-hero__sub">
            Real-world web apps, portals, and digital experiences — built with
            performance, design, and user experience at the core.
          </p>
          <div className="pp-hero__actions">
            <a className="pp-cta" href="mailto:edisonbijumullappallil@gmail.com">
              Get in Touch
            </a>
            <p className="pp-status">
              <span className="pp-status__dot" aria-hidden="true" />
              Available for Hire
            </p>
          </div>
        </div>
      </section>

      <div className="pp-filters" role="tablist" aria-label="Filter projects">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat}
            className={`pp-filter${activeCategory === cat ? ' is-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="pp-grid-section">
        <div className="pp-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="pp-bottom" aria-labelledby="pp-collab">
        <div className="pp-bottom__glow" aria-hidden="true" />
        <p className="pp-label">Let&apos;s collaborate</p>
        <h2 className="pp-bottom__title font-gropled" id="pp-collab">
          Got a project <span className="pp-hero__lime">in mind?</span>
        </h2>
        <p className="pp-bottom__sub">
          I&apos;d love to hear about it. Let&apos;s build something that actually feels good to use.
        </p>
        <a className="pp-cta" href="mailto:edisonbijumullappallil@gmail.com">
          Get in Touch
        </a>
      </section>
    </div>
  );
}
