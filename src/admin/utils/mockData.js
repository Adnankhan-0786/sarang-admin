// Mock Data for Admin Panel

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
};

export const mockStudents = [
  {
    id: '1',
    admissionNo: 'ADM001',
    name: 'Rahul Kumar',
    class: 'Class 5',
    section: 'A',
    fatherName: 'Rajesh Kumar',
    mobile: '9876543210',
    address: '123 Main St, City',
    session: '2025-26',
    totalFees: 1100,
    paidFees: 500,
    dueFees: 600,
  },
  {
    id: '2',
    admissionNo: 'ADM002',
    name: 'Priya Singh',
    class: 'Class 6',
    section: 'B',
    fatherName: 'Arun Singh',
    mobile: '9876543211',
    address: '456 Oak Ave, City',
    session: '2025-26',
    totalFees: 1100,
    paidFees: 1100,
    dueFees: 0,
  },
  {
    id: '3',
    admissionNo: 'ADM003',
    name: 'Arjun Patel',
    class: 'Class 4',
    section: 'A',
    fatherName: 'Vikram Patel',
    mobile: '9876543212',
    address: '789 Pine Rd, City',
    session: '2025-26',
    totalFees: 900,
    paidFees: 0,
    dueFees: 900,
  },
  {
    id: '4',
    admissionNo: 'ADM004',
    name: 'Divya Sharma',
    class: 'Class 7',
    section: 'C',
    fatherName: 'Rohit Sharma',
    mobile: '9876543213',
    address: '321 Elm St, City',
    session: '2025-26',
    totalFees: 1100,
    paidFees: 700,
    dueFees: 400,
  },
];

export const mockFeeHeads = [
  { id: 'TUITION', name: 'Tuition Fee', amount: 0 },
  { id: 'TRANSPORT', name: 'Transport Fee', amount: 0 },
  { id: 'EXAM', name: 'Exam Fee', amount: 0 },
  { id: 'SPORTS', name: 'Sports Fee', amount: 0 },
  { id: 'ICARD', name: 'I Card Fee', amount: 0 },
  { id: 'FUNCTION', name: 'Annual Function Fee', amount: 0 },
  { id: 'ADDITIONAL', name: 'Additional Charge', amount: 0 },
  { id: 'FINE', name: 'Fine', amount: 0 },
  { id: 'CONCESSION', name: 'Concession', amount: 0 },
];

export const mockTransactions = [
  {
    id: 'TXN001',
    receiptNo: 'RCP001',
    studentName: 'Rahul Kumar',
    admissionNo: 'ADM001',
    amount: 500,
    date: '2025-03-05',
    status: 'Completed',
  },
  {
    id: 'TXN002',
    receiptNo: 'RCP002',
    studentName: 'Priya Singh',
    admissionNo: 'ADM002',
    amount: 1100,
    date: '2025-03-04',
    status: 'Completed',
  },
  {
    id: 'TXN003',
    receiptNo: 'RCP003',
    studentName: 'Divya Sharma',
    admissionNo: 'ADM004',
    amount: 700,
    date: '2025-03-03',
    status: 'Completed',
  },
];

export const mockNotices = [
  {
    id: '1',
    title: 'Annual Examination Dates Announced',
    content: 'Annual examinations will be held from March 25 to April 10, 2025.',
    date: '2025-03-01',
    createdBy: 'Admin User',
  },
  {
    id: '2',
    title: 'Summer Vacation',
    content: 'Summer vacation will be from May 15 to July 15, 2025.',
    date: '2025-02-28',
    createdBy: 'Admin User',
  },
];

export const mockSessions = [
  {
    id: '1',
    name: '2024-25',
    isActive: false,
    startDate: '2024-04-01',
    endDate: '2025-03-31',
  },
  {
    id: '2',
    name: '2025-26',
    isActive: true,
    startDate: '2025-04-01',
    endDate: '2026-03-31',
  },
];

export const mockGallery = [
  {
    id: '1',
    name: 'Sports Day 2025',
    url: 'https://via.placeholder.com/300',
    uploadDate: '2025-02-15',
    isHomepageBanner: true,
  },
  {
    id: '2',
    name: 'Annual Function 2024',
    url: 'https://via.placeholder.com/300',
    uploadDate: '2025-01-20',
    isHomepageBanner: false,
  },
];

export const mockDefaulters = [
  {
    id: '1',
    studentName: 'Arjun Patel',
    class: 'Class 4',
    month: 'February 2025',
    dueAmount: 900,
  },
  {
    id: '2',
    studentName: 'Divya Sharma',
    class: 'Class 7',
    month: 'February 2025',
    dueAmount: 400,
  },
];

export const feeRules = {
  'Class 1': 900,
  'Class 2': 900,
  'Class 3': 1100,
  'Class 4': 1100,
  'Class 5': 1100,
  'Class 6': 1100,
  'Class 7': 1100,
  'Class 8': 1100,
};

export const classOptions = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4',
  'Class 5', 'Class 6', 'Class 7', 'Class 8',
];

export const sectionOptions = ['A', 'B', 'C', 'D'];
