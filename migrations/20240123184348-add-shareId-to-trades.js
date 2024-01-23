'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trades', 'shareId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Shares',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trades', 'shareId');
  },
};
