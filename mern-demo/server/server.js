const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI chua duoc cau hinh trong file .env');
}

// Tạo Model Student
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  email: String
});
const Student = mongoose.model('Student', studentSchema);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend Node.js dang hoat dong!' });
});

app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.json(newStudent);
});

app.put('/api/students/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

app.delete('/api/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Da xoa thanh cong' });
});

app.use((error, req, res, next) => {
  console.error('❌ Loi API:', error.message);
  res.status(500).json({ message: 'Khong the xu ly yeu cau voi MongoDB' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ Ket noi MongoDB Atlas thanh cong!');
    app.listen(PORT, () => {
      console.log(`🚀 Server dang chay tai port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Loi ket noi MongoDB:', error.message);
    process.exitCode = 1;
  }
}

startServer();