const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    // Requests made by Render's reverse proxy and local non-browser tools may
    // have no Origin header. Browser requests must match an allowed origin.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  }
}));
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
const asyncHandler = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend Node.js dang hoat dong!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get('/api/students', asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
}));

app.post('/api/students', asyncHandler(async (req, res) => {
  const { studentId, name, email } = req.body;
  if (![studentId, name, email].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ message: 'studentId, name, and email are required' });
  }
  const newStudent = await Student.create({ studentId: studentId.trim(), name: name.trim(), email: email.trim() });
  res.status(201).json(newStudent);
}));

app.put('/api/students/:id', asyncHandler(async (req, res) => {
  const { studentId, name, email } = req.body;
  const changes = Object.fromEntries(Object.entries({ studentId, name, email }).filter(([, value]) => value !== undefined));
  if (!Object.keys(changes).length || Object.values(changes).some(value => typeof value !== 'string' || !value.trim())) {
    return res.status(400).json({ message: 'Provide at least one non-empty student field to update' });
  }
  for (const key of Object.keys(changes)) changes[key] = changes[key].trim();
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });
  if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
  res.json(updatedStudent);
}));

app.delete('/api/students/:id', asyncHandler(async (req, res) => {
  const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Da xoa thanh cong' });
}));

app.use((error, req, res, next) => {
  console.error('❌ Loi API:', error.message);
  if (res.headersSent) return next(error);
  const status = error.message === 'Origin is not allowed by CORS' ? 403
    : error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: status === 500 ? 'Khong the xu ly yeu cau voi MongoDB' : error.message });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected to MongoDB Atlas successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Loi ket noi MongoDB:', error.message);
    process.exitCode = 1;
  }
}

startServer();
