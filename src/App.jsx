import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Work from './pages/Work'
import Writing from './pages/Writing'
import About from './pages/About'
import ConwayBackground from './components/ConwayBackground'

function App() {
  return (
    <div className="app">
      <ConwayBackground />
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className="nav-logo">
            Portfolio
          </NavLink>
          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/work"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Work
            </NavLink>
            <NavLink
              to="/writing"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Writing
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              About
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2026</span>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hello@example.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
