const express = require('express');
const router = express.Router();
const { Trade, Share, Portfolio } = require('../models');

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

// Create a new trade (BUY operation)
router.post('/buy', async (req, res) => {
  const { symbol, quantity, portfolioId } = req.body;
  try {
    // Check if the share is registered
    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      return res.status(400).json({ error: 'Specified share is not registered' });
    }

    // Check if the portfolio is registered
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).json({ error: 'Specified portfolio is not registered' });
    }

    // Calculate the total cost based on the latest share price
    const price = share.price;
    const totalCost = quantity * price;

    // Check if the user has sufficient funds in the portfolio
    if (portfolio.value < totalCost) {
      return res.status(400).json({ error: 'Insufficient funds in the portfolio' });
    }

    // Create a new BUY trade
    const newTrade = await Trade.create({ type: 'BUY', quantity, price, shareId: share.id, portfolioId });

    // Update the portfolio value by subtracting the total cost
    await portfolio.update({ value: portfolio.value - totalCost });

    res.status(201).json(newTrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new trade (SELL operation)
router.post('/sell', async (req, res) => {
  const { symbol, quantity, portfolioId } = req.body;

  const numericValue = parseFloat(req.body.value);

  // Check numeric value in request body
  if (isNaN(numericValue)) {
    return res.status(400).json({ error: 'Invalid numeric value for portfolio value' });
  }

  try {
    // Check if the share is registered
    const share = await Share.findOne({ where: { symbol } });
    if (!share) {
      return res.status(400).json({ error: 'Specified share is not registered' });
    }

    // Check if the portfolio is registered
    const portfolio = await Portfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(400).json({ error: 'Specified portfolio is not registered' });
    }

    // Check if the user has the specified quantity of shares in the portfolio
    const userShares = await Trade.sum('quantity', {
      where: {
        shareId: share.id,
        portfolioId,
        type: ['BUY', 'SELL'],
      },
    });

    // If there are no trades for the specified share, set userShares to 0
    const totalUserShares = userShares || 0;

    const remainingQuantity = totalUserShares - quantity;

    if (remainingQuantity < 0) {
      return res.status(400).json({ error: `Insufficient shares in the portfolio for selling. Remaining quantity: ${remainingQuantity}` });
    }

    // Get the latest share price
    const latestSharePrice = share.price; 

    // Create a new SELL trade with the accurate share price
    const newTrade = await Trade.create({ type: 'SELL', quantity, price: latestSharePrice, shareId: share.id, portfolioId });

    // Update the portfolio value based on the sell operation
    await portfolio.update({ value: portfolio.value + (latestSharePrice * quantity) });

    res.status(201).json(newTrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update an existing trade by ID (Note: Update for both BUY and SELL can be handled similarly)
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { type, quantity, price, shareId, portfolioId } = req.body;
  try {
    const trade = await Trade.findByPk(id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    await trade.update({ type, quantity, price, shareId, portfolioId });
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