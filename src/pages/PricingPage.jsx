import { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import PlanModal from '../components/PlanModal';
import { useContactModal } from '../components/ContactModal';
import { formatPrice, PRICING_ADDONS, PRICING_PLANS } from '../data/pricing';
import './ProjectsPage.css';
import './PricingPage.css';

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 6.4v11.2M15.1 9.1c0-1.2-1.3-2-3.1-2s-3.1.8-3.1 2.1c0 1.2.9 1.8 3.2 2.2 2.3.4 3.3 1.1 3.3 2.4s-1.4 2.3-3.4 2.3-3.4-.9-3.4-2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M7.2 6.4h10.1M7.2 10.1h10.1M14.8 6.4c0 4.2-3.2 6.4-7.6 6.4M7.4 17.6 13.6 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPage() {
  const { openContact } = useContactModal();
  const [currency, setCurrency] = useState('USD');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const inRupees = currency === 'INR';

  return (
    <div className="hp pp pr">
      <SiteHeader />

      <section className="pp-hero" aria-labelledby="pricing-title">
        <div className="pp-hero__glow" aria-hidden="true" />

        <div className="pp-hero__inner">
          <p className="pp-label">Pricing</p>
          <h1 className="pp-hero__title font-gropled" id="pricing-title">
            Development
            <span className="pp-hero__lime">prices</span>
          </h1>
          <p className="pp-hero__sub">
            Starting rates for websites and web apps. Final quotes follow a short brief — scope,
            pages, and features set the number.
          </p>
          <div className="pp-hero__actions">
            <button type="button" className="pp-cta" onClick={() => openContact('pricing-hero')}>
              Get a quote
            </button>
            <button
              type="button"
              className={`pr-fx${inRupees ? ' is-inr' : ''}`}
              onClick={() => setCurrency(inRupees ? 'USD' : 'INR')}
              aria-label={inRupees ? 'Show prices in US dollars' : 'Show prices in Indian rupees'}
              title={inRupees ? 'Switch to USD' : 'Switch to INR'}
            >
              {inRupees ? <DollarIcon /> : <RupeeIcon />}
              <span>{inRupees ? 'USD' : 'INR'}</span>
            </button>
            <p className="pp-status">
              <span className="pp-status__dot" aria-hidden="true" />
              Available for Hire
            </p>
          </div>
        </div>
      </section>

      <section className="pr-plans" aria-label="Development packages">
        <div className="pr-grid">
          {PRICING_PLANS.map((plan) => (
            <article
              className={`pr-card${plan.popular ? ' is-popular' : ''}${plan.custom ? ' is-custom' : ''}`}
              key={plan.id}
            >
              {plan.popular ? (
                <p className="pr-card__badge">Most booked</p>
              ) : plan.custom ? (
                <p className="pr-card__badge">Your brief</p>
              ) : null}
              <h2 className="pr-card__name">{plan.name}</h2>
              <p className="pr-card__blurb">{plan.blurb}</p>
              <p className="pr-card__price">
                <span>{plan.cadence}</span>
                <strong>
                  {plan.custom ? 'Let’s talk' : formatPrice(inRupees ? plan.inr : plan.usd, currency)}
                </strong>
              </p>
              <p className="pr-card__time">{plan.time}</p>
              <ul className="pr-card__list">
                {plan.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button
                type="button"
                className="pr-card__cta"
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.custom ? 'Choose custom plan' : 'Start this plan'}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="pr-addons" aria-labelledby="addons-title">
        <p className="pp-label">Add-ons</p>
        <h2 className="pr-addons__title font-gropled" id="addons-title">
          Extra <span className="pp-hero__lime">work</span>
        </h2>
        <ul className="pr-addons__list">
          {PRICING_ADDONS.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{formatPrice(inRupees ? item.inr : item.usd, currency, item.suffix || '')}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="pp-bottom" aria-labelledby="pricing-collab">
        <div className="pp-bottom__glow" aria-hidden="true" />
        <p className="pp-label">Need a custom number?</p>
        <h2 className="pp-bottom__title font-gropled" id="pricing-collab">
          Tell me the <span className="pp-hero__lime">build</span>
        </h2>
        <p className="pp-bottom__sub">
          Mixed scope, redesigns, and unusual products get a written quote after we talk. No
          obligation — just a clear price.
        </p>
        <button type="button" className="pp-cta" onClick={() => openContact('pricing-cta')}>
          Get in Touch
        </button>
      </section>

      <PlanModal plan={selectedPlan} currency={currency} onClose={() => setSelectedPlan(null)} />
    </div>
  );
}
