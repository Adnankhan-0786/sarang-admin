import React, { useMemo, useState } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FormField from '../components/FormField';
import { mockTransactions, mockStudents } from '../utils/mockData';
import { formatCurrency, formatDate, exportToCSV, exportToPDF } from '../utils/helpers';

const REPORTS = {
  DAILY_COLLECTION: 'Daily Collection',
  DEFAULTER: 'Class Wise Defaulter',
  FEE_LEDGER: 'Student Fee Ledger',
};

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState(REPORTS.DAILY_COLLECTION);
  const [dateFilter, setDateFilter] = useState({
    from: new Date().toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredTransactions = useMemo(() => {
    const from = new Date(dateFilter.from).getTime();
    const to = new Date(dateFilter.to).getTime();
    return mockTransactions.filter((tx) => {
      const txDate = new Date(tx.date).getTime();
      return txDate >= from && txDate <= to;
    });
  }, [dateFilter]);

  const defaulterData = useMemo(() => {
    const byClass = {};
    mockStudents.forEach((s) => {
      if (s.dueFees > 0) {
        byClass[s.class] = byClass[s.class] || { count: 0, due: 0 };
        byClass[s.class].count += 1;
        byClass[s.class].due += s.dueFees;
      }
    });
    return Object.entries(byClass).map(([cls, data]) => ({
      class: cls,
      defaulters: data.count,
      totalDue: data.due,
    }));
  }, []);

  const ledgerItems = useMemo(() => {
    if (!selectedStudent) return [];
    return mockTransactions.filter(
      (tx) => tx.admissionNo === selectedStudent.admissionNo
    );
  }, [selectedStudent]);

  const exportCurrent = () => {
    if (activeReport === REPORTS.DAILY_COLLECTION) {
      exportToCSV(filteredTransactions, 'daily-collection.csv');
    } else if (activeReport === REPORTS.DEFAULTER) {
      exportToCSV(defaulterData, 'defaulters.csv');
    } else if (activeReport === REPORTS.FEE_LEDGER) {
      exportToCSV(ledgerItems, 'fee-ledger.csv');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Reports</h1>

      <Card>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {Object.values(REPORTS).map((report) => (
            <button
              key={report}
              className={`btn ${activeReport === report ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveReport(report)}
            >
              {report}
            </button>
          ))}
          <button className="btn btn-success" onClick={exportCurrent}>
            Export
          </button>
          <button className="btn btn-warning" onClick={() => exportToPDF()}>
            Print
          </button>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {activeReport === REPORTS.DAILY_COLLECTION && (
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <FormField
                  label="From"
                  name="from"
                  type="date"
                  value={dateFilter.from}
                  onChange={(name, value) =>
                    setDateFilter((prev) => ({ ...prev, from: value }))
                  }
                />
                <FormField
                  label="To"
                  name="to"
                  type="date"
                  value={dateFilter.to}
                  onChange={(name, value) =>
                    setDateFilter((prev) => ({ ...prev, to: value }))
                  }
                />
              </div>
              <DataTable
                columns={[
                  { key: 'receiptNo', label: 'Receipt #' },
                  { key: 'studentName', label: 'Student' },
                  { key: 'admissionNo', label: 'Admission #' },
                  {
                    key: 'amount',
                    label: 'Amount',
                    render: (val) => formatCurrency(val),
                  },
                  {
                    key: 'date',
                    label: 'Date',
                    render: (val) => formatDate(val),
                  },
                ]}
                data={filteredTransactions}
                actions={false}
              />
            </div>
          )}

          {activeReport === REPORTS.DEFAULTER && (
            <div>
              <DataTable
                columns={[
                  { key: 'class', label: 'Class' },
                  { key: 'defaulters', label: 'Defaulters' },
                  {
                    key: 'totalDue',
                    label: 'Total Due',
                    render: (val) => formatCurrency(val),
                  },
                ]}
                data={defaulterData}
                actions={false}
              />
            </div>
          )}

          {activeReport === REPORTS.FEE_LEDGER && (
            <div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <select
                  className="form-control"
                  value={selectedStudent?.admissionNo || ''}
                  onChange={(e) => {
                    const admissionNo = e.target.value;
                    const student = mockStudents.find((s) => s.admissionNo === admissionNo);
                    setSelectedStudent(student || null);
                  }}
                >
                  <option value="">Select student</option>
                  {mockStudents.map((s) => (
                    <option key={s.id} value={s.admissionNo}>
                      {s.name} ({s.admissionNo})
                    </option>
                  ))}
                </select>
              </div>
              {selectedStudent ? (
                <div>
                  <h3>
                    Ledger for {selectedStudent.name} ({selectedStudent.admissionNo})
                  </h3>
                  <DataTable
                    columns={[
                      { key: 'receiptNo', label: 'Receipt #' },
                      { key: 'date', label: 'Date', render: (val) => formatDate(val) },
                      { key: 'amount', label: 'Amount', render: (val) => formatCurrency(val) },
                      { key: 'status', label: 'Status' },
                    ]}
                    data={ledgerItems}
                    actions={false}
                  />
                </div>
              ) : (
                <p>Select a student to view fee ledger.</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;
