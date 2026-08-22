import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const HOVER_TARGETS = 'a, button, [role="button"], input, textarea, select, label, .hp-intro__icons span';
const GRAPH_SIZE = 280;
const COLS = 7;
const ROWS = 7;
const GAP = 36;

function buildGraph() {
  const nodes = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const x = (col - (COLS - 1) / 2) * GAP;
      const y = (row - (ROWS - 1) / 2) * GAP;
      const dist = Math.hypot(x, y);
      if (dist > GAP * 3.05) continue;
      nodes.push({
        col,
        row,
        restX: x,
        restY: y,
        x,
        y,
        dist,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  const key = (col, row) => `${col},${row}`;
  const indexByKey = new Map(nodes.map((node, index) => [key(node.col, node.row), index]));
  const edges = [];
  nodes.forEach((node, index) => {
    [[1, 0], [0, 1], [1, 1], [-1, 1]].forEach(([dx, dy]) => {
      const other = indexByKey.get(key(node.col + dx, node.row + dy));
      if (other != null && other > index) edges.push([index, other]);
    });
  });

  return { nodes, edges };
}

export default function CustomCursor() {
  const arrowRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const graph = useRef(buildGraph());
  const pos = useRef({ x: -200, y: -200 });
  const arrow = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const mesh = useRef({ x: -200, y: -200 });
  const velocity = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const time = useRef(0);
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

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = GRAPH_SIZE * dpr;
    canvas.height = GRAPH_SIZE * dpr;
    ctx.scale(dpr, dpr);

    const onMove = (event) => {
      velocity.current.x = event.clientX - pos.current.x;
      velocity.current.y = event.clientY - pos.current.y;
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;
      hovering.current = Boolean(event.target.closest?.(HOVER_TARGETS));
    };

    const onScroll = () => {
      velocity.current.x *= 0.7;
      velocity.current.y *= 0.7;
    };

    const drawGraph = () => {
      const { nodes, edges } = graph.current;
      const hover = hovering.current;
      const cx = GRAPH_SIZE / 2;
      const cy = GRAPH_SIZE / 2;
      const t = time.current;
      const vx = velocity.current.x;
      const vy = velocity.current.y;

      ctx.clearRect(0, 0, GRAPH_SIZE, GRAPH_SIZE);

      nodes.forEach((node) => {
        const wave = Math.sin(t * 0.0032 + node.phase) * 2.4;
        const pull = hover ? 1.18 : 1;
        const drag = 0.22 * (node.dist / (GAP * 3));
        node.x = node.restX * pull + vx * drag + wave;
        node.y = node.restY * pull + vy * drag + Math.cos(t * 0.0026 + node.phase) * 2.1;
      });

      ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const mid = (na.dist + nb.dist) / 2;
        const fade = Math.max(0, 1 - mid / (GAP * 3.05));
        ctx.strokeStyle = hover
          ? `rgba(139, 92, 246, ${0.16 + fade * 0.38})`
          : `rgba(204, 255, 0, ${0.12 + fade * 0.42})`;
        ctx.beginPath();
        ctx.moveTo(cx + na.x, cy + na.y);
        ctx.lineTo(cx + nb.x, cy + nb.y);
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const fade = Math.max(0, 1 - node.dist / (GAP * 3.05));
        const radius = 1.15 + fade * 1.45;
        ctx.beginPath();
        ctx.fillStyle = hover
          ? `rgba(139, 92, 246, ${0.35 + fade * 0.55})`
          : `rgba(204, 255, 0, ${0.28 + fade * 0.62})`;
        ctx.arc(cx + node.x, cy + node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = (now) => {
      time.current = now;
      velocity.current.x *= 0.86;
      velocity.current.y *= 0.86;

      arrow.current.x += (pos.current.x - arrow.current.x) * 0.34;
      arrow.current.y += (pos.current.y - arrow.current.y) * 0.34;
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      mesh.current.x += (pos.current.x - mesh.current.x) * 0.12;
      mesh.current.y += (pos.current.y - mesh.current.y) * 0.12;

      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(${arrow.current.x}px, ${arrow.current.y}px, 0)`;
        arrowRef.current.classList.toggle('is-hover', hovering.current);
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
        ringRef.current.classList.toggle('is-hover', hovering.current);
      }

      if (canvas) {
        canvas.style.transform = `translate3d(${mesh.current.x}px, ${mesh.current.y}px, 0)`;
        canvas.classList.toggle('is-hover', hovering.current);
      }

      drawGraph();
      frame = window.requestAnimationFrame(tick);
    };

    let frame = window.requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cc" aria-hidden="true">
      <canvas
        className="cc__graph"
        ref={canvasRef}
        width={GRAPH_SIZE}
        height={GRAPH_SIZE}
      />
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
