import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' })

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students')
      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error("Lỗi:", error)
    }
  }

  useEffect(() => { fetchStudents() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    fetchStudents()
    setFormData({ studentId: '', name: '', email: '' })
  }

  // Câu 62: Hàm Xóa sinh viên
  const handleDelete = async (id) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      await fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
      fetchStudents()
    }
  }

  // Câu 61: Hàm Sửa sinh viên
  const handleUpdate = async (id, currentName, currentEmail) => {
    const newName = window.prompt('Nhập tên mới:', currentName)
    const newEmail = window.prompt('Nhập email mới:', currentEmail)
    
    if(newName && newEmail) {
      await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, email: newEmail })
      })
      fetchStudents()
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>Quản lý Sinh viên (MERN Stack)</h2>
      
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
          {students.map((s) => (
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
    </div>
  )
}

export default App