import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./About.css";

function About() {
  return (
    <>
    <Header />
    <div className="about-page">
      <div className="about-container">
        <h1>About Example</h1>
        <p className="about-intro">
          Welcome to <strong>Example</strong> — a modern real estate platform built to help
          you find your dream property across Lebanon. Whether you’re buying or
          renting, we make your experience smooth, transparent, and stress-free.
        </p>

        <div className="about-sections">
          <section>
            <h2>🏡 Our Mission</h2>
            <p>
              To simplify the real-estate journey by connecting people with their
              ideal homes through innovation and trusted partnerships.
            </p>
          </section>

          <section>
            <h2>🌍 Our Vision</h2>
            <p>
              To become Lebanon’s leading real-estate hub, bridging the gap between
              technology and property seekers.
            </p>
          </section>

          <section>
            <h2>💼 Our Services</h2>
            <p>
              Property listings, virtual tours, expert consultation, and secure
              transactions — all in one intuitive platform.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default About;
