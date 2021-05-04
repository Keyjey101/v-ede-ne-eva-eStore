require('dotenv').config()
const Sequelize = require('sequelize').Sequelize

module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }

})



