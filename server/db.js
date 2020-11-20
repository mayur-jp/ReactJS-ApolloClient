const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('DB_NAME', 'DB_ROOT_USERNAME', 'DB_PASSWORD', {
    host: 'localhost',
    port: 'PORT',
    dialect: 'mysql',
});

module.exports = sequelize 
