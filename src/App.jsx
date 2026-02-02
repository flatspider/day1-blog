import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import Post from "./pages/Post";
import About from "./pages/About";
import ConwayBackground from "./components/ConwayBackground";

const FOOTER_MESSAGES = [
  "Running on vibes and CSS",
  "Made with questionable decisions",
  "Powered by caffeine and spite",
  "Certified 100% human-made (probably)",
  "This footer serves no purpose",
];

function App() {
  const [footerMessage, setFooterMessage] = useState(FOOTER_MESSAGES[0]);
  const [clickCount, setClickCount] = useState(0);

  const handleFooterClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setFooterMessage(FOOTER_MESSAGES[newCount % FOOTER_MESSAGES.length]);
  };

  return (
    <div className="crt">
      <div className="app">
        <ConwayBackground />
        <header className="header">
          <nav className="nav">
            <NavLink to="/" className="nav-logo">
              ~/portfolio
            </NavLink>
            <div className="nav-links">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                end
              >
                /home
              </NavLink>
              <NavLink
                to="/work"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                /work
              </NavLink>
              <NavLink
                to="/writing"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                /writing
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                /about
              </NavLink>
            </div>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<Post />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <span
              className="footer-message"
              onClick={handleFooterClick}
              title="Click me"
            >
              {footerMessage}
            </span>
            <div className="footer-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                LinkedIn
              </a>
              <a href="mailto:hello@example.com" className="footer-link">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>
      <div className="crt-scanlines" />
      <div className="crt-noise" />
    </div>
  );
}

export default App;
