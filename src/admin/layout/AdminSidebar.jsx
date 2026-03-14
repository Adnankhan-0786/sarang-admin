import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    ...(user?.role === 'SUPER_ADMIN'
      ? [
          { path: '/admin/students', icon: '👨‍🎓', label: 'Students' },
          { path: '/admin/admissions', icon: '📝', label: 'Admissions' },
          { path: '/admin/promotions', icon: '📈', label: 'Promotions' },
          { path: '/admin/fees', icon: '💰', label: 'Fees Collection' },
          { path: '/admin/receipts', icon: '🧾', label: 'Receipts' },
          { path: '/admin/defaulters', icon: '⚠️', label: 'Defaulters' },
          { path: '/admin/reports', icon: '📋', label: 'Reports' },
          { path: '/admin/sessions', icon: '📅', label: 'Sessions' },
        ]
      : []),
    { path: '/admin/notices', icon: '📢', label: 'Notices' },
    { path: '/admin/gallery', icon: '🖼️', label: 'Gallery' },
    { path: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        📚 Admin Panel
        {user && <div className="sidebar-role-badge">{user.role}</div>}
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <li key={item.path} className="sidebar-item">
            <Link
              to={item.path}
              className={`sidebar-link ${isActive(item.path)}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-text">{item.label}</span>
            </Link>
          </li>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
