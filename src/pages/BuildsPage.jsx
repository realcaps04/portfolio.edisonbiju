import { useCallback, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import BuildCard from '../components/BuildCard';
import BuyModal from '../components/BuyModal';
import { useContactModal } from '../components/ContactModal';
import { BUILDS } from '../data/builds';
import './ProjectsPage.css';

export default function BuildsPage() {
  const { openContact } = useContactModal();
  const [selected, setSelected] = useState(null);

  const onOpen = useCallback(
    (build) => {
      if (build.kind === 'custom') {
        openContact('builds-custom');
        return;
      }
      if (build.kind === 'sale') setSelected(build);
    },
    [openContact],
  );

  return (
    <div className="hp pp">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="builds-title">
        <div className="pp-hero__glow" aria-hidden="true" />

        <div className="pp-hero__inner">
          <p className="pp-label">For sale</p>
          <h1 className="pp-hero__title font-gropled" id="builds-title">
            Ready-made
            <span className="pp-hero__lime">Builds</span>
          </h1>
          <p className="pp-hero__sub">
            Live apps and websites you can buy as a starting point — or hire me to design and ship something new.
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

      <section className="pp-grid-section" aria-label="Builds for sale">
        <div className="pp-grid">
          {BUILDS.map((build) => (
            <BuildCard key={build.id} build={build} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="pp-bottom" aria-labelledby="builds-collab">
        <div className="pp-bottom__glow" aria-hidden="true" />
        <p className="pp-label">Let&apos;s collaborate</p>
        <h2 className="pp-bottom__title font-gropled" id="builds-collab">
          Got a build <span className="pp-hero__lime">in mind?</span>
        </h2>
        <p className="pp-bottom__sub">
          If none of these fit, tell me what you need. I&apos;ll design, code, and ship it with you.
        </p>
        <button type="button" className="pp-cta" onClick={() => openContact('builds-cta')}>
          Get in Touch
        </button>
      </section>

      <BuyModal build={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
