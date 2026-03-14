import React, { useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FormField from '../components/FormField';
import { mockSessions } from '../utils/mockData';
import { formatDate } from '../utils/helpers';

const SessionsPage = () => {
  const [sessions, setSessions] = useState(mockSessions);
  const [form, setForm] = useState({
    name: '',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });

  const handleActivate = (id) => {
    setSessions((prev) =>
      prev.map((session) => ({
        ...session,
        isActive: session.id === id,
      }))
    );
  };

  const handleCreate = () => {
    if (!form.name) return;
    const newSession = {
      id: Date.now().toString(),
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      isActive: false,
    };
    setSessions((prev) => [newSession, ...prev]);
    setForm({ ...form, name: '' });
  };

  const columns = [
    { key: 'name', label: 'Session' },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'isActive',
      label: 'Active',
      render: (value) => (value ? 'Yes' : 'No'),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Session Management</h1>

      <Card>
        <h3>Create New Session</h3>
        <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
          <FormField
            label="Session Name"
            name="name"
            value={form.name}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
            placeholder="2026-27"
          />
          <FormField
            label="Start Date"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
          />
          <FormField
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={(name, value) => setForm((prev) => ({ ...prev, [name]: value }))}
          />
          <button className="btn btn-primary" onClick={handleCreate}>
            Create Session
          </button>
        </div>
      </Card>

      <Card>
        <h3>Existing Sessions</h3>
        <DataTable
          columns={columns}
          data={sessions}
          onView={(session) => handleActivate(session.id)}
          actions={true}
        />
        <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
          Click "View" to activate a session. Only one session can be active at a time.
        </p>
      </Card>
    </div>
  );
};

export default SessionsPage;
