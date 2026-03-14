import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks';
import AdminLayout from './layout/AdminLayout';

// Pages
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import PromotionsPage from './pages/PromotionsPage';
import FeesPage from './pages/FeesPage';
import ReceiptsPage from './pages/ReceiptsPage';
import DefaultersPage from './pages/DefaultersPage';
import ReportsPage from './pages/ReportsPage';
import SessionsPage from './pages/SessionsPage';
import NoticesPage from './pages/NoticesPage';
import GalleryPage from './pages/GalleryPage';
import SettingsPage from './pages/SettingsPage';

const ProtectedAdminRoute = ({ component: Component, requiredRole = null }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" />;
  }

  if (requiredRole && user.role !== 'SUPER_ADMIN' && user.role !== requiredRole) {
    return (
      <AdminLayout>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
};

const AdminRouter = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />

      <Route
        path="dashboard"
        element={<ProtectedAdminRoute component={DashboardPage} />}
      />

      {/* SUPER_ADMIN ONLY Routes */}
      <Route
        path="students"
        element={
          <ProtectedAdminRoute
            component={StudentsPage}
          />
        }
      />
      <Route
        path="admissions"
        element={
          <ProtectedAdminRoute
            component={AdmissionsPage}
          />
        }
      />
      <Route
        path="promotions"
        element={
          <ProtectedAdminRoute
            component={PromotionsPage}
          />
        }
      />
      <Route
        path="fees"
        element={
          <ProtectedAdminRoute
            component={FeesPage}
          />
        }
      />
      <Route
        path="receipts"
        element={
          <ProtectedAdminRoute
            component={ReceiptsPage}
          />
        }
      />
      <Route
        path="defaulters"
        element={
          <ProtectedAdminRoute
            component={DefaultersPage}
          />
        }
      />
      <Route
        path="reports"
        element={
          <ProtectedAdminRoute
            component={ReportsPage}
          />
        }
      />
      <Route
        path="sessions"
        element={
          <ProtectedAdminRoute
            component={SessionsPage}
          />
        }
      />

      {/* ADMIN Routes (Content Management) */}
      <Route
        path="notices"
        element={
          <ProtectedAdminRoute
            component={NoticesPage}
          />
        }
      />
      <Route
        path="gallery"
        element={
          <ProtectedAdminRoute
            component={GalleryPage}
          />
        }
      />

      {/* Common Routes */}
      <Route
        path="settings"
        element={
          <ProtectedAdminRoute
            component={SettingsPage}
          />
        }
      />

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRouter;
