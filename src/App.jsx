import { Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Work from './pages/Work'
import Writing from './pages/Writing'
import About from './pages/About'
import ConwayBackground from './components/ConwayBackground'

const FOOTER_MESSAGES = [
  "Made with questionable decisions",
  "No pixels were harmed in the making of this website",
  "Powered by caffeine and spite",
  "Built different (literally, the code is weird)",
  "© 20XX - Time is a construct",
  "Certified 100% human-made (probably)",
  "Running on vibes and CSS",
  "This footer serves no purpose"
]

function App() {
  const [footerMessage, setFooterMessage] = useState(FOOTER_MESSAGES[0])
  const [clickCount, setClickCount] = useState(0)

  // Easter egg: click footer text to cycle messages
  const handleFooterClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    setFooterMessage(FOOTER_MESSAGES[newCount % FOOTER_MESSAGES.length])
  }

  // Secret: Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          document.body.classList.add('chaos-mode')
          setTimeout(() => document.body.classList.remove('chaos-mode'), 5000)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
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
          <span className="footer-message" onClick={handleFooterClick} title="Click me">
            {footerMessage}
          </span>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href="mailto:hello@example.com" className="footer-link">Email</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
