// src/models/Share.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Share = sequelize.define('Share', {
  symbol: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Share;
