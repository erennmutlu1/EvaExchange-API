// repository/portfolioRepository.js
const { Portfolio } = require('../models');

class PortfolioRepository {
  async getAllPortfolios() {
    return Portfolio.findAll();
  }

  async getPortfolioById(portfolioId) {
    return Portfolio.findByPk(portfolioId);
  }

  async createPortfolio(portfolioData) {
    return Portfolio.create(portfolioData);
  }

  async updatePortfolio(portfolioId, updatedPortfolioData) {
    await Portfolio.update(updatedPortfolioData, {
      where: { id: portfolioId },
    });
    return this.getPortfolioById(portfolioId);
  }

  async deletePortfolio(portfolioId) {
    const portfolio = await this.getPortfolioById(portfolioId);
    if (portfolio) {
      await portfolio.destroy();
    }
    return portfolio;
  }
}

module.exports = new PortfolioRepository();
