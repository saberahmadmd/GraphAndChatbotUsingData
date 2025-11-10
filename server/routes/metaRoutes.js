const express = require('express');
const router = express.Router();
const DataModel = require('../models/dataModel');

/**
 * GET /api/meta
 * Returns metadata: distinct categories, years, types
 */
router.get('/meta', async (req, res) => {
  try {
    const all = await DataModel.getAllData();
    if (!all || all.length === 0) {
      return res.json({
        categories: [],
        years: [],
        types: [],
      });
    }

    const categorySet = new Set();
    const yearSet = new Set();
    const typeSet = new Set();

    all.forEach(r => {
      if (r.category) categorySet.add(r.category);
      if (r.year !== undefined && r.year !== null) yearSet.add(Number(r.year));
      if (r.type) typeSet.add(r.type);
    });

    const categories = Array.from(categorySet).sort();
    const years = Array.from(yearSet).sort((a, b) => a - b);
    const types = Array.from(typeSet).sort();

    res.json({ categories, years, types });
  } catch (error) {
    console.error('Error in /api/meta:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

module.exports = router;