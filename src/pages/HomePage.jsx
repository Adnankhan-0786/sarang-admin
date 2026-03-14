import { useState, useEffect, useRef } from 'react'
import { IMGS } from '../assets/images'

const SLIDES = [
  {
    img: IMGS.banner1,
    headline: (<>Nurturing <span>Bright Minds</span><br />for Tomorrow</>),
    sub: 'St. Sarang Convent School — where knowledge meets character. A premier institution in Kaushambi, U.P.',
  },
  {
    img: IMGS.banner2,
    headline: (<>Excellence in <span>Education</span><br />Since 2021</>),
    sub: 'Managed by Khanqah-e-Arifia Welfare Society, delivering holistic education to every child.',
  },
  {
    img: IMGS.banner3,
    headline: (<>Building <span>Leaders</span><br />of Tomorrow</>),
    sub: 'Modern facilities, expert faculty, and value-based education in the heart of Kaushambi.',
  },
]

const EVENTS = [
  { cat: 'ANNUAL EVENT', img: IMGS.banner1, date: 'NOV 24, 2025', title: '4th Foundation Day Celebration', desc: 'A grand celebration marking 4 years of academic excellence with cultural programs and award ceremonies.' },
  { cat: 'SPORTS', img: IMGS.banner2, date: 'JAN 2026', title: 'Annual Sports Day 2025–26', desc: 'Students showcased their athletic talents in various competitions with outstanding performances.' },
  { cat: 'CEREMONY', img: IMGS.banner3, date: 'DEC 2025', title: 'Investiture Ceremony', desc: 'Student leaders were formally inducted into their roles, pledging to serve the school community.' },
]

const GALLERY = [
  [IMGS.science_lab, 'Science Lab'],
  [IMGS.computer_lab, 'Computer Lab'],
  [IMGS.digital_class, 'Digital Classroom'],
  [IMGS.art_craft, 'Art & Craft'],
  [IMGS.maths_lab, 'Maths Lab'],
  [IMGS.our_mission, 'School Campus'],
]

const FEATURES = ['CBSE Curriculum', 'Smart Classrooms', 'Expert Faculty', 'Sports Facilities', 'Science Labs', 'Computer Lab']

const STATS = [['1200+', 'Students Enrolled'], ['60+', 'Expert Faculty'], ['100%', 'Pass Rate'], ['4', 'Foundation Days']]

const DIRECTORS = [
  {
    // name: 'NAME DA LIHO',
    role: 'Principal',
    photo: IMGS.princ,
    message: `Welcome to St. Sarang Convent School. Our mission is to nurture every child into a confident, knowledgeable, and compassionate individual. We believe in holistic education, blending academic excellence with character development. Here, every student is encouraged to explore, learn, and grow in a safe and inspiring environment.`
  },
  {
    // name: 'HEUNON DA LIHO',
    role: 'Director',
    photo: IMGS.dir,
    message: `At St. Sarang, we focus on holistic growth. Every initiative, every classroom, and every activity is designed to empower students with knowledge, values, and confidence. Together, we aim to create leaders of tomorrow.`
  },
]

