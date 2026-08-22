import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add('has-smooth-scroll');

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.92,
      smoothWheel: true,
      autoRaf: true,
      anchors: true,
    });

    return () => {
      root.classList.remove('has-smooth-scroll');
      lenis.destroy();
    };
  }, []);

  return null;
}
