import React, { useMemo } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import { mockStudents } from '../utils/mockData';
import { formatCurrency } from '../utils/helpers';

const DefaultersPage = () => {
  const defaulters = useMemo(
    () => mockStudents.filter((s) => s.dueFees > 0),
    []
  );

  const totalDue = useMemo(
    () => defaulters.reduce((sum, s) => sum + s.dueFees, 0),
    [defaulters]
  );

  const columns = [
    { key: 'name', label: 'Student' },
    { key: 'class', label: 'Class' },
    { key: 'admissionNo', label: 'Admission No' },
    {
      key: 'dueFees',
      label: 'Due Amount',
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Defaulters</h1>

      <div className="dashboard-grid" style={{ marginBottom: '1.5rem' }}>
        <Card>
          <h3>Total Defaulters</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>
            {defaulters.length}
          </p>
        </Card>
        <Card>
          <h3>Total Due</h3>
          <p style={{ fontSize: '2rem', fontWeight: '700' }}>
            {formatCurrency(totalDue)}
          </p>
        </Card>
      </div>

      <Card>
        <DataTable columns={columns} data={defaulters} actions={false} />
      </Card>
    </div>
  );
};

export default DefaultersPage;
