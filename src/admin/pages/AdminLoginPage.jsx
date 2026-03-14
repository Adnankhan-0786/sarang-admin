import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import { ROLES } from '../utils/mockData';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ROLES.SUPER_ADMIN,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      const success = login(formData.email, formData.password, formData.role);

      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--light-bg)',
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '90%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            📚 Admin Panel
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Sarang School Management System
          </p>
        </div>

        {error && (
          <Alert type="danger" message={error} onClose={() => setError('')} />
        )}

        <form onSubmit={handleSubmit}>
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@school.com"
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <FormField
            label="Login As"
            name="role"
            type="select"
            value={formData.role}
            onChange={handleChange}
            options={[
              {
                value: ROLES.SUPER_ADMIN,
                label: 'Super Admin (Full Access)',
              },
              { value: ROLES.ADMIN, label: 'Admin (Content Only)' },
            ]}
          />

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={loading}
            style={{ marginTop: '1.5rem' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'var(--light-bg)',
          borderRadius: '6px',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
        }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
            Demo Credentials:
          </p>
          <p>Email: admin@school.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
