export const PRICING_PLANS = [
  {
    id: 'landing',
    name: 'Landing page',
    usd: 99,
    inr: 8000,
    cadence: 'starting at',
    time: '5–10 days',
    blurb: 'A single high-converting page for a product, event, or campaign.',
    features: [
      'One custom designed page',
      'Mobile-first layout',
      'Contact / WhatsApp CTA',
      'Basic SEO and speed pass',
      'Vercel or similar deploy',
    ],
  },
  {
    id: 'business',
    name: 'Business website',
    usd: 269,
    inr: 22000,
    cadence: 'starting at',
    time: '2–3 weeks',
    popular: true,
    blurb: 'A full site for a studio, shop, clinic, or company that needs more than one page.',
    features: [
      '4–8 custom pages',
      'About, services, gallery, contact',
      'Lead form to your inbox',
      'On-brand UI and copy layout',
      'SEO, analytics, and hosting setup',
    ],
  },
  {
    id: 'app',
    name: 'Web app',
    usd: 669,
    inr: 55000,
    cadence: 'starting at',
    time: '4–8 weeks',
    blurb: 'A React / MERN product with logins, dashboards, and real data.',
    features: [
      'Auth and user roles',
      'Admin panel',
      'Database and APIs',
      'Responsive product UI',
      'Staging + production deploy',
    ],
  },
  {
    id: 'commerce',
    name: 'E-commerce',
    usd: 489,
    inr: 40000,
    cadence: 'starting at',
    time: '3–6 weeks',
    blurb: 'Catalog, cart, and checkout so you can sell online without a template look.',
    features: [
      'Product catalog and search',
      'Cart and checkout flow',
      'Payment gateway wiring',
      'Order / inquiry inbox',
      'Mobile-ready storefront',
    ],
  },
  {
    id: 'custom',
    name: 'Custom plan',
    custom: true,
    usd: 0,
    inr: 0,
    cadence: 'quote on request',
    time: 'Timeline after a short brief',
    blurb: 'A build that does not fit the packages — mixed scope, redesign, or something new.',
    features: [
      'Scoped to your product',
      'Mix of web, app, and design',
      'Written quote after we talk',
      'Milestones you can approve',
      'No lock-in until you say go',
    ],
  },
];

export const PRICING_ADDONS = [
  { name: 'Extra page', usd: 29, inr: 2500 },
  { name: 'Admin dashboard', usd: 149, inr: 12000 },
  { name: 'Payment integration', usd: 99, inr: 8000 },
  { name: 'CMS / easy edits', usd: 119, inr: 10000 },
  { name: 'UI design only', usd: 149, inr: 12000 },
  { name: 'Monthly care', usd: 49, inr: 4000, suffix: ' / mo' },
];

export function formatPrice(amount, currency, suffix = '') {
  const formatted = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted}${suffix}`;
}
