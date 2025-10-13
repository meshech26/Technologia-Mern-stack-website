// server.js
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import repairRoutes from './routes/repairRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Static folder for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/repairs', repairRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Repair Management Backend is running...');
});

// ✅ Connect to DB and start server only after successful connection
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });