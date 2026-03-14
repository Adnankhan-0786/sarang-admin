import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const initialApplications = [
  {
    id: 'A001',
    name: 'Anjali Sharma',
    class: 'Class 3',
    fatherName: 'Ramesh Sharma',
    status: 'Under Review',
    appliedOn: '2025-03-10',
  },
  {
    id: 'A002',
    name: 'Rohan Verma',
    class: 'Class 5',
    fatherName: 'Suresh Verma',
    status: 'Approved',
    appliedOn: '2025-03-08',
  },
];

const AdmissionsPage = () => {
  const [applications, setApplications] = useLocalStorageState('admissionsData', initialApplications);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    fatherName: '',
    status: 'Under Review',
  });
  const [message, setMessage] = useState('');

  const stats = useMemo(() => {
    const counts = { total: applications.length, underReview: 0, approved: 0, rejected: 0 };
    applications.forEach((app) => {
      if (app.status === 'Under Review') counts.underReview += 1;
      if (app.status === 'Approved') counts.approved += 1;
      if (app.status === 'Rejected') counts.rejected += 1;
    });
    return counts;
  }, [applications]);

  const openForm = () => {
    setFormData({ name: '', class: '', fatherName: '', status: 'Under Review' });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.class || !formData.fatherName) {
      setMessage('Please fill all required fields');
      return;
    }

    setApplications((prev) => [
      {
        id: `A${Date.now()}`,
        ...formData,
        appliedOn: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);

    setMessage('Application submitted successfully');
    setModalOpen(false);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Admissions</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      <div className="dashboard-grid" style={{ marginBottom: '1.5rem' }}>
        <Card>
          <h3>Total Applications</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.total}</p>
        </Card>
        <Card>
          <h3>Under Review</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.underReview}</p>
        </Card>
        <Card>
          <h3>Approved</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.approved}</p>
        </Card>
        <Card>
          <h3>Rejected</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>{stats.rejected}</p>
        </Card>
      </div>

      <Card>
        <button className="btn btn-primary" onClick={openForm}>
          + New Application
        </button>
        <div style={{ marginTop: '1.5rem' }}>
          <DataTable
            columns={[
              { key: 'id', label: 'Ref #' },
              { key: 'name', label: 'Student' },
              { key: 'class', label: 'Class' },
              { key: 'fatherName', label: 'Father Name' },
              { key: 'status', label: 'Status' },
              { key: 'appliedOn', label: 'Applied On' },
            ]}
            data={applications}
            actions={false}
          />
        </div>
      </Card>

      <Modal
        isOpen={modalOpen}
        title="New Admission Application"
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        submitText="Submit"
      >
        <FormField
          label="Student Name"
          name="name"
          value={formData.name}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <FormField
          label="Class"
          name="class"
          value={formData.class}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <FormField
          label="Father Name"
          name="fatherName"
          value={formData.fatherName}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          options={[
            { value: 'Under Review', label: 'Under Review' },
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' },
          ]}
        />
      </Modal>
    </div>
  );
};

export default AdmissionsPage;
