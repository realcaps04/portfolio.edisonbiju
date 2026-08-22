import SiteHeader from '../components/SiteHeader';
import { useContactModal } from '../components/ContactModal';
import './ProjectsPage.css';

export default function BuildsPage() {
  const { openContact } = useContactModal();

  return (
    <div className="hp pp">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="builds-title">
        <div className="pp-hero__glow" aria-hidden="true" />

        <div className="pp-hero__inner">
          <p className="pp-label">Shipped work</p>
          <h1 className="pp-hero__title font-gropled" id="builds-title">
            Selected
            <span className="pp-hero__lime">Builds</span>
          </h1>
          <p className="pp-hero__sub">
            Live products and experiments I&apos;ve designed, coded, and put on the internet.
          </p>
          <div className="pp-hero__actions">
            <button type="button" className="pp-cta" onClick={() => openContact('builds-hero')}>
              Get in Touch
            </button>
            <p className="pp-status">
              <span className="pp-status__dot" aria-hidden="true" />
              Available for Hire
            </p>
          </div>
        </div>
      </section>

      <section className="pp-bottom" aria-labelledby="builds-collab">
        <div className="pp-bottom__glow" aria-hidden="true" />
        <p className="pp-label">Let&apos;s collaborate</p>
        <h2 className="pp-bottom__title font-gropled" id="builds-collab">
          Got a build <span className="pp-hero__lime">in mind?</span>
        </h2>
        <p className="pp-bottom__sub">
          I&apos;d love to hear about it. Let&apos;s ship something that actually feels good to use.
        </p>
        <button type="button" className="pp-cta" onClick={() => openContact('builds-cta')}>
          Get in Touch
        </button>
      </section>
    </div>
  );
}
