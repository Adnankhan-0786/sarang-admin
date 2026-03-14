import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import { fetchNotices, createNotice, updateNotice, deleteNotice } from '../services/api';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [message, setMessage] = useState('');
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices()
        setNotices(data)
      } catch (err) {
        setApiError('Could not load notices (mock mode)')
      }
    }

    loadNotices()
  }, [])

  const openNew = () => {
    setEditing(null);
    setFormData({ title: '', content: '' });
    setModalOpen(true);
  };

  const openEdit = (notice) => {
    setEditing(notice);
    setFormData({ title: notice.title, content: notice.content });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) return;

    if (editing) {
      try {
        const updated = await updateNotice(editing.id, {
          title: formData.title,
          content: formData.content,
        })
        setNotices((prev) =>
          prev.map((n) => (n.id === editing.id ? updated : n))
        )
        setMessage('Notice updated successfully')
      } catch (err) {
        setNotices((prev) =>
          prev.map((n) =>
            n.id === editing.id
              ? { ...n, title: formData.title, content: formData.content }
              : n
          )
        )
        setMessage('Notice updated locally (mock mode)')
      }
    } else {
      const newNotice = {
        title: formData.title,
        content: formData.content,
        date: new Date().toISOString().slice(0, 10),
        createdBy: 'Admin User',
      }

      try {
        const created = await createNotice(newNotice)
        setNotices((prev) => [created, ...prev])
        setMessage('Notice created successfully')
      } catch (err) {
        setNotices((prev) => [
          { id: Date.now().toString(), ...newNotice },
          ...prev,
        ])
        setMessage('Notice created locally (mock mode)')
      }
    }

    setModalOpen(false);
  };

  const handleDelete = async (notice) => {
    try {
      await deleteNotice(notice.id)
      setNotices((prev) => prev.filter((n) => n.id !== notice.id))
      setMessage('Notice deleted')
    } catch (err) {
      setNotices((prev) => prev.filter((n) => n.id !== notice.id))
      setMessage('Notice deleted locally (mock mode)')
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Notices</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      {apiError && (
        <Alert type="warning" message={apiError} onClose={() => setApiError('')} />
      )}

      <Card>
        <button className="btn btn-primary" onClick={openNew}>
          + Add Notice
        </button>

        <div style={{ marginTop: '1.5rem' }}>
          <DataTable
            columns={[
              { key: 'title', label: 'Title' },
              { key: 'date', label: 'Date' },
              { key: 'createdBy', label: 'Created By' },
            ]}
            data={notices}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        </div>
      </Card>

      <Modal
        isOpen={modalOpen}
        title={editing ? 'Edit Notice' : 'New Notice'}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        submitText={editing ? 'Update' : 'Create'}
      >
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <FormField
          label="Content"
          name="content"
          type="textarea"
          value={formData.content}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          rows={4}
          required
        />
      </Modal>
    </div>
  );
};

export default NoticesPage;
