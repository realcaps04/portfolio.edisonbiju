import './About.css';

// Photo lives at public/profile.jpg — drop your file there
const profileImg = '/profile.jpg';

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '80+', label: 'Projects Delivered' },
  { value: '40+', label: 'Happy Clients' },
];

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__inner">
        {/* Text side */}
        <div className="about__text">
          <span className="section-eyebrow">About me</span>
          <h2 className="about__title" id="about-title">
            Let&apos;s get know<br />
            about me closer
          </h2>
          <p className="about__body">
            I&apos;m a brand &amp; visual designer specialising in logo design, visual identity
            systems, and creative direction. I help startups and established brands find their
            visual voice — building identities that communicate with clarity and confidence.
          </p>
          <p className="about__body">
            My work sits at the intersection of strategy and aesthetics. Every mark I create
            is rooted in research, built to scale, and designed to endure.
          </p>

          <div className="about__stats">
            {STATS.map(({ value, label }) => (
              <div className="about__stat" key={label}>
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn--primary">
            Let&apos;s work together
          </a>
        </div>

        {/* Image side */}
        <div className="about__image-wrap">
          {/* Decorative orange pill — top right */}
          <div className="about__pill about__pill--tr" aria-hidden="true" />
          {/* Decorative orange pill — bottom left */}
          <div className="about__pill about__pill--bl" aria-hidden="true" />

          <div className="about__image-glow" aria-hidden="true" />

          <div className="about__image-card">
            <img
              src={profileImg}
              alt="Edison — portrait"
              className="about__image"
              loading="lazy"
            />
          </div>

          <div className="about__badge">
            <span className="about__badge-dot" />
            Open to work
          </div>
        </div>
      </div>
    </section>
  );
}
