const Router = require('express')
const veganController = require('../controllers/veganController')
const isAdmin = require('../middleware/AuthAdminHadlerMiddleware')
const router = new Router()




router.post('/', isAdmin('ADMIN') ,veganController.create)
router.get('/', veganController.getAll)

router.delete('/:id', isAdmin('ADMIN'), veganController.deleteOne)
router.delete('/', isAdmin('ADMIN'), veganController.deleteAll)



module.exports = router