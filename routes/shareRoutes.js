const express = require('express');
const router = express.Router();
const { Share } = require('../models');

// Get all shares
router.get('/', async (req, res) => {
  try {
    const shares = await Share.findAll();
    res.json(shares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single share by ID
router.get('/:id', async (req, res) => {
  const shareId = req.params.id;

  try {
    const share = await Share.findByPk(shareId);

    if (!share) {
      return res.status(404).json({ error: 'Share not found' });
    }

    res.json(share);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new share
router.post('/create', async (req, res) => {
  const { symbol, price } = req.body;

  try {
    const newShare = await Share.create({ symbol, price });
    res.status(201).json(newShare);

  } catch (error) {
    console.error('Error creating share:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a share by ID
router.put('/update/:id', async (req, res) => {
  const shareId = req.params.id;
  const { symbol, price } = req.body;

  try {
    const share = await Share.findByPk(shareId);

    if (!share) {
      return res.status(404).json({ error: 'Share not found' });
    }

    await share.update({ symbol, price });
    res.json(share);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a share by ID
router.delete('/delete/:id', async (req, res) => {
  const shareId = req.params.id;

  try {
    const share = await Share.findByPk(shareId);

    if (!share) {
      return res.status(404).json({ error: 'Share not found' });
    }

    await share.destroy();
    res.json({ message: 'Share deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
