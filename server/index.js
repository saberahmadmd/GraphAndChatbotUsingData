require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const DataModel = require('./models/dataModel');
const dataRoutes = require('./routes/dataRoutes');
const chatRoutes = require('./routes/chatRoutes');
const metaRoutes = require('./routes/metaRoutes');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', dataRoutes);
app.use('/api', chatRoutes);
app.use('/api', metaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    message: 'Global EV Data Explorer API',
    status: 'running',
    endpoints: [
      'GET /api/data?type=historical&category=Passenger Vehicles&region=World',
      'GET /api/data/all',
      'POST /api/chat'
    ]
  });
});

// Initialize data on startup
async function initializeData() {
  try {
    console.log('🔁 Initializing data...');
    await DataModel.initializeSampleData();
    console.log('✅ Data initialization complete');
  } catch (err) {
    console.error('❌ Error initializing data:', err);
  }
}

// Start server
async function startServer() {
  try {
    // First initialize database
    await initializeDatabase();

    // Then initialize data
    await initializeData();

    // Then start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;