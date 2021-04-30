require('dotenv').config()
const Sequelize = require('sequelize').Sequelize

const dev = new Sequelize (

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
dialect: 'postgres',
host: process.env.DB_HOST,
port: process.env.DB_PORT
    }

)

const prod = new Sequelize (

    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
dialect: 'postgres',
host: process.env.DB_HOST,
port: process.env.DB_PORT,
connectionString: process.env.DATABASE_URL
    }

)


module.exports = process.env.NODE_ENV === 'production' ? prod : dev

