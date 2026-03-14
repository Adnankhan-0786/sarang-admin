import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import {
  mockStudents,
  mockTransactions,
  mockNotices,
  mockGallery,
  mockSessions,
  mockDefaulters,
  mockFeeHeads,
  ROLES,
} from '../src/admin/utils/mockData.js'
import Student from './models/Student.js'
import Notice from './models/Notice.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sarang_school'

let useDB = false

async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Seed initial data if collections are empty
    const studentCount = await Student.countDocuments()
    if (studentCount === 0) {
      await Student.insertMany(mockStudents.map((s) => ({ ...s })))
    }

    const noticeCount = await Notice.countDocuments()
    if (noticeCount === 0) {
      await Notice.insertMany(mockNotices.map((n) => ({ ...n })))
    }

    useDB = true
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Could not connect to MongoDB, falling back to in-memory data.', err.message)
    useDB = false
  }
}

await connectDb()

// Simple in-memory "database" (starts from mock data)
let students = [...mockStudents]
let transactions = [...mockTransactions]
let notices = [...mockNotices]
let gallery = [...mockGallery]
let sessions = [...mockSessions]
let defaulters = [...mockDefaulters]
let feeHeads = [...mockFeeHeads]

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body || {}

  // NOTE: this is a mock login. Replace with real auth logic and MongoDB checks.
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = {
    id: '1',
    name: 'Admin User',
    email,
    role: role || ROLES.SUPER_ADMIN,
    school: 'Sarang School',
    token: 'mock_token_123',
  }

  return res.json({ user })
})

app.get('/api/students', async (_, res) => {
  if (useDB) {
    const students = await Student.find().sort({ admissionNo: 1 })
    return res.json({ students })
  }
  return res.json({ students })
})

app.get('/api/students/:id', async (req, res) => {
  if (useDB) {
    const student = await Student.findById(req.params.id)
    if (!student) return res.status(404).json({ message: 'Not found' })
    return res.json({ student })
  }

  const student = students.find((s) => s.id === req.params.id)
  if (!student) return res.status(404).json({ message: 'Not found' })
  res.json({ student })
})

app.post('/api/students', async (req, res) => {
  if (useDB) {
    const created = await Student.create(req.body)
    return res.status(201).json({ student: created })
  }

  const newStudent = { id: `${Date.now()}`, ...req.body }
  students.push(newStudent)
  res.status(201).json({ student: newStudent })
})

app.put('/api/students/:id', async (req, res) => {
  if (useDB) {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    return res.json({ student: updated })
  }

  const idx = students.findIndex((s) => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  students[idx] = { ...students[idx], ...req.body }
  res.json({ student: students[idx] })
})

app.delete('/api/students/:id', async (req, res) => {
  if (useDB) {
    await Student.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  }

  students = students.filter((s) => s.id !== req.params.id)
  res.status(204).end()
})

app.get('/api/transactions', (_, res) => res.json({ transactions }))
app.get('/api/notices', async (_, res) => {
  if (useDB) {
    const notices = await Notice.find().sort({ date: -1 })
    return res.json({ notices })
  }
  return res.json({ notices })
})

app.post('/api/notices', async (req, res) => {
  if (useDB) {
    const notice = await Notice.create(req.body)
    return res.status(201).json({ notice })
  }

  const notice = {
    id: `${Date.now()}`,
    ...req.body,
  }
  notices.unshift(notice)
  res.status(201).json({ notice })
})

app.put('/api/notices/:id', async (req, res) => {
  if (useDB) {
    const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    return res.json({ notice: updated })
  }

  const idx = notices.findIndex((n) => n.id === req.params.id)
  if (idx === -1) return res.status(404).json({ message: 'Not found' })
  notices[idx] = { ...notices[idx], ...req.body }
  res.json({ notice: notices[idx] })
})

app.delete('/api/notices/:id', async (req, res) => {
  if (useDB) {
    await Notice.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  }

  notices = notices.filter((n) => n.id !== req.params.id)
  res.status(204).end()
})

app.get('/api/gallery', (_, res) => res.json({ gallery }))
app.get('/api/sessions', (_, res) => res.json({ sessions }))
app.get('/api/defaulters', (_, res) => res.json({ defaulters }))
app.get('/api/fee-heads', (_, res) => res.json({ feeHeads }))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API server running on http://localhost:${PORT}`)
})
