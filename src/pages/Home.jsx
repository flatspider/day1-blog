import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting reveal-1">Hello, my name is</p>
          <h1 className="hero-name reveal-2">Conor</h1>
          <p className="hero-tagline reveal-3">
            Building things for the web<span className="cursor"></span>
          </p>
          <div className="hero-cta reveal-4">
            <Link to="/work" className="cta-link">
              See The Work
              <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured section">
        <div className="section-header reveal-1">
          <p className="section-label">// Selected Works</p>
          <h2 className="section-title">Recent Projects</h2>
        </div>

        <div className="featured-grid">
          <article className="featured-item reveal-2">
            <div className="featured-image">
              <div className="placeholder-image">
                <span className="project-number">01</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project One</h3>
              <p>Design & Development</p>
            </div>
          </article>

          <article className="featured-item reveal-3">
            <div className="featured-image">
              <div className="placeholder-image">
                <span className="project-number">02</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project Two</h3>
              <p>Web Application</p>
            </div>
          </article>

          <article className="featured-item reveal-4">
            <div className="featured-image">
              <div className="placeholder-image">
                <span className="project-number">03</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project Three</h3>
              <p>Brand Identity</p>
            </div>
          </article>
        </div>

        <div className="section-footer reveal-5">
          <Link to="/work" className="view-all">
            View all projects
            <span>→</span>
          </Link>
        </div>
      </section>

      <section className="intro section">
        <div className="intro-content reveal-1">
          <p className="intro-text">
            I believe in the power of{" "}
            <span className="text-emphasis">focused craft</span>. Every project
            is an opportunity to create something meaningful— code that works,
            designs that communicate.
          </p>
          <Link to="/about" className="intro-link">
            Get to know me →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
