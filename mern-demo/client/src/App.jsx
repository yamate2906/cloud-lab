import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/students`)
      if (!res.ok) throw new Error(`Không tải được danh sách (${res.status})`)
      const data = await res.json()
      setStudents(data)
      setError('')
    } catch (error) {
      setError(error.message || 'Không kết nối được máy chủ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStudents() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error((await res.json()).message || 'Không thêm được sinh viên')
      await fetchStudents()
      setFormData({ studentId: '', name: '', email: '' })
    } catch (error) {
      setError(error.message)
    }
  }

  // Câu 62: Hàm Xóa sinh viên
  const handleDelete = async (id) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      try {
        const res = await fetch(`${API_BASE}/students/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Không xóa được sinh viên')
        await fetchStudents()
      } catch (error) { setError(error.message) }
    }
  }

  // Câu 61: Hàm Sửa sinh viên
  const handleUpdate = async (id, currentName, currentEmail) => {
    const newName = window.prompt('Nhập tên mới:', currentName)
    const newEmail = window.prompt('Nhập email mới:', currentEmail)
    
    if(newName && newEmail) {
      try {
        const res = await fetch(`${API_BASE}/students/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName, email: newEmail })
        })
        if (!res.ok) throw new Error('Không cập nhật được sinh viên')
        await fetchStudents()
      } catch (error) { setError(error.message) }
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <header>
        <h1>Quản lý sinh viên</h1>
        <p>Phiên bản 2.0 - Production Cloud PaaS (Auto-Deployed)</p>
      </header>
      {error && <p role="alert" style={{ color: '#b42318' }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9' }}>
        <input placeholder="MSSV" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} required style={{ marginRight: '10px' }} />
        <input placeholder="Họ tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ marginRight: '10px' }} />
        <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required style={{ marginRight: '10px' }} />
        <button type="submit">Thêm Sinh viên</button>
      </form>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#eee' }}>
          <tr>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <tr><td colSpan="4">Đang tải...</td></tr> : students.map((s) => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleUpdate(s._id, s.name, s.email)} style={{ marginRight: '5px', backgroundColor: '#ffc107', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(s._id)} style={{ backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer style={{ marginTop: '24px' }}>Phiên bản 2.0 - Production Cloud PaaS (Auto-Deployed)</footer>
    </div>
  )
}

export default App
