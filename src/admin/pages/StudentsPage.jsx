import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import Alert from '../components/Alert';
import { classOptions, sectionOptions } from '../utils/mockData';
import {
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../services/api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true)
      setApiError('')
      try {
        const data = await fetchStudents()
        setStudents(data)
      } catch (err) {
        console.error('Failed to load students:', err)
        setApiError(
          err?.message
            ? `Could not load students: ${err.message}`
            : 'Could not load students (running in mock mode)'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    admissionNo: '',
    name: '',
    class: '',
    section: '',
    fatherName: '',
    mobile: '',
    address: '',
    session: '2025-26',
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.includes(searchTerm) ||
      student.fatherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setIsEditMode(false);
    setFormData({
      admissionNo: '',
      name: '',
      class: '',
      section: '',
      fatherName: '',
      mobile: '',
      address: '',
      session: '2025-26',
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setIsEditMode(true);
    setSelectedStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (student) => {
    try {
      await deleteStudent(student.id)
      setStudents((prev) => prev.filter((s) => s.id !== student.id))
      setSuccessMessage('Student deleted successfully')
    } catch (err) {
      // Fallback to local state in case API isn't available
      setStudents((prev) => prev.filter((s) => s.id !== student.id))
      setSuccessMessage('Student deleted locally (mock mode)')
    }
  };

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.admissionNo || !formData.name || !formData.class) {
      alert('Please fill in all required fields');
      return;
    }

    if (isEditMode) {
      try {
        const updated = await updateStudent(selectedStudent.id, formData)
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? updated : s))
        )
        setSuccessMessage('Student updated successfully')
      } catch (err) {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === selectedStudent.id ? { ...s, ...formData } : s
          )
        )
        setSuccessMessage('Student updated locally (mock mode)')
      }
    } else {
      const newStudent = {
        id: Date.now().toString(),
        ...formData,
        totalFees: 1100,
        paidFees: 0,
        dueFees: 1100,
      };

      try {
        const created = await createStudent(newStudent)
        setStudents((prev) => [...prev, created])
        setSuccessMessage('Student added successfully')
      } catch (err) {
        setStudents((prev) => [...prev, newStudent])
        setSuccessMessage('Student added locally (mock mode)')
      }
    }

    setIsModalOpen(false);
  };

  const columns = [
    { key: 'admissionNo', label: 'Admission No' },
    { key: 'name', label: 'Name' },
    { key: 'class', label: 'Class' },
    { key: 'section', label: 'Section' },
    { key: 'fatherName', label: 'Father Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'session', label: 'Session' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>Students Management</h1>
        <button className="btn btn-primary" onClick={handleAddClick}>
          ➕ Add Student
        </button>
      </div>

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {apiError && (
        <Alert
          type="warning"
          message={apiError}
          onClose={() => setApiError('')}
        />
      )}

      {isLoading && <p>Loading students...</p>}

      <Card>
        <div className="search-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name, admission no, or father name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredStudents}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={isEditMode ? 'Edit Student' : 'Add New Student'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        submitText={isEditMode ? 'Update' : 'Add Student'}
      >
        <form>
          <div className="form-row">
            <FormField
              label="Admission Number"
              name="admissionNo"
              value={formData.admissionNo}
              onChange={handleFormChange}
              required
            />
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-row">
            <FormField
              label="Class"
              name="class"
              type="select"
              value={formData.class}
              onChange={handleFormChange}
              options={classOptions.map((c) => ({ value: c, label: c }))}
              required
            />
            <FormField
              label="Section"
              name="section"
              type="select"
              value={formData.section}
              onChange={handleFormChange}
              options={sectionOptions.map((s) => ({ value: s, label: s }))}
            />
          </div>

          <FormField
            label="Father Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleFormChange}
          />

          <FormField
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleFormChange}
          />

          <FormField
            label="Address"
            name="address"
            type="textarea"
            value={formData.address}
            onChange={handleFormChange}
            rows={3}
          />
        </form>
      </Modal>
    </div>
  );
};

export default StudentsPage;
