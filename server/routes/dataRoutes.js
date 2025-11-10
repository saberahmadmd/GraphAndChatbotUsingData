const express = require('express');
const router = express.Router();
const DataModel = require('../models/dataModel');

/**
 * GET /api/data
 * Query parameters: type, category
 */
router.get('/data', async (req, res) => {
  try {
    const { type = 'historical', category = 'Passenger Vehicles' } = req.query;
    const data = await DataModel.getData(type, category);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

/**
 * GET /api/data/all
 * Get all data for chatbot context
 */
router.get('/data/all', async (req, res) => {
  try {
    const data = await DataModel.getAllData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching all data:', error);
    res.status(500).json({ error: 'Failed to fetch all data' });
  }
});

module.exports = router;