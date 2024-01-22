const { Sequelize } = require('sequelize');

// Your existing sequelize setup code
const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT, // Add this line to specify the dialect
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    }
  }
);

// Your existing model definitions
const Share = require('./Share')(sequelize, Sequelize);
const Portfolio = require('./Portfolio')(sequelize, Sequelize);
const Trade = require('./Trade')(sequelize, Sequelize);
const User = require('./User')(sequelize, Sequelize);

module.exports = {
  sequelize,
  Share,
  Portfolio,
  Trade,
  User,
};
