'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trades', 'shareId');
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can add logic to recreate the 'shareId' column in the down migration
  }
};
