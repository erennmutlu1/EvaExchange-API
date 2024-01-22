// portfolioRoutes.js
const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models');

// Get all portfolios
router.get('/portfolios', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific portfolio by ID
router.get('/portfolios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new portfolio
router.post('/portfolios', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newPortfolio = await Portfolio.create({ name, description });
    res.status(201).json(newPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing portfolio by ID
router.put('/portfolios/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    await portfolio.update({ name, description });
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a portfolio by ID
router.delete('/portfolios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    await portfolio.destroy();
    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
