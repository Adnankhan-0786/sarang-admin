import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './admin/context/AuthContext'
import AdminRouter from './admin/AdminRouter'
import './admin/styles/admin.css'

const NO_FOOTER_PAGES = ['login', '/admin']

function PublicSite() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'home':    return <HomePage setPage={setPage} />
      case 'about':   return <AboutPage />
      case 'news':    return <NewsPage />
      case 'gallery': return <GalleryPage setPage={setPage} />
      case 'contact': return <ContactPage />
      case 'login':   return <LoginPage setPage={setPage} />
      default:        return <HomePage setPage={setPage} />
    }
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar page={page} setPage={setPage} />
      {renderPage()}
      {!NO_FOOTER_PAGES.includes(page) && <Footer setPage={setPage} />}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRouter />} />
          
          {/* Public Website Routes */}
          <Route path="/*" element={<PublicSite />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}
