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

  useEffect(() => {
    fetchStudents()
  }, [])

  // Gửi dữ liệu tạo sinh viên mới (Câu 48, 49)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      fetchStudents() // Cập nhật lại danh sách ngay lập tức
      setFormData({ studentId: '', name: '', email: '' }) // Xóa trắng form nhập
    } catch (error) {
      console.error("Lỗi:", error)
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#333' }}>Quản lý Sinh viên (MERN Stack)</h2>
      
      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <input placeholder="MSSV" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} required style={{ marginRight: '10px', padding: '8px' }} />
        <input placeholder="Họ tên" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{ marginRight: '10px', padding: '8px' }} />
        <input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required style={{ marginRight: '10px', padding: '8px' }} />
        <button type="submit" style={{ padding: '9px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Thêm Sinh viên</button>
      </form>

      {/* Bảng danh sách sinh viên */}
      <table border="1" cellPadding="12" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#eeeeee' }}>
            <th>MSSV</th>
            <th>Họ Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.studentId}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App