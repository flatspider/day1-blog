import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import Post from "./pages/Post";
import About from "./pages/About";
import ConwayBackground from "./components/ConwayBackground";
import ControlPanel from "./components/ControlPanel";

const FOOTER_MESSAGES = [
  "Running on vibes and CSS",
  "Made with questionable decisions",
  "Powered by caffeine and spite",
  "Certified 100% human-made (probably)",
  "This footer serves no purpose",
];

const DEFAULT_SCANLINE_OPACITY = 0.06;

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [footerMessage, setFooterMessage] = useState(FOOTER_MESSAGES[0]);
  const [clickCount, setClickCount] = useState(0);

  // Control panel state
  const [screenOn, setScreenOn] = useState(true);
  const [scanlineOpacity, setScanlineOpacity] = useState(DEFAULT_SCANLINE_OPACITY);

  // Update CSS variable when scanline opacity changes
  useEffect(() => {
    document.documentElement.style.setProperty('--crt-scan-opacity', scanlineOpacity);
  }, [scanlineOpacity]);

  const handleFooterClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setFooterMessage(FOOTER_MESSAGES[newCount % FOOTER_MESSAGES.length]);
  };

  const handleScanlineChange = useCallback((opacity) => {
    setScanlineOpacity(opacity);
  }, []);

  const handleResetConway = useCallback(() => {
    window.dispatchEvent(new CustomEvent('conway-reset'));
  }, []);

  return (
    <>
      <div className={`crt ${!screenOn && isHome ? 'screen-off' : ''}`}>
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

      {/* CRT monitor bezel frame - OUTSIDE .crt to avoid filter containment */}
      {isHome && <div className="crt-bezel" />}

      {/* Control panel OUTSIDE .crt to avoid filter containment */}
      {isHome && (
        <ControlPanel
          isOn={screenOn}
          onToggle={() => setScreenOn(!screenOn)}
          scanlineOpacity={scanlineOpacity}
          onScanlineChange={handleScanlineChange}
          onResetConway={handleResetConway}
        />
      )}
    </>
  );
}

export default App;
