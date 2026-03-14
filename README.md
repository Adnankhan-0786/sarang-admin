# St. Sarang Convent School - React Website

A modern, premium React website for **St. Sarang Convent School**, Saiyed Sarawan, Kaushambi, Uttar Pradesh.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Navigate to the project folder
cd st_sarang_school

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
st_sarang_school/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── App.jsx                  # Main app + routing
    ├── main.jsx                 # React entry point
    ├── assets/
    │   ├── images.js            # Image imports
    │   └── images/              # All school images
    │       ├── logo.png
    │       ├── banner1.png
    │       ├── banner2.jpg
    │       ├── banner3.jpg
    │       ├── about_banner.jpg
    │       ├── science_lab.jpg
    │       ├── maths_lab.jpg
    │       ├── computer_lab.jpg
    │       ├── digital_class.jpg
    │       ├── art_craft.jpg
    │       ├── our_mission.jpg
    │       └── our_vision.jpg
    ├── components/
    │   ├── Navbar.jsx           # Sticky navbar with mobile menu
    │   ├── Footer.jsx           # Footer with links & social
    │   └── FormField.jsx        # Reusable form input component
    ├── pages/
    │   ├── HomePage.jsx         # Hero slider, about preview, stats, events, gallery
    │   ├── AboutPage.jsx        # Mission/Vision, facilities, salient features
    │   ├── NewsPage.jsx         # World Earth Day events grid
    │   ├── AdmissionsPage.jsx   # Requirements & admission process
    │   ├── SignupPage.jsx       # Sign up form with validation
    │   ├── RegistrationPage.jsx # Student registration form
    │   └── ContactPage.jsx      # Contact info + form + map
    └── styles/
        └── global.css           # All CSS styles
```

---

## 🎨 Design

- **Theme:** White background with Navy & Gold accents
- **Font:** Playfair Display (headings) + DM Sans (body)
- **Colors:**
  - Primary Navy: `#0B1F3A`
  - Accent Blue: `#1E4D8C`
  - Gold: `#C8901A` / `#F5B041`
- **Fully Responsive** — mobile-first design

---

## 📄 Pages

| Page | Route Key | Description |
|------|-----------|-------------|
| Home | `home` | Hero slider, about preview, stats, events, gallery |
| About | `about` | Mission/Vision, 5 facilities, salient features |
| News & Events | `news` | World Earth Day 2023–2028 grid |
| Admissions | `admissions` | Documents required + admission steps |
| Sign Up | `signup` | Account creation form |
| Registration | `registration` | Student admission registration |
| Contact | `contact` | Contact info + form + Google Map |

---

## 🏫 School Details

- **Name:** St. Sarang Convent School
- **Location:** Saiyed Sarawan, Kaushambi, Uttar Pradesh
- **Established:** 2021
- **Managed by:** Khanqah-e-Arifia Welfare Society

---

Built with ❤️ using React + Vite
