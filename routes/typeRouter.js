const Router = require('express')
const typeController = require('../controllers/typeController')
const isAdmin = require('../middleware/AuthAdminHadlerMiddleware')

const router = new Router()




router.post('/', isAdmin('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

router.delete('/:id', isAdmin('ADMIN'), typeController.deleteOne)
router.delete('/', isAdmin('ADMIN'), typeController.deleteAll)

module.exports = router