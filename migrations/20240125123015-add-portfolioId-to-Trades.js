'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trades', 'portfolioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Portfolio',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trades', 'portfolioId');
  },
};