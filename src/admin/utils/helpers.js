// Helper Functions

export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const generateReceiptNo = () => {
  return `RCP${Date.now().toString().slice(-6)}`;
};

export const generateAdmissionNo = () => {
  return `ADM${Math.floor(Math.random() * 99999) + 1}`;
};

export const calculateTotalFee = (feeHeads) => {
  return feeHeads.reduce((total, head) => total + (head.amount || 0), 0);
};

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const exportToPDF = (content, filename = 'export.pdf') => {
  window.print();
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
};

export const formatStudentData = (student) => {
  return {
    ...student,
    totalFees: formatCurrency(student.totalFees),
    paidFees: formatCurrency(student.paidFees),
    dueFees: formatCurrency(student.dueFees),
  };
};
