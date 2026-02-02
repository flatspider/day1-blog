import { Link } from 'react-router-dom'
import './Writing.css'
import posts from '../data/posts'

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
              <Link to={`/writing/${post.slug}`} className="post-link">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-divider">/</span>
                  <span className="post-category">{post.category}</span>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <span className="post-read-time">{post.readTime}</span>
              </Link>
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
