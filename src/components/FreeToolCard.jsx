import './ProjectCard.css';
import './BuildCard.css';
import './FreeToolCard.css';

export default function FreeToolCard({ tool }) {
  const hero = tool.hero;

  return (
    <article className="pp-card bp-card is-soon fp-card">
      <div className="pp-card__visual">
        <div className={`fp-hero fp-hero--${hero?.tone || tool.icon}`} aria-hidden="true">
          <div className="fp-hero__nav">
            <span className="fp-hero__brand">{hero?.brand || tool.title}</span>
            <span className="fp-hero__nav-links">
              <i />
              <i />
              <i />
            </span>
            <span className="fp-hero__nav-cta">{hero?.cta || 'Open'}</span>
          </div>

          <div className="fp-hero__body">
            <div className="fp-hero__copy">
              <p className="fp-hero__kicker">{hero?.kicker}</p>
              <h3 className="fp-hero__headline">{hero?.headline}</h3>
              <p className="fp-hero__sub">{hero?.sub}</p>
              <span className="fp-hero__btn">{hero?.cta || 'Open free'}</span>
            </div>
            <div className="fp-hero__stage">
              <HeroStage tone={hero?.tone || tool.icon} />
            </div>
          </div>
        </div>
        <span className="pp-card__badge bp-card__badge--soon">Upcoming</span>
        <span className="pp-card__year">{tool.year}</span>
      </div>

      <div className="pp-card__body">
        <h2 className="pp-card__title">{tool.title}</h2>
        <p className="pp-card__desc">{tool.description}</p>

        <div className="pp-card__tags">
          {tool.tags.map((tag) => (
            <span key={tag} className="pp-card__tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="bp-card__soon">Coming soon</p>
      </div>
    </article>
  );
}

function HeroStage({ tone }) {
  switch (tone) {
    case 'pdf':
      return (
        <div className="fp-stage fp-stage--pdf">
          <div className="fp-stage__doc">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="fp-stage__doc is-back">
            <span />
            <span />
          </div>
        </div>
      );
    case 'img':
      return (
        <div className="fp-stage fp-stage--img">
          <div className="fp-stage__frame">
            <div className="fp-stage__photo" />
            <div className="fp-stage__sun" />
          </div>
        </div>
      );
    case 'compress':
      return (
        <div className="fp-stage fp-stage--compress">
          <div className="fp-stage__drop">
            <b>Drop files</b>
            <em>PDF · IMG · ZIP</em>
          </div>
          <div className="fp-stage__meter">
            <i style={{ width: '72%' }} />
          </div>
        </div>
      );
    case 'background':
      return (
        <div className="fp-stage fp-stage--bg">
          <div className="fp-stage__check" />
          <div className="fp-stage__cutout" />
        </div>
      );
    case 'convert':
      return (
        <div className="fp-stage fp-stage--convert">
          <div className="fp-stage__chip">PDF</div>
          <div className="fp-stage__arrow">→</div>
          <div className="fp-stage__chip is-out">JPG</div>
        </div>
      );
    case 'qr':
      return (
        <div className="fp-stage fp-stage--qr">
          <div className="fp-stage__qr">
            <i />
            <i />
            <i />
            <i />
            <span />
          </div>
        </div>
      );
    case 'meeting':
      return (
        <div className="fp-stage fp-stage--meeting">
          <div className="fp-stage__call">
            <div className="fp-stage__avatar" />
            <div className="fp-stage__avatar is-2" />
            <div className="fp-stage__avatar is-3" />
            <div className="fp-stage__avatar is-4" />
          </div>
          <div className="fp-stage__bar">
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    default:
      return <div className="fp-stage" />;
  }
}
