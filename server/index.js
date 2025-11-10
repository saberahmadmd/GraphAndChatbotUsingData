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

/**
 * CORS / allowed origins
 *
 * Set FRONTEND_ORIGINS in your environment (comma-separated), e.g.:
 * FRONTEND_ORIGINS=http://localhost:5173,https://graph-and-chatbot-using-data.vercel.app
 *
 * If FRONTEND_ORIGINS is not set, we default to local dev + your Vercel URL.
 */
const allowedOrigins = (process.env.FRONTEND_ORIGINS || [
  'http://localhost:5173',
  'https://graph-and-chatbot-using-data.vercel.app'
].join(','))
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Use dynamic CORS so we can echo back the exact origin (required if credentials: true)
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      // Reject with a sensible message — browsers will block the call
      return callback(new Error(`CORS policy: origin ${origin} not allowed`), false);
    }
  },
  credentials: true, // only if you need cookies/auth; keep true if you do
  optionsSuccessStatus: 204
};

// Apply CORS
app.use(cors(corsOptions));

// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

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
      console.log('🌐 Allowed CORS origins:', allowedOrigins);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
