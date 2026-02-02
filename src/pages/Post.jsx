import { Link, useParams } from 'react-router-dom'
import './Post.css'
import posts from '../data/posts'

function Post() {
  const { slug } = useParams()
  const post = posts.find((entry) => entry.slug === slug)

  if (!post) {
    return (
      <div className="page post-page">
        <section className="post-hero">
          <div className="post-hero-content">
            <p className="page-label">Journal</p>
            <h1>Post not found</h1>
            <p className="page-description">
              The entry you are looking for does not exist yet.
            </p>
            <Link to="/writing" className="post-back-link">
              Back to Writing
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page post-page">
      <section className="post-hero">
        <div className="post-hero-content">
          <p className="page-label">Journal</p>
          <h1>{post.title}</h1>
          <p className="page-description">{post.excerpt}</p>
          <div className="post-hero-meta">
            <span>{post.date}</span>
            <span className="post-meta-divider">/</span>
            <span>{post.category}</span>
            <span className="post-meta-divider">/</span>
            <span>{post.readTime}</span>
          </div>
          <Link to="/writing" className="post-back-link">
            Back to Writing
          </Link>
        </div>
      </section>

      <section className="post-body">
        <div className="post-body-content">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Post
