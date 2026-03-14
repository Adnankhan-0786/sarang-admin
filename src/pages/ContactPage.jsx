import { useState } from 'react'
import { IMGS } from '../assets/images'
import FormField from '../components/FormField'

const CONTACT_INFO = [
  {
    icon: 'fa-map-marker-alt',
    label: 'Address',
    content: <p>Saiyed Sarawan, Kaushambi,<br />Uttar Pradesh - 212213</p>,
  },
  {
    icon: 'fa-phone',
    label: 'Phone',
    content: <a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>,
  },
  {
    icon: 'fa-envelope',
    label: 'Email',
    content: <a href="mailto:info@stsarang.edu.in">info@stsarang.edu.in</a>,
  },
  {
    icon: 'fa-clock',
    label: 'School Hours',
    content: <p>Mon – Sat: 7:30 AM – 2:30 PM<br />Sunday: Closed</p>,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', msg: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const validate = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Valid email required'
    if (!/^\d{10}$/.test(form.phone)) err.phone = 'Valid 10-digit phone required'
    if (!form.msg.trim()) err.msg = 'Message is required'
    setErrors(err)
    if (Object.keys(err).length === 0) setDone(true)
  }

  return (
    <div>
      <div className="pb">
        <img src={IMGS.about_banner} alt="Contact Us" />
        <div className="pb-ov" />
        <div className="pb-cnt">
          <h1>Contact Us</h1>
          <div className="pb-bc">Get in Touch · We're Here to Help</div>
        </div>
      </div>

      <section className="section sec-gray">
        <div className="container">
          <div className="ct-grid">
            {/* Contact Info */}
            <div>
              <div className="ct-info">
                <div className="sec-tag" style={{ marginBottom: 22 }}>Get In Touch</div>
                {CONTACT_INFO.map(ci => (
                  <div className="ct-item" key={ci.label}>
                    <div className="ct-icon"><i className={`fas ${ci.icon}`} /></div>
                    <div>
                      <h4>{ci.label}</h4>
                      {ci.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="map-box">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57592.37!2d81.3715!3d25.5334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acafc00000001%3A0x0!2sKaushambi%2C+Uttar+Pradesh!5e0!3m2!1sen!2sin!4v1"
                  allowFullScreen
                  loading="lazy"
                  title="School Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="ct-fc">
              <h3>Send Us a Message</h3>
              <p style={{ color: 'var(--text2)', fontSize: 13, margin: '5px 0 22px' }}>
                We'd love to hear from you. Fill out the form below.
              </p>
              {!done ? (
                <form onSubmit={validate}>
                  <FormField label="Your Name" id="ct-name" placeholder="Enter your full name" error={errors.name} onChange={update('name')} />
                  <div className="fg-row">
                    <FormField label="Email" id="ct-email" type="email" placeholder="Your email address" error={errors.email} onChange={update('email')} />
                    <FormField label="Phone" id="ct-phone" type="tel" placeholder="Your phone number" error={errors.phone} onChange={update('phone')} />
                  </div>
                  <div className="fg">
                    <label htmlFor="ct-msg">Message</label>
                    <textarea id="ct-msg" placeholder="Write your message here..." onChange={update('msg')} style={{ minHeight: 120 }} />
                    {errors.msg && <div className="ferr show">{errors.msg}</div>}
                  </div>
                  <button type="submit" className="sub-btn">
                    <i className="fas fa-paper-plane" style={{ marginRight: 8 }} />Send Message
                  </button>
                </form>
              ) : (
                <div className="sbox" style={{ marginTop: 28 }}>
                  <i className="fas fa-check-circle" />
                  <h3 style={{ color: 'var(--navy)' }}>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
