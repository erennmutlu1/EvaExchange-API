// src/models/Share.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Share = sequelize.define('Share', {
    symbol: { type: DataTypes.STRING, unique: true },
    price: DataTypes.DECIMAL(10, 2),
  });

  Share.associate = (models) => {
    Share.hasMany(models.Trade); 
  };

  return Share;
};
