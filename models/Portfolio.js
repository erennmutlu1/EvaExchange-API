module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {    
      name: DataTypes.STRING,
      value: DataTypes.DECIMAL(10, 2),
    });
  
    Portfolio.associate = (models) => {
    };
  
    return Portfolio;
  };  