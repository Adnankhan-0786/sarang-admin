import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import {
  mockStudents,
  mockFeeHeads,
  feeRules,
  mockTransactions,
} from '../utils/mockData';
import {
  formatCurrency,
  formatDate,
  generateReceiptNo,
  calculateTotalFee,
} from '../utils/helpers';

const FeesPage = () => {
  const [students, setStudents] = useState(mockStudents);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeHeads, setFeeHeads] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [feeDate, setFeeDate] = useState(new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState('');
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState(null);

  const handleSearch = () => {
    const found = students.find(
      (s) =>
        s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!found) {
      setMessage('No student found. Try a different admission number or name.');
      setSelectedStudent(null);
      return;
    }

    setMessage('');
    setSelectedStudent(found);
    const tuitionFee = feeRules[found.class] || 0;
    setFeeHeads(
      mockFeeHeads.map((head) => ({
        ...head,
        amount: head.id === 'TUITION' ? tuitionFee : 0,
      }))
    );
  };

  const totalPayable = useMemo(() => calculateTotalFee(feeHeads), [feeHeads]);
  const dueAmount = selectedStudent ? selectedStudent.dueFees : 0;
  const balanceAfterPayment = selectedStudent
    ? Math.max(0, dueAmount - Number(paymentAmount || 0))
    : 0;

  const handleHeadChange = (id, value) => {
    setFeeHeads((prev) =>
      prev.map((head) =>
        head.id === id ? { ...head, amount: Number(value) || 0 } : head
      )
    );
  };

  const handleGenerateReceipt = () => {
    if (!selectedStudent) {
      setMessage('Select a student first');
      return;
    }

    const amountPaid = Number(paymentAmount || 0);
    if (!amountPaid) {
      setMessage('Enter payment amount');
      return;
    }

    const receipt = {
      id: `${Date.now()}`,
      receiptNo: generateReceiptNo(),
      studentName: selectedStudent.name,
      admissionNo: selectedStudent.admissionNo,
      class: selectedStudent.class,
      amount: amountPaid,
      date: feeDate,
      status: 'Completed',
      paymentMode,
      feeDetails: feeHeads,
    };

    setTransactions((prev) => [receipt, ...prev]);

    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              paidFees: s.paidFees + amountPaid,
              dueFees: Math.max(0, s.dueFees - amountPaid),
            }
          : s
      )
    );

    setLatestReceipt(receipt);
    setReceiptModalOpen(true);
    setMessage('Receipt generated successfully');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Fees Collection</h1>

      {message && (
        <Alert type="success" message={message} onClose={() => setMessage('')} />
      )}

      <Card>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FormField
            label="Search Student"
            name="search"
            value={searchTerm}
            onChange={(name, value) => setSearchTerm(value)}
            placeholder="Admission No or Name"
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {selectedStudent && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Card>
                <h3>Student Details</h3>
                <p>
                  <strong>Name:</strong> {selectedStudent.name}
                </p>
                <p>
                  <strong>Admission No:</strong> {selectedStudent.admissionNo}
                </p>
                <p>
                  <strong>Class:</strong> {selectedStudent.class}
                </p>
                <p>
                  <strong>Father:</strong> {selectedStudent.fatherName}
                </p>
                <p>
                  <strong>Due Amount:</strong> {formatCurrency(selectedStudent.dueFees)}
                </p>
              </Card>

              <Card>
                <h3>Fee Breakdown</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {feeHeads.map((head) => (
                    <FormField
                      key={head.id}
                      label={head.name}
                      name={head.id}
                      type="number"
                      value={head.amount}
                      onChange={(name, value) => handleHeadChange(head.id, value)}
                      placeholder="0"
                    />
                  ))}
                  <FormField
                    label="Payment Date"
                    name="feeDate"
                    type="date"
                    value={feeDate}
                    onChange={(name, value) => setFeeDate(value)}
                  />
                  <FormField
                    label="Payment Mode"
                    name="paymentMode"
                    type="select"
                    value={paymentMode}
                    onChange={(name, value) => setPaymentMode(value)}
                    options={[
                      { value: 'Cash', label: 'Cash' },
                      { value: 'Cheque', label: 'Cheque' },
                      { value: 'Online', label: 'Online' },
                    ]}
                  />
                  <FormField
                    label="Amount Paid"
                    name="paymentAmount"
                    type="number"
                    value={paymentAmount}
                    onChange={(name, value) => setPaymentAmount(value)}
                    placeholder="0"
                  />
                  <div style={{ marginTop: '1rem' }}>
                    <p>
                      <strong>Total Payable:</strong> {formatCurrency(totalPayable)}
                    </p>
                    <p>
                      <strong>Remaining Due:</strong> {formatCurrency(balanceAfterPayment)}
                    </p>
                  </div>
                  <button className="btn btn-primary" onClick={handleGenerateReceipt}>
                    Generate Receipt
                  </button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Card>

      <Modal
        isOpen={receiptModalOpen}
        title="Receipt Generated"
        onClose={() => setReceiptModalOpen(false)}
        onSubmit={() => {
          window.print();
        }}
        submitText="Print"
      >
        {latestReceipt ? (
          <div>
            <h3>Receipt #{latestReceipt.receiptNo}</h3>
            <p>
              <strong>Date:</strong> {formatDate(latestReceipt.date)}
            </p>
            <p>
              <strong>Student:</strong> {latestReceipt.studentName} ({latestReceipt.admissionNo})
            </p>
            <p>
              <strong>Class:</strong> {latestReceipt.class}
            </p>
            <p>
              <strong>Payment Mode:</strong> {latestReceipt.paymentMode}
            </p>
            <div style={{ marginTop: '1rem' }}>
              <h4>Fee Details</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Fee Type</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {latestReceipt.feeDetails.map((head) => (
                    <tr key={head.id}>
                      <td style={{ padding: '0.5rem' }}>{head.name}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                        {formatCurrency(head.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                <strong>{formatCurrency(latestReceipt.amount)}</strong>
              </div>
            </div>
          </div>
        ) : (
          <p>No receipt to show</p>
        )}
      </Modal>
    </div>
  );
};

export default FeesPage;
