import { screenshotUrl } from '../data/projects';
import './ProjectCard.css';
import './BuildCard.css';

export default function BuildCard({ build, onOpen }) {
  const isSale = build.kind === 'sale';
  const isLive = build.kind === 'live' && Boolean(build.url);
  const isSoon = build.kind === 'soon';
  const isCustom = build.kind === 'custom';

  const onActivate = () => {
    if (isSoon || isLive) return;
    onOpen(build);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <article
      className={`pp-card bp-card${isSoon ? ' is-soon' : ''}${isCustom ? ' is-custom' : ''}${isLive ? ' is-action is-live' : ''}${isSale || isCustom ? ' is-action' : ''}`}
      role={isSale || isCustom ? 'button' : undefined}
      tabIndex={isSale || isCustom ? 0 : undefined}
      onClick={onActivate}
      onKeyDown={isSale || isCustom ? onKeyDown : undefined}
    >
      <div className="pp-card__visual">
        {isSale ? (
          <img
            src={screenshotUrl(build.url)}
            alt={`Preview of ${build.title}`}
            className="pp-card__screenshot"
            loading="lazy"
          />
        ) : build.banner ? (
          <img
            src={build.banner}
            alt={`${build.title} preview`}
            className="pp-card__screenshot"
            loading="lazy"
          />
        ) : isLive && build.url ? (
          <img
            src={screenshotUrl(build.url)}
            alt={`Preview of ${build.title}`}
            className="pp-card__screenshot"
            loading="lazy"
          />
        ) : (
          <div className={`bp-card__art${isCustom ? ' bp-card__art--custom' : ''}`} aria-hidden="true">
            {isCustom ? <PlusMark /> : <SoonMark />}
          </div>
        )}

        {isSale ? (
          <div className="pp-card__overlay">
            <span className="pp-card__view">Inquire to buy</span>
          </div>
        ) : null}

        {isLive ? (
          <div className="pp-card__overlay">
            <a
              href={build.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-card__view"
            >
              Open live
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path
                  d="M2 11L11 2M11 2H5M11 2v6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        ) : null}

        <span
          className={`pp-card__badge${isSoon ? ' bp-card__badge--soon' : ''}${isLive ? ' bp-card__badge--live' : ''}${isCustom ? ' bp-card__badge--custom' : ''}`}
        >
          {isSale ? 'For sale' : isLive ? 'Live' : build.category}
        </span>
        <span className="pp-card__year">{build.year}</span>
      </div>

      <div className="pp-card__body">
        <h2 className="pp-card__title">{build.title}</h2>
        <p className="pp-card__desc">{build.description}</p>

        <div className="pp-card__tags">
          {build.tags.map((tag) => (
            <span key={tag} className="pp-card__tag">
              {tag}
            </span>
          ))}
        </div>

        {isSale ? (
          <span className="pp-card__link">
            Inquire to buy
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}

        {isLive ? (
          <a href={build.url} target="_blank" rel="noopener noreferrer" className="pp-card__link">
            Open live
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M2 11L11 2M11 2H5M11 2v6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ) : null}

        {isSoon ? <p className="bp-card__soon">Not for sale yet</p> : null}

        {isCustom ? (
          <span className="pp-card__link">
            Connect with me
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 11L11 2M11 2H5M11 2v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </div>
    </article>
  );
}

function SoonMark() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52">
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M32 18v16l10 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusMark() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52">
      <path d="M32 16v32M16 32h32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
