const mongoose = require('mongoose');

// MongoDB connection string (replace with your connection string)
const DB_URI = process.env.DB_URI;

// Connection options for best performance
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // 10 seconds timeout
  socketTimeoutMS: 45000,  // 45 seconds for socket timeout
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, options);
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Event listeners for better control
mongoose.connection.on('disconnected', () => {
  console.warn('⚡️ MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectDB, 5000); // Try to reconnect after 5 seconds
});

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ MongoDB connection error: ${err.message}`);
});

// Export the function
module.exports = connectDB;
