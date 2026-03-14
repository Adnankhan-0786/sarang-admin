# School Admin Panel - Complete Documentation

## 📚 Overview

A comprehensive admin panel for school management system built with modern React best practices. The admin panel runs under the `/admin` route and includes role-based access control for two user types: **SUPER_ADMIN** and **ADMIN**.

## 🚀 Quick Start

### Access the Admin Panel
- Navigate to: `http://localhost:5173/admin/login`
- Or directly: `http://localhost:5173/admin/dashboard`

### Demo Credentials
- **Email:** admin@school.com
- **Password:** demo123
- **Login As:** 
  - Super Admin (Full Access to all modules)
  - Admin (Content Management Only)

## 📁 Folder Structure

```
src/
└── admin/
    ├── components/          # Reusable UI components
    │   ├── DataTable.jsx
    │   ├── StatCard.jsx
    │   ├── FormField.jsx
    │   ├── Modal.jsx
    │   ├── Alert.jsx
    │   ├── Card.jsx
    │   ├── Badge.jsx
    │   └── ProtectedRoute.jsx
    ├── context/            # Context API for state management
    │   └── AuthContext.jsx
    ├── hooks/              # Custom React hooks
    │   └── useAuth.js
    ├── layout/             # Layout components
    │   ├── AdminLayout.jsx
    │   ├── AdminSidebar.jsx
    │   └── AdminTopbar.jsx
    ├── pages/              # Page components
    │   ├── AdminLoginPage.jsx
    │   ├── DashboardPage.jsx
    │   ├── StudentsPage.jsx
    │   ├── FeesPage.jsx
    │   ├── ReceiptsPage.jsx
    │   ├── DefaultersPage.jsx
    │   ├── ReportsPage.jsx
    │   ├── SessionsPage.jsx
    │   ├── PromotionsPage.jsx
    │   ├── NoticesPage.jsx
    │   ├── GalleryPage.jsx
    │   ├── SettingsPage.jsx
    │   └── AdmissionsPage.jsx
    ├── services/           # API services (placeholder)
    ├── styles/             # Stylesheets
    │   └── admin.css
    ├── utils/              # Utility functions
    │   ├── helpers.js
    │   └── mockData.js
    ├── AdminRouter.jsx     # Routing configuration
    └── index.js            # Barrel export
```

## 🔐 Role-Based Access Control

### SUPER_ADMIN Permissions
Full access to all modules:
- Students Management
- Admissions
- Promotions
- Fees Collection
- Receipts
- Defaulters
- Reports
- Sessions
- Notices & Gallery Management
- Settings

### ADMIN Permissions
Limited access to content management:
- Dashboard (read-only stats)
- Notices Management
- Gallery Management
- Settings

