const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const bugRoutes = require('./routes/bugs');
const userRoutes = require('./routes/users');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bugtracker')
  .then(async () => {
    console.log('✅ MongoDB connected');
    // Seed demo data
    await seedDemo();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seedDemo() {
  const User = require('./models/User');
  const Bug = require('./models/Bug');
  const bcrypt = require('bcryptjs');

  const existing = await User.findOne({ email: 'admin@bugtracker.pro' });
  if (existing) return;

  const hash = await bcrypt.hash('Admin@123', 10);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@bugtracker.pro',
    password: hash,
    role: 'admin'
  });

  const dev = await User.create({
    name: 'Dev User',
    email: 'dev@bugtracker.pro',
    password: await bcrypt.hash('Dev@123', 10),
    role: 'developer'
  });

  const bugs = [
    { title: 'Login page crashes on Safari', description: 'Users on Safari 17 experience a white screen on login.', priority: 'critical', status: 'open', reporter: admin._id, tags: ['auth', 'safari', 'ui'] },
    { title: 'Dashboard charts not rendering', description: 'Area charts throw a render error on Firefox.', priority: 'high', status: 'in-progress', reporter: dev._id, assignee: admin._id, tags: ['charts', 'firefox'] },
    { title: 'Export PDF includes wrong date', description: 'PDF export shows creation date as today instead of actual bug date.', priority: 'medium', status: 'testing', reporter: admin._id, tags: ['export', 'pdf'] },
    { title: 'Search not filtering by assignee', description: 'Assignee filter in bug list has no effect.', priority: 'medium', status: 'open', reporter: dev._id, tags: ['search', 'filter'] },
    { title: 'Notification badge count wrong', description: 'Badge shows +1 even after marking all as read.', priority: 'low', status: 'resolved', reporter: admin._id, tags: ['notifications'] },
    { title: 'Password reset email not sent', description: 'Clicking "Forgot password" shows success but no email arrives.', priority: 'high', status: 'open', reporter: dev._id, tags: ['auth', 'email'] },
    { title: 'Dark mode toggle reverts on refresh', description: 'Theme preference is not persisted in localStorage.', priority: 'low', status: 'closed', reporter: admin._id, tags: ['ui', 'theme'] },
  ];

  for (const b of bugs) {
    await Bug.create(b);
  }

  console.log('🌱 Demo data seeded');
}
