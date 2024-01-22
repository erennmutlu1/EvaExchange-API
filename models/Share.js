// src/models/Share.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Share = sequelize.define('Share', {
    symbol: { type: DataTypes.STRING, unique: true },
    price: DataTypes.DECIMAL(10, 2),
  });

  return Share;
};
