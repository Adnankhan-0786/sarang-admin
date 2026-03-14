import { useState } from 'react'
import { IMGS } from '../assets/images'

export default function LoginPage({ setPage }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => { setSuccess(false); setPage('home') }, 2000)
    }, 1000)
  }

  return (
    <div className="form-pg">
      <div className="form-card">
        <div className="form-logo">
          <img src={IMGS.logo} alt="Logo" />
        </div>
        <h2>Welcome Back</h2>
        <p className="fc-sub">St. Sarang Convent School Portal</p>

        {success && (
          <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', color: '#065f46', padding: '11px 14px', borderRadius: '9px', marginBottom: '18px', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
            ✅ Login successful! Redirecting...
          </div>
        )}
        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', color: '#C53030', padding: '11px 14px', borderRadius: '9px', marginBottom: '18px', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
            ⚠️ {error}
          </div>
        )}

        <div className="fg">
          <label>Email Address</label>
          <input type="email" placeholder="you@example.com" value={email}
            onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        <div className="fg">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password}
            onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
        </div>

        <div style={{ textAlign: 'right', marginBottom: '20px', marginTop: '-6px' }}>
          <a href="#" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>Forgot Password?</a>
        </div>

        <button className="sub-btn" onClick={handleLogin} disabled={loading} style={{ opacity: loading ? 0.75 : 1 }}>
          {loading ? '⏳ Signing in...' : '🔐 Sign In'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text2)' }}>
          <span onClick={() => setPage('home')} style={{ color: 'var(--accent)', fontWeight: '700', cursor: 'pointer' }}>
            ← Back to Home
          </span>
        </p>
      </div>
    </div>
  )
}
