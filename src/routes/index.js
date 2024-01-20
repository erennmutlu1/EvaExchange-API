// src/routes/index.js
const express = require('express');
const router = express.Router();

// Placeholder route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to SuperTraders-REST-API!' });
});

module.exports = router;