## 📌 Routing Structure

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/admin/login` | AdminLoginPage | Public | Login page |
| `/admin/dashboard` | DashboardPage | Both | Overview & stats |
| `/admin/students` | StudentsPage | SUPER_ADMIN | Student management |
| `/admin/admissions` | AdmissionsPage | SUPER_ADMIN | New admissions |
| `/admin/fees` | FeesPage | SUPER_ADMIN | Fee collection |
| `/admin/receipts` | ReceiptsPage | SUPER_ADMIN | Receipt management |
| `/admin/defaulters` | DefaultersPage | SUPER_ADMIN | Defaulter list |
| `/admin/promotions` | PromotionsPage | SUPER_ADMIN | Student promotions |
| `/admin/reports` | ReportsPage | SUPER_ADMIN | Reports & exports |
| `/admin/sessions` | SessionsPage | SUPER_ADMIN | Session management |
| `/admin/notices` | NoticesPage | Both | Notice management |
| `/admin/gallery` | GalleryPage | Both | Gallery management |
| `/admin/settings` | SettingsPage | Both | System settings |

## 🎯 Core Features

### 1. Dashboard
- **Stat Cards:** Total Students, Fees Collected Today, Pending Fees, Total Classes
- **Recent Transactions:** Table of latest fee payments
- **Quick Links:** Role-based access shortcuts

### 2. Students Management
- **View Students:** Complete list with search
- **Add/Edit/Delete:** Full CRUD operations
- **Excel Import:** Bulk student upload
- **Columns:** Admission No, Name, Class, Section, Father Name, Mobile, Session

### 3. Fees Collection
- **Student Search:** Find by admission number
- **Fee Breakdown:** Tuition, Transport, Exam, Sports, I Card, Annual Function, Additional, Fine, Concession
- **Auto-Calculations:** 
  - Based on class (Nursery-Class 2: ₹900, Class 3-8: ₹1100)
  - Total Payable, Paid Amount, Due Amount
- **Receipt Generation:** Automatic receipt number generation

### 4. Receipt Management
- **View Receipts:** Complete transaction history
- **Receipt Details:** Student info, fee breakdown, amounts
- **Print Receipt:** Direct print functionality using window.print()
- **Receipt Format:** Professional layout with school details

### 5. Defaulters Module
- **Pending Fees List:** Students with unpaid fees
- **Due Amount:** Owed for each student
- **Quick Statistics:** Total defaulters and total due amount

### 6. Reports Module
Four customizable report types:
- **Daily Collection Report:** Daily fee collections
- **Class Wise Defaulter Report:** Defaulters by class
- **Category Wise Fee Collection:** Fee heads collection status
- **Student Fee Ledger:** Individual student statements

**Export Options:**
- Export to CSV
- Export to PDF (using window.print())

### 7. Session Management
- **Create Sessions:** Start and end dates
- **Activate Session:** Only one active session at a time
- **Session List:** Grid and table views
- **Visual Indicator:** Current active session highlighted

### 8. Student Promotions
- **Select Class:** Choose class to promote
- **Bulk Promotion:** Select multiple students
- **Auto-Mapping:** Class 8 → Passed status
- **Confirmation:** Review before execution

### 9. Admissions Module
- **Application Form:** Student and parent information
- **Status Tracking:** Application stats (Total, Under Review, Approved, Rejected)
- **Email Confirmation:** Send reference number to parent

### 10. Notices Module
- **Add/Edit/Delete:** Full CRUD for notices
- **Publish Notices:** Display on website
- **Archive:** View notice history

### 11. Gallery Module
- **Upload Images:** With metadata
- **Homepage Banners:** Set featured images
- **Gallery Grid:** Visual preview
- **Delete Images:** Remove from gallery

### 12. Settings
- **School Information:** Name, email, phone, address, logo
- **System Preferences:** Email/SMS alerts, audit logging
- **Administrator Accounts:** Manage admin users
- **Backup & Maintenance:** System backups

## 🛠️ Form Handling

### Form Field Component
```jsx
<FormField
  label="Student Name"
  name="name"
  type="text"
  value={formData.name}
  onChange={handleChange}
  placeholder="Enter name"
  required={true}
  error={errors.name}
/>
```

**Supported Types:**
- text, email, password, tel, date, file
- select (dropdown)
- textarea (multi-line)

## 📊 Data Tables

### DataTable Component Features
- Sortable columns
- Action buttons (View, Edit, Delete)
- Custom column rendering
- Empty state handling
- Loading state
- Flexible columns configuration

```jsx
const columns = [
  { key: 'name', label: 'Name' },
  { 
    key: 'amount', 
    label: 'Amount',
    render: (value) => formatCurrency(value)
  }
]

<DataTable 
  columns={columns}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## 🎨 Styling System

### CSS Variables (admin.css)
```css
--primary-color: #2563eb
--secondary-color: #1e40af
--success-color: #16a34a
--warning-color: #ea580c
--danger-color: #dc2626
--light-bg: #f8fafc
```

### Component Classes
- `.card` - Card container
- `.btn`, `.btn-primary`, `.btn-danger` - Buttons
- `.alert`, `.alert-success` - Alerts
- `.badge`, `.badge-success` - Badges
- `.stat-card` - Statistics cards
- `.modal-overlay`, `.modal` - Modal dialogs

## 🔧 Utilities & Helpers

### Format Functions
```javascript
formatDate(date)              // Format date to DD MMM YYYY
formatCurrency(amount)        // Format to currency (INR)
generateReceiptNo()           // Generate unique receipt number
generateAdmissionNo()         // Generate unique admission number
calculateTotalFee(feeHeads)   // Sum all fees
```

