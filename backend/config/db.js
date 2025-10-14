// In server/config/db.js
import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    // --- FIX: Remove the deprecated options object ---
    await mongoose.connect(uri); 
    
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

export default connectDB;