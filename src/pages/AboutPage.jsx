import { IMGS } from '../assets/images'

const FACILITIES = [
  {
    img: IMGS.science_lab,
    icon: 'fas fa-flask',
    title: 'Science Laboratory',
    desc: 'Our fully-equipped science laboratory provides hands-on experience in physics, chemistry, and biology. Modern instruments including microscopes, experimental apparatus, and safety equipment ensure a world-class learning environment for scientific exploration.',
    reverse: false,
  },
  {
    img: IMGS.digital_class,
    icon: 'fas fa-chalkboard-teacher',
    title: 'Digital Classrooms',
    desc: 'Smart classrooms equipped with interactive whiteboards, projectors, and modern audio-visual systems transform traditional education into an immersive, engaging experience that prepares students for the digital age.',
    reverse: true,
  },
  {
    img: IMGS.maths_lab,
    icon: 'fas fa-calculator',
    title: 'Mathematics Laboratory',
    desc: 'The mathematics lab bridges the gap between abstract concepts and practical understanding. Students engage with geometric models, measurement tools, and puzzles that make learning both enjoyable and effective.',
    reverse: false,
  },
  {
    img: IMGS.computer_lab,
    icon: 'fas fa-desktop',
    title: 'Computer Laboratory',
    desc: 'Our modern computer lab features the latest hardware and software, providing digital literacy skills essential for the 21st century. Students learn programming, data management, and digital communication.',
    reverse: true,
  },
  {
    img: IMGS.art_craft,
    icon: 'fas fa-palette',
    title: 'Art & Craft',
    desc: 'Creativity flourishes in our dedicated art and craft studio. Students explore various artistic mediums including painting, sculpture, and crafts, developing creative thinking and fine motor skills that nurture imagination.',
    reverse: false,
  },
]

const FEATURES = [
  { icon: 'fas fa-book-open', title: 'CBSE Curriculum', desc: 'Following the comprehensive CBSE syllabus with a focus on conceptual understanding and practical application.' },
  { icon: 'fas fa-users', title: 'Expert Faculty', desc: 'Highly qualified and experienced teachers dedicated to bringing out the best in every student.' },
  { icon: 'fas fa-shield-alt', title: 'Safe Environment', desc: 'A secure, inclusive campus where every child feels safe, respected, and valued.' },
  { icon: 'fas fa-trophy', title: 'Co-curricular Activities', desc: 'Sports, cultural programs, debates, and more to develop well-rounded personalities.' },
  { icon: 'fas fa-heart', title: 'Value Education', desc: 'Instilling moral values, discipline, and integrity alongside academic excellence.' },
  { icon: 'fas fa-child', title: 'Holistic Development', desc: 'Nurturing intellectual, emotional, social, and physical growth of every student.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="pb">
        <img src={IMGS.about_banner} alt="About Us" />
        <div className="pb-ov" />
        <div className="pb-cnt">
          <h1>About Us</h1>
          <div className="pb-bc">Our Story · Our Mission · Our Vision</div>
        </div>
      </div>

      {/* About + Mission/Vision */}
      <section className="section sec-white">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">Who We Are</div>
            <h2 className="sec-title">Our <span>School</span></h2>
            <div className="divider" />
            <p className="sec-desc">St. Sarang Convent School is a co-educational institution founded in 2021 under Khanqah-e-Arifia Welfare Society in Saiyed Sarawan, Kaushambi, providing quality education to every child.</p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="mv-grid">
            <div className="mv-card">
              <img src={IMGS.our_mission} alt="Our Mission" />
              <div className="mv-ov">
                <div className="mv-icon"><i className="fas fa-bullseye" /></div>
                <h3>Our Mission</h3>
                <div className="mv-txt">To provide exceptional, value-based education that empowers students with knowledge, skills, and character. We create a stimulating learning environment where every child discovers their unique potential and grows into a responsible citizen of the nation.</div>
              </div>
            </div>
            <div className="mv-card">
              <img src={IMGS.our_vision} alt="Our Vision" />
              <div className="mv-ov">
                <div className="mv-icon"><i className="fas fa-eye" /></div>
                <h3>Our Vision</h3>
                <div className="mv-txt">To be a leading institution that nurtures global citizens with strong moral foundations. We envision a school where innovation meets tradition, producing leaders who contribute positively to society and uphold the highest standards of integrity and excellence.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section sec-gray">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">Infrastructure</div>
            <h2 className="sec-title">World-Class <span>Facilities</span></h2>
            <div className="divider" />
          </div>

          {FACILITIES.map((f, i) => (
            <div className="fac-row" key={i} style={f.reverse ? { direction: 'rtl' } : {}}>
              <div className="fac-img" style={{ direction: 'ltr' }}>
                <img src={f.img} alt={f.title} />
              </div>
              <div className="fac-content" style={{ direction: 'ltr' }}>
                <div className="fac-icon"><i className={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Salient Features */}
      <section className="section sec-white">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">Why Choose Us</div>
            <h2 className="sec-title">Salient <span>Features</span></h2>
            <div className="divider" />
          </div>
          <div className="fc-grid">
            {FEATURES.map(f => (
              <div className="fc-card" key={f.title}>
                <i className={f.icon} />
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
