const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`${res.status} ${res.statusText}: ${text}`)
    }

    return res.json()
  } catch (error) {
    console.error('API error:', error)
    throw error
  }
}

export const login = async (email, password, role = 'SUPER_ADMIN') => {
  const data = await safeFetch(`${API_BASE}/api/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  })
  return data.user
}

export const fetchStudents = async () => {
  const data = await safeFetch(`${API_BASE}/api/students`)
  return data.students
}

export const createStudent = async (student) => {
  const data = await safeFetch(`${API_BASE}/api/students`, {
    method: 'POST',
    body: JSON.stringify(student),
  })
  return data.student
}

export const updateStudent = async (id, updates) => {
  const data = await safeFetch(`${API_BASE}/api/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
  return data.student
}

export const deleteStudent = async (id) => {
  await safeFetch(`${API_BASE}/api/students/${id}`, {
    method: 'DELETE',
  })
}

export const fetchTransactions = async () => {
  const data = await safeFetch(`${API_BASE}/api/transactions`)
  return data.transactions
}

export const fetchNotices = async () => {
  const data = await safeFetch(`${API_BASE}/api/notices`)
  return data.notices
}

export const createNotice = async (notice) => {
  const data = await safeFetch(`${API_BASE}/api/notices`, {
    method: 'POST',
    body: JSON.stringify(notice),
  })
  return data.notice
}

export const updateNotice = async (id, updates) => {
  const data = await safeFetch(`${API_BASE}/api/notices/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
  return data.notice
}

export const deleteNotice = async (id) => {
  await safeFetch(`${API_BASE}/api/notices/${id}`, {
    method: 'DELETE',
  })
}

export const fetchGallery = async () => {
  const data = await safeFetch(`${API_BASE}/api/gallery`)
  return data.gallery
}

export const fetchSessions = async () => {
  const data = await safeFetch(`${API_BASE}/api/sessions`)
  return data.sessions
}

export const fetchDefaulters = async () => {
  const data = await safeFetch(`${API_BASE}/api/defaulters`)
  return data.defaulters
}

export const fetchFeeHeads = async () => {
  const data = await safeFetch(`${API_BASE}/api/fee-heads`)
  return data.feeHeads
}
