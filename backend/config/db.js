const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // ออกจากโปรแกรมเมื่อเกิดข้อผิดพลาด
  }
}

module.exports = connectDB;