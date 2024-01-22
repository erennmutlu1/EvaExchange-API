// controllers/shareController.js
const { Share } = require('../models');

const getAllShares = async (req, res) => {
  try {
    const shares = await Share.findAll();
    res.json(shares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getShareById = async (req, res) => {
  const { id } = req.params;
  try {
    const share = await Share.findByPk(id);
    if (!share) {
      res.status(404).json({ error: 'Share not found' });
      return;
    }
    res.json(share);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createShare = async (req, res) => {
  const { symbol, price } = req.body;
  try {
    const newShare = await Share.create({ symbol, price });
    res.status(201).json(newShare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateShare = async (req, res) => {
  const { id } = req.params;
  const { symbol, price } = req.body;
  try {
    const share = await Share.findByPk(id);
    if (!share) {
      res.status(404).json({ error: 'Share not found' });
      return;
    }
    await share.update({ symbol, price });
    res.json(share);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteShare = async (req, res) => {
  const { id } = req.params;
  try {
    const share = await Share.findByPk(id);
    if (!share) {
      res.status(404).json({ error: 'Share not found' });
      return;
    }
    await share.destroy();
    res.json({ message: 'Share deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllShares,
  getShareById,
  createShare,
  updateShare,
  deleteShare,
};
