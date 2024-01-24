const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT, 
    operatorsAliases: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 20000,
      idle: 5000
    }
  }
);

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