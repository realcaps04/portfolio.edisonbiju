import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, label, .hp-intro__icons span';

export default function CustomCursor() {
  const arrowRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -80, y: -80 });
  const ring = useRef({ x: -80, y: -80 });
  const hovering = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const onMove = (event) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      hovering.current = Boolean(event.target.closest(HOVER_TARGETS));
    };

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;

      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        arrowRef.current.classList.toggle('is-hover', hovering.current);
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
        ringRef.current.classList.toggle('is-hover', hovering.current);
      }

      frame = window.requestAnimationFrame(tick);
    };

    let frame = window.requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cc" aria-hidden="true">
      <div className="cc__ring" ref={ringRef}>
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="17" />
        </svg>
      </div>
      <div className="cc__arrow" ref={arrowRef}>
        <svg viewBox="0 0 28 28">
          <path
            d="M4.2 3.2 22.4 15.1l-7.4 1.4 3.9 8.3-3.3 1.6-3.9-8.4-6.4 4.8z"
            fill="#8b5cf6"
            stroke="#1a0a2a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
