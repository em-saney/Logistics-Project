const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Logistics-Project', 'postgres', 'postgres', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false, 
  },
  timezone: '+01:00', 
  logging: true,
});


module.exports = { sequelize };
