// MINIMAL BACKEND SERVER EXAMPLE
// This is what your backend should look like

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

// Course Schema
const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  duration: String,
  fee: Number,
  subjects: [String]
});
const Course = mongoose.model('Course', courseSchema);

// Routes
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json({ success: true, courses });
});

app.post('/api/auth/student/login', async (req, res) => {
  const { email, password } = req.body;
  // Add authentication logic
  res.json({ success: true, token: 'jwt_token', user: {} });
});

app.listen(5000, () => console.log('Server running on port 5000'));
