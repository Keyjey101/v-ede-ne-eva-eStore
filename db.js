require('dotenv').config()
const Sequelize = require('sequelize').Sequelize

module.exports = new Sequelize (

    'd8a936cciknf3v',
    'sgcwvpaokvtzwl',
    'd6882a02751e9fe70bfd4e1c83417a3521e547d33d8cea5cbf79886ee349263b',
    {
dialect: 'postgres',
host: 'ec2-52-21-252-142.compute-1.amazonaws.com',
port: 5432
    }

)





