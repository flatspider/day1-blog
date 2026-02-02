import './About.css'

function About() {
  return (
    <div className="page about">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="page-label">About</p>
          <h1>Hello, I'm Your Name</h1>
        </div>
      </section>

      <section className="about-content">
        <div className="about-grid">
          <div className="about-image">
            <div className="about-placeholder">
              <span>Portrait</span>
            </div>
          </div>

          <div className="about-text">
            <p className="about-intro">
              I'm a developer and designer passionate about creating
              digital experiences that feel both beautiful and intuitive.
            </p>

            <p>
              Currently, I'm a student at Fractal Tech Bootcamp, where I'm
              deepening my skills in full-stack development and design thinking.
              I believe that the best digital products emerge from the intersection
              of technical precision and creative vision.
            </p>

            <p>
              Before diving into tech, I spent time exploring various creative
              fields—each experience informing my approach to design and
              problem-solving today.
            </p>

            <p>
              When I'm not coding, you'll find me visiting museums, reading
              about typography, or experimenting with new creative tools.
            </p>
          </div>
        </div>
      </section>

      <section className="skills section">
        <div className="skills-content">
          <div className="section-header">
            <p className="section-label">Capabilities</p>
            <h2 className="section-title">What I Do</h2>
          </div>

          <div className="skills-grid">
            <div className="skill-category">
              <h3>Development</h3>
              <ul>
                <li>React & Next.js</li>
                <li>JavaScript / TypeScript</li>
                <li>Node.js</li>
                <li>HTML & CSS</li>
                <li>Git & Version Control</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3>Design</h3>
              <ul>
                <li>UI/UX Design</li>
                <li>Visual Design</li>
                <li>Figma</li>
                <li>Typography</li>
                <li>Design Systems</li>
              </ul>
            </div>

            <div className="skill-category">
              <h3>Other</h3>
              <ul>
                <li>Technical Writing</li>
                <li>Problem Solving</li>
                <li>Collaboration</li>
                <li>Continuous Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="connect section">
        <div className="connect-content">
          <h2>Let's Connect</h2>
          <p>
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="connect-links">
            <a href="mailto:hello@example.com" className="connect-link">
              Email
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="connect-link">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="connect-link">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="connect-link">
              Twitter
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
