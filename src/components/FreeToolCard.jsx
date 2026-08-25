import './ProjectCard.css';
import './BuildCard.css';
import './FreeToolCard.css';

export default function FreeToolCard({ tool }) {
  const Icon = ICONS[tool.icon] || SoonIcon;

  return (
    <article className="pp-card bp-card is-soon fp-card">
      <div className="pp-card__visual">
        <div className="bp-card__art fp-card__art" aria-hidden="true">
          <Icon />
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

function SoonIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52">
      <circle cx="32" cy="34" r="20" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M32 22v14l9 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <path
        d="M18 12h20l12 12v28a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path d="M38 12v10h10" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
      <path
        d="M32 30.5c1.7-2.4 5.2-2.2 6.2.4 1 2.7-1.2 5.3-4.4 6.2-2.4.7-5 .2-6.2-1.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImgIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="12" y="16" width="40" height="32" rx="5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14 42l12-10 8 7 6-5 10 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M44 18c1.4-1.8 4.2-1.6 5 .4.8 2.1-1 4.2-3.5 4.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="18" y="14" width="28" height="36" rx="4" stroke="currentColor" strokeWidth="2.4" />
      <path d="M26 8v8M38 8v8M26 48v8M38 48v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M26 32h12M32 26v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function BackgroundIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="12" y="14" width="40" height="36" rx="5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M20 46c3.4-7 20.6-7 24 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M42 18l8-6M46 22l8-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function ConvertIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="10" y="18" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <rect x="34" y="18" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <path d="M24 52h16M32 46v12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M28 31h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg viewBox="0 0 64 64" width="52" height="52" fill="none">
      <rect x="12" y="12" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.4" />
      <rect x="36" y="12" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.4" />
      <rect x="12" y="36" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.4" />
      <path d="M18 18h4v4h-4zM42 18h4v4h-4zM18 42h4v4h-4z" fill="currentColor" />
      <path d="M36 36h6v6M48 36v12h-8M42 48h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  pdf: PdfIcon,
  img: ImgIcon,
  compress: CompressIcon,
  background: BackgroundIcon,
  convert: ConvertIcon,
  qr: QrIcon,
};
