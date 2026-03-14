import { IMGS } from '../assets/images'

const NEWS = [
  { yr: '2023', img: IMGS.banner1, title: 'World Earth Day 2023', desc: 'Students raised awareness about environmental conservation through creative displays, plantations, and eco-friendly campaigns on school campus.' },
  { yr: '2024', img: IMGS.banner2, title: 'World Earth Day 2024', desc: 'A grand event featuring student presentations on climate change, renewable energy, and sustainable practices for a greener future.' },
  { yr: '2025', img: IMGS.banner3, title: 'World Earth Day 2025', desc: 'Focused on biodiversity with tree plantation drives, nature walks, and environmental awareness workshops for all classes.' },
  { yr: '2026', img: IMGS.our_mission, title: 'World Earth Day 2026', desc: 'Students participated in city-wide cleanliness drives promoting environmental stewardship and sustainable living.' },
  { yr: '2027', img: IMGS.science_lab, title: 'World Earth Day 2027', desc: 'Innovation meets ecology as students showcased science projects on green energy, water conservation, and waste management.' },
  { yr: '2028', img: IMGS.digital_class, title: 'World Earth Day 2028', desc: 'A digital-themed Earth Day with eco-documentaries, virtual reality experiences, and digital art for environmental advocacy.' },
]

export default function NewsPage() {
  return (
    <div>
      <div className="pb">
        <img src={IMGS.banner2} alt="News & Events" />
        <div className="pb-ov" />
        <div className="pb-cnt">
          <h1>News &amp; Events</h1>
          <div className="pb-bc">School Activities · Celebrations · Achievements</div>
        </div>
      </div>

      <section className="section sec-gray">
        <div className="container">
          <div className="sec-hdr">
            <div className="sec-tag">World Environment</div>
            <h2 className="sec-title">World <span>Earth Day</span> Celebrations</h2>
            <div className="divider" />
          </div>
          <div className="news-grid">
            {NEWS.map(item => (
              <div className="nc" key={item.yr}>
                <div className="nc-img">
                  <div className="nc-yr">{item.yr}</div>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="nc-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