export default function HomePage({ setPage }) {
  const [cur, setCur] = useState(0)
  const [dirCur, setDirCur] = useState(0)
  const galRef = useRef(null)

  // Hero slider
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Auto gallery scroll
  useEffect(() => {
    let pos = 0
    const track = galRef.current
    if (!track) return
    const iv = setInterval(() => {
      pos += 0.8
      const max = track.scrollWidth - track.parentElement.offsetWidth
      if (pos >= max) pos = 0
      track.style.transform = `translateX(-${pos}px)`
    }, 16)
    return () => clearInterval(iv)
  }, [])

  // Director / Principal auto slider
  useEffect(() => {
    const t = setInterval(() => setDirCur(c => (c + 1) % DIRECTORS.length), 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>

      {/* ── HERO ── */}
      <section className="hero">
        {SLIDES.map((s, i) => (
          <div key={i} className={`slide${i === cur ? ' active' : ''}`} style={{ backgroundImage: `url(${s.img})` }}>
            <div className="slide-ov" />
          </div>
        ))}
        <div className="hero-content">
          <div className="hero-badge">✦ Excellence in Education Since 2021 ✦</div>
          <h1 className="hero-title">{SLIDES[cur].headline}</h1>
          <p className="hero-sub">{SLIDES[cur].sub}</p>
          <div className="hero-btns">
            <a className="btn-gold" onClick={() => setPage('admissions')}>Apply for Admission</a>
            <a className="btn-wout" onClick={() => setPage('about')}>Explore School</a>
          </div>
        </div>
        <div className="slider-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`dot${i === cur ? ' active' : ''}`} onClick={() => setCur(i)} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section sec-white">
        <div className="container">
          <div className="abt-grid">
            <div className="abt-img">
              <img src={IMGS.abouts} alt="About School" />
              <div className="abt-badge">
                <div className="num">4+</div>
                <div className="lbl">Years of Excellence</div>
              </div>
            </div>
            <div className="abt-content">
              <div className="sec-tag">About Our School</div>
              <h2>A Legacy of <span>Academic Excellence</span> &amp; Values</h2>
              <p>St. Sarang Convent School, established in 2021 under Khanqah-e-Arifia Welfare Society, stands as a beacon of quality education in Saiyed Sarawan, Kaushambi.</p>
              <p>We offer a nurturing environment where every student reaches their full potential through innovative teaching and character development.</p>
              <div className="feat-grid">
                {FEATURES.map(f => (
                  <div className="feat-item" key={f}><i className="fas fa-check-circle" />{f}</div>
                ))}
              </div>
              <a className="btn-navy" onClick={() => setPage('about')}>Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map(([n, l]) => (
              <div className="stat-card" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DIRECTOR / PRINCIPAL SLIDER ── */}
      <section style={{ background: 'linear-gradient(135deg, #f9f3e7 0%, #d4e6f1 100%)', padding: 60, fontFamily: "'Georgia', serif", textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', overflow: 'hidden', position: 'relative' }}>
          <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${dirCur * 100}%)` }}>
            {DIRECTORS.map((d, i) => (
              <div key={i} style={{ flex: '0 0 100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
                <img src={d.photo} alt={d.name} style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', marginBottom: 20, border: '4px solid #1a3d6d' }} />
                <div style={{ fontSize: 28, fontWeight: 'bold', color: '#1a3d6d', marginBottom: 15 }}>{d.name} — {d.role}</div>
                <p style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 700, textAlign: 'center' }}>{d.message}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            {DIRECTORS.map((_, i) => (
              <button key={i} onClick={() => setDirCur(i)} style={{ width: 12, height: 12, borderRadius: '50%', margin: '0 5px', border: 'none', background: i === dirCur ? '#1a3d6d' : '#ccc', cursor: 'pointer' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="section sec-gray">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">School Life</div>
            <h2 className="sec-title">Latest <span>News &amp; Events</span></h2>
            <div className="divider" />
          </div>
          <div className="ev-grid">
            {EVENTS.map((e, i) => (
              <div className="ev-card" key={i}>
                <div className="ev-img">
                  <div className="ev-cat">{e.cat}</div>
                  <img src={e.img} alt={e.title} />
                </div>
                <div className="ev-body">
                  <div className="ev-date">{e.date}</div>
                  <div className="ev-title">{e.title}</div>
                  <p className="ev-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 38 }}>
            <a className="btn-outline-navy" onClick={() => setPage('news')}>View All Events</a>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section sec-white">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">Our Gallery</div>
            <h2 className="sec-title">Life at <span>St. Sarang</span></h2>
            <div className="divider" />
          </div>
          <div className="gal-wrap">
            <div className="gal-track" ref={galRef}>
              {GALLERY.map(([src, lbl]) => (
                <div className="gal-item" key={lbl}>
                  <img src={src} alt={lbl} />
                  <div className="gal-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}