// Layout Components
export { default as AdminLayout } from './layout/AdminLayout'
export { default as AdminSidebar } from './layout/AdminSidebar'
export { default as AdminTopbar } from './layout/AdminTopbar'

// Reusable Components
export { default as DataTable } from './components/DataTable'
export { default as StatCard } from './components/StatCard'
export { default as FormField } from './components/FormField'
export { default as Modal } from './components/Modal'
export { default as Alert } from './components/Alert'
export { default as Card } from './components/Card'
export { default as ProtectedRoute } from './components/ProtectedRoute'
export { default as Badge } from './components/Badge'

// Pages
export { default as AdminLoginPage } from './pages/AdminLoginPage'
export { default as DashboardPage } from './pages/DashboardPage'
export { default as StudentsPage } from './pages/StudentsPage'
export { default as FeesPage } from './pages/FeesPage'
export { default as ReceiptsPage } from './pages/ReceiptsPage'
export { default as DefaultersPage } from './pages/DefaultersPage'
export { default as ReportsPage } from './pages/ReportsPage'
export { default as SessionsPage } from './pages/SessionsPage'
export { default as PromotionsPage } from './pages/PromotionsPage'
export { default as NoticesPage } from './pages/NoticesPage'
export { default as GalleryPage } from './pages/GalleryPage'
export { default as SettingsPage } from './pages/SettingsPage'
export { default as AdmissionsPage } from './pages/AdmissionsPage'

// Hooks
export { useAuth } from './hooks/useAuth'

// Context
export { AuthContext, AuthProvider } from './context/AuthContext'

// Utils
export * from './utils/helpers'
export * from './utils/mockData'
