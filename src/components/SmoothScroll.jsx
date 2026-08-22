import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis, scrollToTop } from '../lib/scrollTop';

export default function SmoothScroll() {
  const { pathname } = useLocation();

  const isAdmin = pathname.startsWith('/admin');

  useLayoutEffect(() => {
    if (isAdmin || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('has-smooth-scroll');

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.92,
      smoothWheel: true,
      autoRaf: true,
      anchors: true,
    });
    setLenis(lenis);

    return () => {
      root.classList.remove('has-smooth-scroll');
      setLenis(null);
      lenis.destroy();
    };
  }, [isAdmin]);

  useLayoutEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
