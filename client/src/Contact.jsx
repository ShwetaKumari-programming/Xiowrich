import { ArrowRight, Instagram } from 'lucide-react'

export default function Contact() {
  return <main className="contact-page">
    <header className="contact-hero">
      <p className="contact-eyebrow">CONTACT US</p>
      <h1>We&rsquo;d Love to<br/><em>Hear From You.</em></h1>
      <p>Have a question about our fragrances, an order, or a business collaboration? We&rsquo;re here to help.</p>
      <a className="contact-hero-link" href="mailto:officialxiowrich@gmail.com">EMAIL OUR HOUSE <ArrowRight size={16}/></a>
    </header>
    <article className="contact-content">
      <section className="contact-info-grid">
        <div className="contact-info-card"><p className="contact-eyebrow">CUSTOMER SUPPORT</p><h2>Here when you<br/><em>need us.</em></h2><a href="mailto:officialxiowrich@gmail.com">Email: officialxiowrich@gmail.com</a><a href="tel:+917618383655">Phone/WhatsApp: +91 76183 83655</a></div>
        <div className="contact-info-card"><p className="contact-eyebrow">BUSINESS ENQUIRIES</p><h2>Let&rsquo;s create<br/><em>together.</em></h2><p>For wholesale, distribution, and partnerships, contact us at <a href="tel:+917618383655">+91 76183 83655</a></p></div>
      </section>
      <section className="contact-form-section">
        <div><p className="contact-eyebrow">SEND US A MESSAGE</p><h2>We&rsquo;d love to<br/><em>hear from you.</em></h2><p>Have a question? Fill out our contact form, and we&rsquo;ll get back to you.</p><div className="contact-social"><span>FOLLOW US ON INSTAGRAM</span><a href="https://instagram.com/xiowrich" target="_blank" rel="noreferrer"><Instagram size={16}/> @xiowrich <ArrowRight size={15}/></a></div></div>
        <form className="contact-form" onSubmit={event => event.preventDefault()}><label>Name<input required name="name" placeholder="Your name"/></label><label>Email<input required type="email" name="email" placeholder="Your email"/></label><label>Message<textarea required name="message" rows="5" placeholder="How can we help?"/></label><button className="btn btn-dark" type="submit">SEND MESSAGE <ArrowRight size={16}/></button></form>
      </section>
      <footer className="contact-signoff"><p className="contact-eyebrow">XIOWRICH · PARFUMS DE CARACTÈRE</p><h2>Let&rsquo;s talk<br/><em>fragrance.</em></h2></footer>
    </article>
  </main>
}
