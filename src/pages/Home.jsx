import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Your Name</h1>
          <p className="hero-tagline">
            A creative developer crafting thoughtful
            <br />
            digital experiences
          </p>
          <div className="hero-cta">
            <Link to="/work" className="cta-link">
              View Work
              <span className="cta-arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured section">
        <div className="section-header">
          <p className="section-label">Selected Works</p>
          <h2 className="section-title">Recent Projects</h2>
        </div>

        <div className="featured-grid">
          <article className="featured-item">
            <div className="featured-image">
              <div className="placeholder-image" style={{ backgroundColor: '#e8e6e3' }}>
                <span>01</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project One</h3>
              <p>Design & Development</p>
            </div>
          </article>

          <article className="featured-item">
            <div className="featured-image">
              <div className="placeholder-image" style={{ backgroundColor: '#f0eeeb' }}>
                <span>02</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project Two</h3>
              <p>Web Application</p>
            </div>
          </article>

          <article className="featured-item">
            <div className="featured-image">
              <div className="placeholder-image" style={{ backgroundColor: '#e8e6e3' }}>
                <span>03</span>
              </div>
            </div>
            <div className="featured-info">
              <h3>Project Three</h3>
              <p>Brand Identity</p>
            </div>
          </article>
        </div>

        <div className="section-footer">
          <Link to="/work" className="view-all">
            View all projects
            <span>&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="intro section">
        <div className="intro-content">
          <p className="intro-text">
            I believe in the power of simplicity. Every project is an opportunity
            to create something meaningful—where form follows function and every
            detail serves a purpose.
          </p>
          <Link to="/about" className="intro-link">
            More about me &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
