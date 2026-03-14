import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Alert from '../components/Alert';
import { mockStudents, classOptions } from '../utils/mockData';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const classOrder = [...classOptions, 'Passed'];

const getNextClass = (current) => {
  const idx = classOrder.indexOf(current);
  if (idx === -1 || idx === classOrder.length - 1) return 'Passed';
  return classOrder[idx + 1];
};

const PromotionsPage = () => {
  const [students, setStudents] = useLocalStorageState(
    'promotionsData',
    mockStudents
  );
  const [selectedClass, setSelectedClass] = useState(classOptions[0]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [message, setMessage] = useState('');

  const studentsInClass = useMemo(
    () => students.filter((s) => s.class === selectedClass),
    [students, selectedClass]
  );

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const promoteSelected = () => {
    if (selectedIds.length === 0) {
      setMessage('Select students to promote');
      return;
    }

    setStudents((prev) =>
      prev.map((student) => {
        if (!selectedIds.includes(student.id)) return student;
        return {
          ...student,
          class: getNextClass(student.class),
        };
      })
    );

    setMessage(`${selectedIds.length} student(s) promoted successfully`);
    setSelectedIds([]);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Student Promotions</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      <Card>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <label>
            Select Class:
            <select
              className="form-control"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </label>
          <button className="btn btn-primary" onClick={promoteSelected}>
            Promote Selected
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <DataTable
            columns={[
              { key: 'admissionNo', label: 'Admission No' },
              { key: 'name', label: 'Name' },
              { key: 'fatherName', label: 'Father Name' },
              { key: 'class', label: 'Class' },
              {
                key: 'dueFees',
                label: 'Due',
                render: (value) => `₹${value}`,
              },
            ]}
            data={studentsInClass}
            actions={false}
            onView={(row) => handleToggle(row.id)}
          />
          <p style={{ marginTop: '0.5rem', color: '#64748b' }}>
            Tip: Click any row to select/deselect for promotion.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PromotionsPage;
