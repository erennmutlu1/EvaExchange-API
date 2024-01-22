module.exports = (sequelize, DataTypes) => {
    const Trade = sequelize.define('Trade', {
      // Define your Trade model fields here
      // For example:
      type: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
    });
  
    Trade.associate = (models) => {
      // Define associations with other models if needed
    };
  
    return Trade;
  };
  