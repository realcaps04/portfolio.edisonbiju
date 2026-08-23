export const SITE = {
  name: 'Edison Biju',
  shortName: 'Edison',
  title: 'Edison Biju | Web Developer in Kerala, India',
  description:
    'Edison Biju is a freelance web developer in Idukki, Kerala, India. I design and ship React, MERN, and custom websites, web apps, and UI for businesses and startups.',
  keywords:
    'Edison Biju, Edison Biju web developer, freelance web developer Kerala, React developer India, MERN stack developer Idukki, website designer Kerala, custom web apps, portfolio, UI UX, Vercel, Node.js, JavaScript',
  url: 'https://www.consoleprojectsbycaps.in',
  image: '/profile.png',
  email: 'edisonbijumullappallil@gmail.com',
  phone: '+917907951080',
  locale: 'en_IN',
  location: {
    locality: 'Idukki',
    region: 'Kerala',
    country: 'India',
    countryCode: 'IN',
  },
  sameAs: [
    'https://github.com/realcaps04',
    'https://www.linkedin.com/in/edison-biju',
    'https://www.instagram.com/edisonbiju',
    'https://buymeacoffee.com/realcaps',
  ],
};

export const PAGE_SEO = {
  '/': {
    title: SITE.title,
    description: SITE.description,
  },
  '/about': {
    title: 'About Edison Biju | Web Developer & Programmer',
    description:
      'About Edison Biju — programmer and web developer from Idukki, Kerala. MERN, React, UI design, and shipped products for colleges, startups, and businesses.',
  },
  '/projects': {
    title: 'Projects by Edison Biju | Web Apps & Websites',
    description:
      'Selected web projects by Edison Biju: dashboards, college sites, portals, landing pages, and product UI built with React and the MERN stack.',
  },
  '/builds': {
    title: 'Shipped Builds by Edison Biju | Apps & Websites for Sale',
    description:
      'Shipped and upcoming web apps and websites by Edison Biju. Buy a ready-made build or hire me to design and develop a custom product.',
  },
  '/pricing': {
    title: 'Pricing | Web Development by Edison Biju',
    description:
      'Starting prices for landing pages, business websites, e-commerce, and custom React / MERN web apps by Edison Biju in Kerala, India.',
  },
  '/admin': {
    title: 'EB Admin',
    description: 'Private admin inbox.',
    robots: 'noindex, nofollow',
  },
};

export function originUrl() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return SITE.url;
}

export function absoluteUrl(path = '/') {
  const origin = originUrl();
  if (!path || path === '/') return origin;
  if (path.startsWith('http')) return path;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
