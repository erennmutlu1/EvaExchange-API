// src/models/Trade.js
module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    shareId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Make sure allowNull is set to false
    },
  });

  Trade.associate = (models) => {
    Trade.belongsTo(models.Share, { foreignKey: 'shareId' });
  };

  return Trade;
};
