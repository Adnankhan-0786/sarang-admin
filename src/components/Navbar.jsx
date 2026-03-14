import { useState, useEffect } from 'react'
import { IMGS } from '../assets/images'

const links = [
  ['home',    'Home'],
  ['about',   'About Us'],
  ['news',    'News & Events'],
  ['gallery', 'Gallery'],
  ['contact', 'Contact Us'],
]

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (p) => {
    setPage(p)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">

          <div className="nav-logo" onClick={() => go('home')}>
            <div className="logo-ring">
              <img src={IMGS.logo} alt="St. Sarang Logo" />
            </div>
            <div className="nav-brand-text">
              <span className="nav-school-name">St. Sarang Convent School</span>
              <span className="nav-school-sub">Est. 2021 · Kaushambi, U.P.</span>
            </div>
          </div>

          <ul className="nav-links">
            {links.map(([p, l]) => (
              <li key={p}>
                <a className={page === p ? 'active' : ''} onClick={() => go(p)}>{l}</a>
              </li>
            ))}
            <li>
              <a className="btn-login-nav" onClick={() => go('login')}>
                <i className="fas fa-sign-in-alt" /> Login
              </a>
            </li>
          </ul>

          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mob-menu${menuOpen ? ' open' : ''}`}>
        {links.map(([p, l]) => (
          <a key={p} className={page === p ? 'active' : ''} onClick={() => go(p)}>{l}</a>
        ))}
        <a onClick={() => go('login')} style={{ color: 'var(--navy)', fontWeight: '700' }}>
          🔐 Login
        </a>
      </div>
    </>
  )
}
