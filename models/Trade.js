module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    shareId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
  });

  Trade.associate = (models) => {
    Trade.belongsTo(models.Share, { foreignKey: 'shareId' });
     //The foreignKey relation added to Portfolio
     Trade.belongsTo(models.Portfolio, { foreignKey: 'portfolioId' });
  };

  return Trade;
};