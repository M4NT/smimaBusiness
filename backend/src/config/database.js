const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('smimabd_business', 'smima_master', 'sm1m4$b1s1n355!', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
