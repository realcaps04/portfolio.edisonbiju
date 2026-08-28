import './ProjectCard.css';
import './BuildCard.css';
import './FreeToolCard.css';

export default function FreeToolCard({ tool }) {
  const hero = tool.hero;
  const isLive = tool.status === 'live' && Boolean(tool.url);

  return (
    <article className={`pp-card bp-card fp-card${isLive ? ' is-action is-live' : ' is-soon'}`}>
      <div className="pp-card__visual">
        {tool.banner ? (
          <img
            src={tool.banner}
            alt={`${tool.title} banner`}
            className="pp-card__screenshot fp-card__banner"
            loading="lazy"
          />
        ) : (
          <div className={`fp-hero fp-hero--${hero?.tone || tool.icon}`} aria-hidden="true">
            <div className="fp-hero__chrome">
              <span />
              <span />
              <span />
            </div>

            <div className="fp-hero__body">
              <div className="fp-hero__copy">
                <p className="fp-hero__brand">
                  <TitleWithHeart text={hero?.brand || tool.title} />
                </p>
                <h3 className="fp-hero__headline">{hero?.headline}</h3>
              </div>
              <div className="fp-hero__stage">
                <HeroStage tone={hero?.tone || tool.icon} />
              </div>
            </div>
          </div>
        )}

        {isLive ? (
          <div className="pp-card__overlay">
            <a
              href={tool.url}
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

        <span className={`pp-card__badge${isLive ? ' bp-card__badge--live' : ' bp-card__badge--soon'}`}>
          {isLive ? 'Live' : 'Upcoming'}
        </span>
        <span className="pp-card__year">{tool.year}</span>
      </div>

      <div className="pp-card__body">
        <h2 className="pp-card__title">
          <TitleWithHeart text={tool.title} />
        </h2>
        <p className="pp-card__desc">{tool.description}</p>

        <div className="pp-card__tags">
          {tool.tags.map((tag) => (
            <span key={tag} className="pp-card__tag">
              {tag}
            </span>
          ))}
        </div>

        {isLive ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pp-card__link"
          >
            Open tool
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
        ) : (
          <p className="bp-card__soon">Coming soon</p>
        )}
      </div>
    </article>
  );
}

function TitleWithHeart({ text }) {
  const value = String(text || '');
  if (!value.includes('♡')) return value;

  return value.split(/(♡)/).map((part, index) =>
    part === '♡' ? (
      <span className="fp-heart" key={`heart-${index}`}>
        ♡
      </span>
    ) : (
      part
    ),
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
            <b>Drop</b>
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
    case 'spices':
      return (
        <div className="fp-stage fp-stage--spices">
          <div className="fp-stage__jar is-1" />
          <div className="fp-stage__jar is-2" />
          <div className="fp-stage__jar is-3" />
          <div className="fp-stage__price">₹</div>
        </div>
      );
    case 'ritual':
      return (
        <div className="fp-stage fp-stage--ritual">
          <div className="fp-stage__habit is-done">
            <i />
            <span />
          </div>
          <div className="fp-stage__habit is-done">
            <i />
            <span />
          </div>
          <div className="fp-stage__habit">
            <i />
            <span />
          </div>
          <div className="fp-stage__streak">7</div>
        </div>
      );
    case 'cloak':
      return (
        <div className="fp-stage fp-stage--cloak">
          <div className="fp-stage__ip">
            <span />
            <span />
            <span />
          </div>
          <div className="fp-stage__shield" />
          <div className="fp-stage__alert">!</div>
        </div>
      );
    case 'serene':
      return (
        <div className="fp-stage fp-stage--serene">
          <div className="fp-stage__orb" />
          <div className="fp-stage__mood">🙂</div>
          <div className="fp-stage__wave" />
        </div>
      );
    default:
      return <div className="fp-stage" />;
  }
}