### Validation Functions
```javascript
validateEmail(email)          // Email validation
validatePhone(phone)          // Phone validation (10 digits)
```

### Export Functions
```javascript
exportToCSV(data, filename)   // Export data to CSV
exportToPDF(content, filename) // Trigger print dialog
```

## 🔐 Authentication Flow

### Login Process
1. User enters email, password, and role
2. AuthContext validates credentials (currently mocked)
3. User data stored in localStorage
4. Redirect to dashboard

### Protected Routes
- Routes check authentication status
- Redirect unauthenticated users to login
- Verify user role for role-based routes
- SUPER_ADMIN can access all SUPER_ADMIN routes

### Logout
- Clear user data from state and localStorage
- Redirect to login page

## 🧪 Testing the Admin Panel

### Test Scenarios

**1. Login as SUPER_ADMIN**
- Access all modules
- Perform CRUD operations on students
- Collect fees and generate receipts
- Promote students between classes
- View all reports

**2. Login as ADMIN**
- Access only Notices and Gallery
- Cannot access Students, Fees, or Reports
- See "Access Denied" on restricted routes

**3. Student Management**
- Add new student and verify in list
- Edit student details
- Delete student
- Search students by name or admission number
- Import students from Excel (placeholder)

**4. Fee Collection**
- Search student by admission number
- View student information card
- Enter fees by category
- Auto-calculate totals
- Generate receipt with unique number

**5. Reports**
- Generate daily collection report
- Export class-wise defaulter report to CSV
- Download fee ledger as PDF

## 📦 Future Enhancements

### Recommended Additions
1. **API Integration:** Replace mock data with real backend
2. **Excel Import:** Use `xlsx` library for student import
3. **PDF Export:** Integrate `jsPDF` or `html2pdf`
4. **Email Notifications:** Send receipts and notices via email
5. **SMS Integration:** Send fee reminders via SMS
6. **Student Portal:** Allow students to view fees and results
7. **Parent Portal:** View child's attendance, marks, fees
8. **Analytics:** Advanced charts and insights
9. **Audit Logging:** Track all admin actions
10. **Database:** Use MongoDB/PostgreSQL instead of mock data

## ⚙️ Configuration

### Mock Data Location
File: `src/admin/utils/mockData.js`

**Mock Data Includes:**
- Student records
- Fee transactions
- Notices
- Gallery images
- Sessions
- Default fees by class

### Customize Mock Data
Edit the exported objects in mockData.js to change:
- Student names and details
- Fee structures
- Available classes and sections
- Initial notices and gallery

## 🐛 Common Issues

### "Access Denied" Error
- **Cause:** User role doesn't have permission
- **Solution:** Login as SUPER_ADMIN or appropriate role

### Styles Not Loading
- **Cause:** admin.css not linked
- **Solution:** Ensure `import './admin/styles/admin.css'` in App.jsx

### Modal Not Closing
- **Cause:** Missing onClose handler
- **Solution:** Pass `onClose={() => setIsModalOpen(false)}` to Modal

### Data Not Persisting
- **Cause:** Using mock data (cleared on refresh)
- **Solution:** Connect to backend database

## 📚 Best Practices

### Code Organization
- Keep components small and focused
- Use custom hooks for logic
- Separate business logic from UI
- Use context for global state

### Performance
- Use React.memo for expensive components
- Implement lazy loading for large tables
- Avoid inline functions in render
- Use useCallback for event handlers

### Security
- Validate all inputs server-side
- Never store sensitive data in localStorage
- Use HTTPS in production
- Implement CSRF protection

### UX
- Provide loading states
- Show success/error messages
- Confirm destructive actions
- Responsive design for mobile

## 🤝 Contributing

To add new features:
1. Create new page component in `/pages`
2. Add route in `AdminRouter.jsx`
3. Add menu item in `AdminSidebar.jsx`
4. Follow existing code patterns
5. Test access control

## 📞 Support

For issues or questions:
1. Check existing components for examples
2. Review mock data structure
3. Verify role-based access permissions
4. Check browser console for errors

## 📄 License

This admin panel is part of the Sarang School project.

---

**Last Updated:** March 7, 2025
**Version:** 1.0.0
