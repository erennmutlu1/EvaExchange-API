// controllers/portfolioController.js
const portfolioRepository = require('../repository/portfolioRepository');

class PortfolioController {
  async getAllPortfolios(req, res) {
    try {
      const portfolios = await portfolioRepository.getAllPortfolios();
      res.json(portfolios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPortfolioById(req, res) {
    const { portfolioId } = req.params;
    try {
      const portfolio = await portfolioRepository.getPortfolioById(portfolioId);
      if (!portfolio) {
        res.status(404).json({ error: 'Portfolio not found' });
        return;
      }
      res.json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createPortfolio(req, res) {
    const { name, userId } = req.body;
    try {
      const newPortfolio = await portfolioRepository.createPortfolio({ name, userId });
      res.status(201).json(newPortfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updatePortfolio(req, res) {
    const { portfolioId } = req.params;
    const { name, userId } = req.body;
    try {
      const portfolio = await portfolioRepository.updatePortfolio(portfolioId, { name, userId });
      res.json(portfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deletePortfolio(req, res) {
    const { portfolioId } = req.params;
    try {
      const deletedPortfolio = await portfolioRepository.deletePortfolio(portfolioId);
      if (deletedPortfolio) {
        res.json(deletedPortfolio);
      } else {
        res.status(404).json({ error: 'Portfolio not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = PortfolioController;