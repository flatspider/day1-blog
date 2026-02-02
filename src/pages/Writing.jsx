import './Writing.css'

const posts = [
  {
    id: 1,
    title: 'On the Art of Simplicity in Design',
    excerpt: 'Exploring how restraint and intentionality create more meaningful experiences.',
    date: 'January 2026',
    readTime: '5 min read',
    category: 'Design',
  },
  {
    id: 2,
    title: 'Building for the Long Term',
    excerpt: 'Thoughts on sustainable code architecture and the balance between shipping fast and building to last.',
    date: 'December 2025',
    readTime: '8 min read',
    category: 'Development',
  },
  {
    id: 3,
    title: 'The Space Between',
    excerpt: 'Why whitespace is not empty space, and how it shapes the way we experience digital interfaces.',
    date: 'November 2025',
    readTime: '4 min read',
    category: 'Design',
  },
  {
    id: 4,
    title: 'Learning in Public',
    excerpt: 'Reflections on my first month at Fractal Tech Bootcamp and the power of sharing your journey.',
    date: 'February 2026',
    readTime: '6 min read',
    category: 'Personal',
  },
]

function Writing() {
  return (
    <div className="page writing">
      <section className="writing-hero">
        <div className="writing-hero-content">
          <p className="page-label">Journal</p>
          <h1>Writing</h1>
          <p className="page-description">
            Thoughts on design, development, and the creative process.
          </p>
        </div>
      </section>

      <section className="posts-section">
        <div className="posts-list">
          {posts.map((post) => (
            <article key={post.id} className="post-item">
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-divider">/</span>
                <span className="post-category">{post.category}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <span className="post-read-time">{post.readTime}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter section">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>
            Occasional thoughts on design and development, delivered to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Writing
