import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__glow" aria-hidden="true" />

        <span className="section-eyebrow contact__eyebrow">Get in touch with me</span>

        <h2 className="contact__email" id="contact-title">
          <a href="mailto:info@edison.com" aria-label="Send email to info@edison.com">
            info@edison.com
          </a>
        </h2>

        <p className="contact__sub">
          Got a project in mind? I&apos;m always open to discussing new opportunities,
          creative ideas, or just having a chat.
        </p>

        <a href="mailto:info@edison.com" className="btn btn--primary contact__btn">
          Say hello
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
