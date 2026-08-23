import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_SEO, SITE, absoluteUrl, originUrl } from '../lib/seo';

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

function jsonLd(origin) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: SITE.name,
        alternateName: ['EB', 'Edison Biju Portfolio'],
        description: SITE.description,
        inLanguage: 'en-IN',
        publisher: { '@id': `${origin}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${origin}/#person`,
        name: SITE.name,
        givenName: 'Edison',
        familyName: 'Biju',
        url: origin,
        image: absoluteUrl(SITE.image),
        email: SITE.email,
        telephone: SITE.phone,
        jobTitle: 'Web Developer',
        description: SITE.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.location.locality,
          addressRegion: SITE.location.region,
          addressCountry: SITE.location.countryCode,
        },
        sameAs: SITE.sameAs,
        knowsAbout: [
          'Web development',
          'React',
          'MERN stack',
          'UI design',
          'JavaScript',
          'Node.js',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${origin}/#service`,
        name: 'Edison Biju — Web Development',
        url: origin,
        image: absoluteUrl(SITE.image),
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: ['IN', 'Kerala', 'Worldwide'],
        serviceType: ['Website development', 'Web app development', 'UI design'],
        founder: { '@id': `${origin}/#person` },
      },
    ],
  };
}

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = PAGE_SEO[pathname] ?? PAGE_SEO['/'];
    const origin = originUrl();
    const url = absoluteUrl(pathname);
    const image = absoluteUrl(SITE.image);
    const robots = page.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    document.title = page.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: SITE.keywords });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[name="googlebot"]', { name: 'googlebot', content: robots });
    upsertMeta('meta[name="bingbot"]', { name: 'bingbot', content: robots });

    upsertLink('canonical', url);

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: pathname === '/' ? 'website' : 'profile' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE.name });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: SITE.locale });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${SITE.name}, web developer` });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    let ld = document.getElementById('seo-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'seo-jsonld';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd(origin));
  }, [pathname]);

  return null;
}
