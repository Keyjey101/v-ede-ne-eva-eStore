const Router = require('express')

const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const veganRouter = require('./veganRouter')
const basketRouter = require('./basketRouter')




const router = new Router()




router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/vegan', veganRouter)
router.use('/product', productRouter)
router.use('/basket', basketRouter)



module.exports = router