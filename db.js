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

    {
connectionString: "postgres://sgcwvpaokvtzwl:d6882a02751e9fe70bfd4e1c83417a3521e547d33d8cea5cbf79886ee349263b@ec2-52-21-252-142.compute-1.amazonaws.com:5432/d8a936cciknf3v"
    }

)


module.exports = process.env.NODE_ENV === 'development' ? dev : prod

