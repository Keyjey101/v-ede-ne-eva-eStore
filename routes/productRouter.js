const Router = require('express')
const productController = require('../controllers/productController')
const isAdmin = require('../middleware/AuthAdminHadlerMiddleware')

const router = new Router()




router.post('/', isAdmin('ADMIN'), productController.create)

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

router.put('/:id', isAdmin('ADMIN'), productController.update)

router.delete('/:id', isAdmin('ADMIN'), productController.deleteOne)
router.delete('/', isAdmin('ADMIN'), productController.deleteAll)

module.exports = router