require('dotenv').config()
const Sequelize = require('sequelize').Sequelize

module.exports = new Sequelize (

   
    {
dialect: 'postgres',
use_env_variable: 'DATABASE_URL'
    }

)





