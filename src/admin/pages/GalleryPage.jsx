import React, { useState } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import { mockGallery } from '../utils/mockData';

const GalleryPage = () => {
  const [gallery, setGallery] = useState(mockGallery);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    isHomepageBanner: false,
  });
  const [message, setMessage] = useState('');

  const handleAdd = () => {
    if (!formData.name || !formData.url) {
      setMessage('Please add a name and image URL');
      return;
    }

    setGallery((prev) => [
      {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        uploadDate: new Date().toISOString().slice(0, 10),
        isHomepageBanner: formData.isHomepageBanner,
      },
      ...prev,
    ]);

    setFormData({ name: '', url: '', isHomepageBanner: false });
    setModalOpen(false);
    setMessage('Image added to gallery');
  };

  const handleDelete = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    setMessage('Image removed from gallery');
  };

  const toggleBanner = (id) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isHomepageBanner: !item.isHomepageBanner }
          : item
      )
    );
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Gallery</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      <Card>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Upload Image
        </button>

        <div className="gallery-grid" style={{ marginTop: '1.5rem' }}>
          {gallery.map((item) => (
            <div key={item.id} className="card" style={{ padding: '0.5rem' }}>
              <img
                src={item.url}
                alt={item.name}
                style={{ width: '100%', borderRadius: '6px' }}
              />
              <div style={{ marginTop: '0.75rem' }}>
                <strong>{item.name}</strong>
                <p style={{ fontSize: '0.85rem', margin: '0.25rem 0' }}>
                  Uploaded: {item.uploadDate}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => toggleBanner(item.id)}
                  >
                    {item.isHomepageBanner ? 'Unset Banner' : 'Set as Banner'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {gallery.length === 0 && (
            <p style={{ color: '#64748b' }}>No images yet. Upload one to get started.</p>
          )}
        </div>
      </Card>

      <Modal
        isOpen={modalOpen}
        title="Upload Gallery Image"
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
        submitText="Upload"
      >
        <FormField
          label="Image Name"
          name="name"
          value={formData.name}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <FormField
          label="Image URL"
          name="url"
          value={formData.url}
          onChange={(name, value) => setFormData((prev) => ({ ...prev, [name]: value }))}
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            id="bannerToggle"
            type="checkbox"
            checked={formData.isHomepageBanner}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isHomepageBanner: e.target.checked,
              }))
            }
          />
          <label htmlFor="bannerToggle">Set as homepage banner</label>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
