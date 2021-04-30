const Router = require('express')
const basketController = require('../controllers/basketController')


const router = new Router()






router.get('/:email', basketController.getOneBasket)

router.post('/', basketController.putInBasket)
router.delete('/:email/:product', basketController.deleteFromBasket)
router.delete('/all/:email/:product', basketController.deleteProductFromBasket)
router.delete('/:email', basketController.deleteAllFromBasket)

module.exports = router