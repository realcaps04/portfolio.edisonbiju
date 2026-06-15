import { useState } from 'react';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Edison completely transformed how our brand looks and feels. The logo he created is iconic — clients constantly compliment it. The whole process was smooth, professional, and genuinely enjoyable.",
    name: 'Sarah Mitchell',
    role: 'CEO, Lumora Studio',
    initials: 'SM',
    color: '#f97316',
  },
  {
    id: 2,
    quote:
      "Working with Edison was one of the best design decisions we made. He understood our vision immediately and delivered an identity system that's both beautiful and functional across all touchpoints.",
    name: 'James Carter',
    role: 'Co-founder, Arcline',
    initials: 'JC',
    color: '#8b5cf6',
  },
  {
    id: 3,
    quote:
      "The attention to detail is unreal. Every asset he delivered was pixel-perfect and came with thorough usage guidelines. We had our full brand kit in under two weeks.",
    name: 'Priya Okafor',
    role: 'Marketing Director, Velo',
    initials: 'PO',
    color: '#06b6d4',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  return (
    <section className="testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <span className="section-eyebrow">Kind words</span>
          <h2 className="testimonials__title" id="testimonials-title">Testimonial</h2>
        </div>

        <div className="testimonials__card">
          {/* Quote mark */}
          <span className="testimonials__quote-mark" aria-hidden="true">&ldquo;</span>

          <blockquote className="testimonials__text">
            {current.quote}
          </blockquote>

          <div className="testimonials__author">
            <div
              className="testimonials__avatar"
              style={{ background: `${current.color}22`, border: `2px solid ${current.color}44` }}
              aria-hidden="true"
            >
              <span style={{ color: current.color }}>{current.initials}</span>
            </div>
            <div>
              <p className="testimonials__name">{current.name}</p>
              <p className="testimonials__role">{current.role}</p>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="testimonials__dots" role="tablist" aria-label="Testimonials navigation">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                className={`testimonials__dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial by ${t.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
