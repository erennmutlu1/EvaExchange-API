const express = require('express');
const router = express.Router();
const shareRoutes = require('./shareRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const tradeRoutes = require('./tradeRoutes');
const userRoutes = require('./userRoutes');
const { Share, Portfolio, Trade, User } = require('../models');

// Share routes
router.use('/shares', shareRoutes);

// Portfolio routes
router.use('/portfolios', portfolioRoutes);

// Trade routes
router.use('/trades', tradeRoutes);

// User routes
router.use('/users', userRoutes);

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