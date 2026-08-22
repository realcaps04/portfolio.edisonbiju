import { screenshotUrl } from '../data/projects';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <article className="pp-card">
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
            className="pp-card__view"
          >
            Open Live
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <span className="pp-card__badge">{project.category}</span>
        <span className="pp-card__year">{project.year}</span>
      </div>

      <div className="pp-card__body">
        <h2 className="pp-card__title">{project.title}</h2>
        <p className="pp-card__desc">{project.description}</p>

        <div className="pp-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="pp-card__tag">{tag}</span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pp-card__link"
        >
          View Live Project
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
