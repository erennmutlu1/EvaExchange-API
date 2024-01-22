module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {
      // Define your Portfolio model fields here
      // For example:
      name: DataTypes.STRING,
      value: DataTypes.DECIMAL(10, 2),
    });
  
    Portfolio.associate = (models) => {
      // Define associations with other models if needed
    };
  
    return Portfolio;
  };
  