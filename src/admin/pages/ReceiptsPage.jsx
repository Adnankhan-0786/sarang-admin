import React, { useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { mockTransactions } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const ReceiptsPage = () => {
  const [receipts, setReceipts] = useLocalStorageState('receiptsData', mockTransactions);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = receipts.filter((r) =>
    r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: 'receiptNo', label: 'Receipt #' },
    { key: 'studentName', label: 'Student' },
    { key: 'admissionNo', label: 'Admission #' },
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
    { key: 'status', label: 'Status' },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Receipt Management</h1>

      <Card>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by receipt or student"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <DataTable
            columns={columns}
            data={filtered}
            onView={setSelectedReceipt}
            actions={true}
          />
        </div>
      </Card>

      <Modal
        isOpen={!!selectedReceipt}
        title={`Receipt Details - ${selectedReceipt?.receiptNo}`}
        onClose={() => setSelectedReceipt(null)}
        onSubmit={() => window.print()}
        submitText="Print"
      >
        {selectedReceipt ? (
          <div>
            <p>
              <strong>Date:</strong> {formatDate(selectedReceipt.date)}
            </p>
            <p>
              <strong>Student:</strong> {selectedReceipt.studentName}
            </p>
            <p>
              <strong>Admission No:</strong> {selectedReceipt.admissionNo}
            </p>
            <p>
              <strong>Amount:</strong> {formatCurrency(selectedReceipt.amount)}
            </p>
            <p>
              <strong>Payment Mode:</strong> {selectedReceipt.paymentMode || 'Cash'}
            </p>
            <p>
              <strong>Status:</strong> {selectedReceipt.status}
            </p>
          </div>
        ) : (
          <p>No receipt selected.</p>
        )}
      </Modal>
    </div>
  );
};

export default ReceiptsPage;
