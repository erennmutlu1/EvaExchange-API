// controllers/tradeController.js
const tradeRepository = require('../repository/tradeRepository');

class TradeController {
  async getAllTrades(req, res) {
    try {
      const trades = await tradeRepository.getAllTrades();
      res.json(trades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTradeById(req, res) {
    const { tradeId } = req.params;
    try {
      const trade = await tradeRepository.getTradeById(tradeId);
      if (!trade) {
        res.status(404).json({ error: 'Trade not found' });
        return;
      }
      res.json(trade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createTrade(req, res) {
    const { symbol, quantity, price, userId } = req.body;
    try {
      const newTrade = await tradeRepository.createTrade({ symbol, quantity, price, userId });
      res.status(201).json(newTrade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateTrade(req, res) {
    const { tradeId } = req.params;
    const { symbol, quantity, price, userId } = req.body;
    try {
      const trade = await tradeRepository.updateTrade(tradeId, { symbol, quantity, price, userId });
      res.json(trade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteTrade(req, res) {
    const { tradeId } = req.params;
    try {
      const deletedTrade = await tradeRepository.deleteTrade(tradeId);
      if (deletedTrade) {
        res.json(deletedTrade);
      } else {
        res.status(404).json({ error: 'Trade not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TradeController;
