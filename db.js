require('dotenv').config()
const Sequelize = require('sequelize')

module.exports = new Sequelize({
    database: "d8a936cciknf3v",
    username: "sgcwvpaokvtzwl",
    password: "d6882a02751e9fe70bfd4e1c83417a3521e547d33d8cea5cbf79886ee349263b",
    host: "ec2-52-21-252-142.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
  });



