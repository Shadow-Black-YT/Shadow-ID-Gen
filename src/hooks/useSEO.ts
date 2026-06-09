import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://shadowidgen.com';

const PAGE_SEO: Record<string, { title: string; description: string; canonical?: string }> = {
  '/': {
    title: 'Shadow ID Gen — #1 Free ID Card Maker Online (2025)',
    description: '⚡ Make stunning ID cards in 60 seconds — free forever. 216+ templates, bulk CSV, QR codes, HD export. University, school, employee & event badges. No signup, 100% private.',
    canonical: BASE_URL + '/',
  },
  '/create': {
    title: 'Create ID Card Free — No Signup | Shadow ID Gen',
    description: '🎨 Design & download HD ID cards in seconds. 216+ templates, photos, logos, handwritten signatures & QR codes. Free PNG & PDF. Zero data uploaded.',
    canonical: BASE_URL + '/create',
  },
  '/bulk': {
    title: 'Bulk ID Card Generator — CSV to 100s of Cards | Shadow ID Gen',
    description: '🚀 Upload CSV → Generate 100s of ID cards → Download ZIP. Perfect for schools, universities & HR teams. Free, fast, private.',
    canonical: BASE_URL + '/bulk',
  },
};

const TYPE_SEO: Record<string, { title: string; description: string; canonical: string }> = {
  university: {
    title: 'University ID Card Maker — Free Online (2025) | Shadow ID Gen',
    description: '🎓 Create university student ID cards with crests, QR codes & signatures. 216+ templates, HD export. No signup needed — 100% free.',
    canonical: BASE_URL + '/create?type=university',
  },
  school: {
    title: 'School ID Card Maker — Free for Students (2025) | Shadow ID Gen',
    description: '📚 Design school student ID cards with photo, class info & guardian details. 216+ templates, QR codes, free PNG & PDF download.',
    canonical: BASE_URL + '/create?type=school',
  },
  employee: {
    title: 'Employee ID Badge Maker — Free for Companies (2025) | Shadow ID Gen',
    description: '💼 Create corporate employee badges with logo, department & QR access codes. 216+ templates, bulk CSV, free HD export. No signup.',
    canonical: BASE_URL + '/create?type=employee',
  },
  event: {
    title: 'Event Pass Maker — Free Conference Badges (2025) | Shadow ID Gen',
    description: '🎪 Design event & conference badges with QR access codes. 216+ templates, attendee roles, free PNG & PDF. Ready in 60 seconds.',
    canonical: BASE_URL + '/create?type=event',
  },
};

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

const setOrCreateMeta = (name: string, content: string, property = false) => {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (url: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.href = url;
};

const useSEO = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    let title = 'Shadow ID Gen — Free Online ID Card Maker';
    let desc = 'Create professional ID cards online for free with 216+ templates.';
    let canonical = BASE_URL + pathname;

    const pageSeo = PAGE_SEO[pathname];
    if (pageSeo) {
      title = pageSeo.title;
      desc = pageSeo.description;
      canonical = pageSeo.canonical || canonical;
    }

    // Type-specific SEO for /create
    if (pathname === '/create') {
      const params = new URLSearchParams(search);
      const type = params.get('type');
      if (type && TYPE_SEO[type]) {
        title = TYPE_SEO[type].title;
        desc = TYPE_SEO[type].description;
        canonical = TYPE_SEO[type].canonical;
      }
    }

    // 404
    if (!pageSeo && pathname !== '/create') {
      title = 'Page Not Found — Shadow ID Gen';
      desc = 'The page you are looking for does not exist. Return to Shadow ID Gen to create professional ID cards for free.';
    }

    document.title = title;
    setOrCreateMeta('description', desc);
    setOrCreateMeta('og:title', title, true);
    setOrCreateMeta('og:description', desc, true);
    setOrCreateMeta('og:url', canonical, true);
    setOrCreateMeta('twitter:title', title);
    setOrCreateMeta('twitter:description', desc);
    setCanonical(canonical);
  }, [pathname, search]);
};

export default useSEO;
