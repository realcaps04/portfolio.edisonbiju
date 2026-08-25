import SiteHeader from '../components/SiteHeader';
import FreeToolCard from '../components/FreeToolCard';
import { useContactModal } from '../components/ContactModal';
import { FREE_TOOLS } from '../data/freeTools';
import './ProjectsPage.css';

export default function FreePage() {
  const { openContact } = useContactModal();

  return (
    <div className="hp pp">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="free-title">
        <div className="pp-hero__glow" aria-hidden="true" />

        <div className="pp-hero__inner">
          <p className="pp-label">Free to use</p>
          <h1 className="pp-hero__title font-gropled" id="free-title">
            Tools you can
            <span className="pp-hero__lime">use for free</span>
          </h1>
          <p className="pp-hero__sub">
            Free tools and apps you can open in the browser — starting with Cloak. More are on the way.
          </p>
          <div className="pp-hero__actions">
            <button type="button" className="pp-cta" onClick={() => openContact('free-hero')}>
              Get in Touch
            </button>
            <p className="pp-status">
              <span className="pp-status__dot" aria-hidden="true" />
              Available for Hire
            </p>
          </div>
        </div>
      </section>

      <section className="pp-grid-section" aria-label="Free to use tools">
        <div className="pp-grid">
          {FREE_TOOLS.map((tool) => (
            <FreeToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="pp-bottom" aria-labelledby="free-collab">
        <div className="pp-bottom__glow" aria-hidden="true" />
        <p className="pp-label">Need something custom?</p>
        <h2 className="pp-bottom__title font-gropled" id="free-collab">
          Want a tool <span className="pp-hero__lime">built for you?</span>
        </h2>
        <p className="pp-bottom__sub">
          If you need a private build, a brand, or extra features, tell me what you want.
        </p>
        <button type="button" className="pp-cta" onClick={() => openContact('free-cta')}>
          Get in Touch
        </button>
      </section>
    </div>
  );
}
