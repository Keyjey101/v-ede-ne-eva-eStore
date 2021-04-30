require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const fileUpload = require('express-fileupload');
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path');


const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'client/build')))
app.use('/api', router)

// !Last use in app - error handling
app.use(errorHandler)

const start = async () => {
  
    try {

await sequelize.authenticate()
await sequelize.sync()





        
        app.listen(PORT, () => console.log(`---------server started at https://localhost:${PORT} ---- `))

    }
    catch(e){
        console.log(e)
        res.status(500).json({message: 'something wrong on serever side'})
    }
}


start()











