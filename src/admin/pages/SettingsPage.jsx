import React, { useState } from 'react';
import Card from '../components/Card';
import FormField from '../components/FormField';
import Alert from '../components/Alert';

const SettingsPage = () => {
  const [form, setForm] = useState({
    schoolName: 'Sarang School',
    email: 'info@sarangschool.com',
    phone: '9876543210',
    address: '123 Main St, City',
    logoUrl: '',
  });
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Settings saved successfully');
    // In a real app, persist to backend here
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>System Settings</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      <Card>
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '700px' }}>
          <FormField
            label="School Name"
            name="schoolName"
            value={form.schoolName}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
          />
          <FormField
            label="Email"
            name="email"
            value={form.email}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
            type="email"
          />
          <FormField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
            type="tel"
          />
          <FormField
            label="Address"
            name="address"
            type="textarea"
            value={form.address}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
            rows={3}
          />
          <FormField
            label="Logo URL"
            name="logoUrl"
            value={form.logoUrl}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
          />
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
