// src/routes/index.js
const express = require('express');
const router = express.Router();
const Share = require('../models/Share');

// Placeholder route
router.get('/', async (req, res) => {
  try {
    const shares = await Share.findAll();
    res.json(shares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
