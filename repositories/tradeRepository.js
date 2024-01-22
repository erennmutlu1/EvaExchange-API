// repository/tradeRepository.js
const { Trade } = require('../models');

class TradeRepository {
  async getAllTrades() {
    return Trade.findAll();
  }

  async getTradeById(tradeId) {
    return Trade.findByPk(tradeId);
  }

  async createTrade(tradeData) {
    return Trade.create(tradeData);
  }

  async updateTrade(tradeId, updatedTradeData) {
    await Trade.update(updatedTradeData, {
      where: { id: tradeId },
    });
    return this.getTradeById(tradeId);
  }

  async deleteTrade(tradeId) {
    const trade = await this.getTradeById(tradeId);
    if (trade) {
      await trade.destroy();
    }
    return trade;
  }
}

module.exports = new TradeRepository();
