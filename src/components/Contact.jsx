import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__inner">
        <div className="contact__glow" aria-hidden="true" />

        <span className="section-eyebrow contact__eyebrow">Let's build together</span>
        <h2 className="contact__title font-gropled" id="contact-title">
          Ready to start your next project?
        </h2>
        <p className="contact__sub">
          Fill out the form below and I'll get back to you within 24 hours.
        </p>

        <form 
          className="contact__form" 
          action="https://formspree.io/f/mqkqwvwd" 
          method="POST"
        >
          <div className="contact__form-row">
            <div className="contact__input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="contact__input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>
          </div>
          
          <div className="contact__input-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
          </div>

          <div className="contact__input-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
          </div>

          <button type="submit" className="btn btn--primary contact__submit">
            Send Message
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
