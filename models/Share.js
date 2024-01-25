const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Share = sequelize.define('Share', {
    symbol: { type: DataTypes.STRING, unique: true },
    price: DataTypes.FLOAT,
  });

  Share.associate = (models) => {
    Share.hasMany(models.Trade); 
  };

  return Share;
};