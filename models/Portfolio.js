module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define('Portfolio', {    
      name: DataTypes.STRING,
      value: DataTypes.FLOAT,
    });
  
    Portfolio.associate = (models) => {
      Portfolio.hasMany(models.Trade); 
    };
 
    return Portfolio;
  };  