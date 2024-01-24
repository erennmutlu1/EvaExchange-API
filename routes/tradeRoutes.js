const express = require('express');
const router = express.Router();
const { Trade } = require('../models');

// Get all trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.findAll();
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific trade by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await Trade.findByPk(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new trade
router.post('/create', async (req, res) => {
  const { type, quantity, price, shareId } = req.body;
  try {
    const newTrade = await Trade.create({ type, quantity, price, shareId });
    res.status(201).json(newTrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing trade by ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { type, quantity, price, shareId } = req.body;
  try {
    const trade = await Trade.findByPk(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    await trade.update({ type, quantity, price, shareId });
    res.json(trade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a trade by ID
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trade = await Trade.findByPk(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    await trade.destroy();
    res.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;