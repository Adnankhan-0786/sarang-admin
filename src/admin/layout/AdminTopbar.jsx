import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-topbar">
      <div>
        <h2>Sarang School Management System</h2>
        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
          Session: 2025-26
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <p style={{ margin: 0, fontWeight: '500' }}>{user?.name}</p>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
            {user?.role}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: '1rem' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
