export const PROJECTS = [
  {
    id: 1,
    title: 'Console — Project Dashboard',
    category: 'Web App',
    year: '2025',
    description: 'Open-source dashboard for projects, analytics, and team work.',
    tags: ['React', 'Dashboard', 'Analytics', 'Open Source'],
    url: 'https://consoleonline.vercel.app/',
  },
  {
    id: 2,
    title: 'JPM Arts & Science College',
    category: 'Education',
    year: '2025',
    description: 'Official site for a NAAC B++ college affiliated to MG University.',
    tags: ['React', 'Education', 'Responsive', 'SEO'],
    url: 'https://jpm-college.vercel.app/',
  },
  {
    id: 3,
    title: 'Kerala PSC Thulasi Portal',
    category: 'Gov Portal',
    year: '2024',
    description: 'One-Time Registration portal for Kerala PSC job aspirants.',
    tags: ['React', 'Gov', 'OTR System', 'Portal'],
    url: 'https://kerala-psc.vercel.app/',
  },
  {
    id: 4,
    title: 'Concept Admin Panel',
    category: 'UI Design',
    year: '2024',
    description: 'Glassmorphism admin login with animated cursor details.',
    tags: ['HTML/CSS', 'Admin', 'Glassmorphism', 'Animation'],
    url: 'https://concept-admin.vercel.app/',
  },
  {
    id: 5,
    title: 'TVA — Ruling the Streets',
    category: 'Community',
    year: '2024',
    description: 'Dark, high-energy landing page for a GTA RP crew.',
    tags: ['React', 'Gaming', 'Landing Page', 'Dark UI'],
    url: 'https://official-tva-online.vercel.app/',
  },
  {
    id: 6,
    title: 'Console Invoice Generator',
    category: 'Productivity',
    year: '2025',
    description: 'Create, preview, and export invoices for Console Projects.',
    tags: ['React', 'Invoice', 'PDF Export', 'Finance'],
    url: 'https://console-billing.vercel.app/',
  },
];

export const screenshotUrl = (url) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
