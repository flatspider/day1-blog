import "./Work.css";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Web Development",
    year: "2026",
    description: "A full-stack application built with modern technologies.",
    tags: ["React", "Node.js", "PostgreSQL"],
    color: "#e8e6e3",
  },
  {
    id: 2,
    title: "Project Beta",
    category: "UI/UX Design",
    year: "2025",
    description: "Complete redesign of a mobile banking experience.",
    tags: ["Figma", "User Research", "Prototyping"],
    color: "#f0eeeb",
  },
  {
    id: 3,
    title: "Project Gamma",
    category: "Creative Development",
    year: "2025",
    description: "Interactive storytelling through web technologies.",
    tags: ["Three.js", "GSAP", "WebGL"],
    color: "#e8e6e3",
  },
  {
    id: 4,
    title: "Project Delta",
    category: "Brand Identity",
    year: "2024",
    description: "Visual identity system for a sustainable fashion brand.",
    tags: ["Branding", "Typography", "Print"],
    color: "#f0eeeb",
  },
];

function Work() {
  return (
    <div className="page work">
      <section className="work-hero">
        <div className="work-hero-content">
          <p className="page-label">Portfolio</p>
          <h1>Selected Work</h1>
          <p className="page-description">
            A curated collection of projects spanning design, development, and
            everything in between.
          </p>
        </div>
      </section>

      <section className="work-grid-section">
        <div className="work-grid">
          {projects.map((project, index) => (
            <article key={project.id} className="work-item">
              <div className="work-item-image">
                <div
                  className="work-placeholder"
                  style={{ backgroundColor: project.color }}
                >
                  <span className="work-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="work-item-content">
                <div className="work-item-meta">
                  <span className="work-category">{project.category}</span>
                  <span className="work-year">{project.year}</span>
                </div>
                <h2 className="work-title">{project.title}</h2>
                <p className="work-description">{project.description}</p>
                <div className="work-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="work-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-cta section">
        <div className="work-cta-content">
          <h2>Interested in working together?</h2>
          <p>I'm always open to discussing new projects and opportunities.</p>
          <a href="mailto:c.s.mcmanamon@gmail.com" className="contact-link">
            Get in touch &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}

export default Work;
