import { IMGS } from '../assets/images'

export default function Footer({ setPage }) {
  const go = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="ft-grid">
        <div className="ft-brand">
          <div className="ft-logo-row">
            <div className="ft-lring"><img src={IMGS.logo} alt="Logo" /></div>
            <div>
              <div className="ft-bn">St. Sarang Convent School</div>
              <div className="ft-bs">Kaushambi · U.P.</div>
            </div>
          </div>
          <p>Managed by Khanqah-e-Arifia Welfare Society. Providing quality education with strong moral values in Saiyed Sarawan, Kaushambi since 2021.</p>
          <div className="ft-soc">
            {[['fab fa-facebook-f', '#'], ['fab fa-instagram', '#'], ['fab fa-youtube', '#'], ['fab fa-whatsapp', '#']].map(([ic, h]) => (
              <a key={ic} className="soc-btn" href={h}><i className={ic} /></a>
            ))}
          </div>
        </div>

        <div className="ft-col">
          <h4>Quick Links</h4>
          <ul>
            {[['home','Home'],['about','About Us'],['news','News & Events'],['gallery','Gallery'],['contact','Contact']].map(([p, l]) => (
              <li key={p}><a onClick={() => go(p)}><i className="fas fa-chevron-right" />{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h4>Facilities</h4>
          <ul>
            {['Science Lab','Computer Lab','Digital Class','Maths Lab','Art & Craft'].map(f => (
              <li key={f}><a href="#"><i className="fas fa-chevron-right" />{f}</a></li>
            ))}
          </ul>
        </div>

        <div className="ft-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="#"><i className="fas fa-map-marker-alt" />Saiyed Sarawan, Kaushambi</a></li>
            <li><a href="tel:+91XXXXXXXXXX"><i className="fas fa-phone" />+91 XXXXX XXXXX</a></li>
            <li><a href="mailto:info@stsarang.edu.in"><i className="fas fa-envelope" />info@stsarang.edu.in</a></li>
          </ul>
        </div>
      </div>

      <div className="ft-bot">
        <p>© 2025 St. Sarang Convent School. All Rights Reserved.</p>
        <p>Managed by Khanqah-e-Arifia Welfare Society</p>
      </div>
    </footer>
  )
}
