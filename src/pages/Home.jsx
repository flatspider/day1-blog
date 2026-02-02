import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './Home.css'

const TAGLINES = [
  "Making the internet weirder, one pixel at a time",
  "I build things. They sometimes work.",
  "Professional overthinker. Amateur pixel pusher.",
  "Turning caffeine into code since [REDACTED]",
  "Warning: May contain traces of actual creativity"
]

function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const nameRef = useRef(null)

  // Rotate taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => {
        setTaglineIndex(prev => (prev + 1) % TAGLINES.length)
        setIsGlitching(false)
      }, 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Cursor follow effect for hero name
  const handleMouseMove = (e) => {
    if (!nameRef.current) return
    const rect = nameRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 30
    const y = (e.clientY - rect.top - rect.height / 2) / 30
    nameRef.current.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    if (!nameRef.current) return
    nameRef.current.style.transform = 'translate(0, 0)'
  }

  return (
    <div className="page home">
      <section className="hero" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name" ref={nameRef}>Your Name</h1>
          <p className={`hero-tagline ${isGlitching ? 'glitching' : ''}`}>
            {TAGLINES[taglineIndex]}
          </p>
          <div className="hero-cta">
            <Link to="/work" className="cta-link">
              See The Goods
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

      <section className="intro section section-weird">
        <div className="intro-content">
          <p className="intro-text">
            I believe in the power of <span className="text-emphasis">controlled chaos</span>.
            Every project is an opportunity to create something meaningful—or at least
            something that makes you go "huh, neat."
          </p>
          <Link to="/about" className="intro-link">
            Get to know me &rarr;
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
