'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trades', 'portfolioId');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can add logic to recreate the 'portfolioId' column in the down migration
  }
};
