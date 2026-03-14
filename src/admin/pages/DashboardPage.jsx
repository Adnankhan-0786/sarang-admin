import React from 'react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { mockTransactions, mockStudents } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const [viewTransaction, setViewTransaction] = React.useState(null);

  const totalStudents = mockStudents.length;
  const feesCollectedToday = mockTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const totalPendingFees = mockStudents.reduce(
    (sum, s) => sum + s.dueFees,
    0
  );
  const totalClasses = 8;

  const columns = [
    { key: 'receiptNo', label: 'Receipt No' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'admissionNo', label: 'Admission No' },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => formatCurrency(value),
    },
    {
      key: 'date',
      label: 'Date',
      render: (value) => formatDate(value),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <span className="badge badge-success">{value}</span>,
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

      <div className="dashboard-grid">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon="👨‍🎓"
          color="primary"
        />
        <StatCard
          title="Fees Collected Today"
          value={formatCurrency(feesCollectedToday)}
          icon="💰"
          color="success"
        />
        <StatCard
          title="Pending Fees"
          value={formatCurrency(totalPendingFees)}
          icon="⏳"
          color="warning"
        />
        <StatCard
          title="Total Classes"
          value={totalClasses}
          icon="🏫"
          color="primary"
        />
      </div>

      {user?.role === 'SUPER_ADMIN' && (
        <Card title="Recent Fee Transactions">
          <DataTable
            columns={columns}
            data={mockTransactions}
            onView={setViewTransaction}
            actions={false}
          />
        </Card>
      )}

      {user?.role === 'ADMIN' && (
        <Card title="Quick Links">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            <a href="/admin/notices" className="btn btn-primary btn-lg">
              📢 Manage Notices
            </a>
            <a href="/admin/gallery" className="btn btn-primary btn-lg">
              🖼️ Manage Gallery
            </a>
            <a href="/admin/settings" className="btn btn-secondary btn-lg">
              ⚙️ Settings
            </a>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
