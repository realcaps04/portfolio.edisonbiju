import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, label, .hp-intro__icons span';
const CELL = 112;

export default function CustomCursor() {
  const arrowRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const arrow = useRef({ x: -80, y: -80 });
  const ring = useRef({ x: -80, y: -80 });
  const look = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const hovering = useRef(false);
  const [pointer, setPointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setPointer(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (pointer) root.classList.add('has-custom-cursor');

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = { w: 0, h: 0, dpr: 1 };

    const resize = () => {
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.w = window.innerWidth;
      size.h = window.innerHeight;
      canvas.width = Math.floor(size.w * size.dpr);
      canvas.height = Math.floor(size.h * size.dpr);
      canvas.style.width = `${size.w}px`;
      canvas.style.height = `${size.h}px`;
      ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    };

    const onMove = (event) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      hovering.current = Boolean(event.target.closest?.(HOVER_TARGETS));
    };

    const drawGrid = () => {
      const { w, h } = size;
      const hover = hovering.current;
      look.current.x += (pos.current.x - look.current.x) * 0.08;
      look.current.y += (pos.current.y - look.current.y) * 0.08;

      const shiftX = (look.current.x - w / 2) * 0.045;
      const shiftY = (look.current.y - h / 2) * 0.045;
      const originX = -CELL + (shiftX % CELL);
      const originY = -CELL + (shiftY % CELL);

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (let x = originX; x < w + CELL; x += CELL) {
        for (let y = originY; y < h + CELL; y += CELL) {
          const cx = x + CELL / 2;
          const cy = y + CELL / 2;
          const dist = Math.hypot(look.current.x - cx, look.current.y - cy);
          const glow = Math.max(0, 1 - dist / 480);
          const alpha = 0.035 + glow * (hover ? 0.1 : 0.07);

          ctx.strokeStyle = hover
            ? `rgba(139, 92, 246, ${alpha})`
            : `rgba(204, 255, 0, ${alpha})`;
          ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
        }
      }
    };

    const tick = () => {
      if (pointer) {
        arrow.current.x += (pos.current.x - arrow.current.x) * 0.34;
        arrow.current.y += (pos.current.y - arrow.current.y) * 0.34;
        ring.current.x += (pos.current.x - ring.current.x) * 0.16;
        ring.current.y += (pos.current.y - ring.current.y) * 0.16;

        if (arrowRef.current) {
          arrowRef.current.style.transform = `translate3d(${arrow.current.x}px, ${arrow.current.y}px, 0)`;
          arrowRef.current.classList.toggle('is-hover', hovering.current);
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
          ringRef.current.classList.toggle('is-hover', hovering.current);
        }
      }

      drawGrid();
      frame = window.requestAnimationFrame(tick);
    };

    resize();
    let frame = window.requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frame);
    };
  }, [pointer]);

  return (
    <>
      <canvas className="cc-grid" ref={canvasRef} aria-hidden="true" />
      {pointer && (
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
      )}
    </>
  );
}
