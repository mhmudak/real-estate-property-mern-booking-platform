import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./ContactUs.css";

function ContactUs() {
  return (
    <>
      <Header />
      <section className="contact-page">
        <h2>Contact Us</h2>

        <p className="intro-text">
          Have questions about our properties or services? Reach out to us using
          the form below or visit our office.
        </p>

        <div className="contact-container">
          {/* Contact Form */}
          <form className="contact-form">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message..."
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          {/* Contact Info */}
          <div className="contact-info">
            <h3>Our Office</h3>
            <p>📍 Downtown Beirut, Lebanon</p>
            <p>📞 +961 70 123 456</p>
            <p>✉️ info@example123.com</p>

            <iframe
              title="HavenHub Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.111948886723!2d35.5097203!3d33.8937918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f170d52b6b42b%3A0xc3b71e33a54d9248!2sDowntown%20Beirut!5e0!3m2!1sen!2slb!4v1700000000000"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactUs;
