const Router = require('express')
const { check } = require("express-validator");
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthHandlerMiddleware')

const router = new Router()



router.post('/registration', 

[check("email", "Введите пожалуйста корректный адрес почты").isEmail(),
check("password", "Минимальная длина пароля - шесть символов же").isLength({ min: 6 })
]

,userController.registration)

router.post('/login',

[check("email", "Введите пожалуйста корректный адрес почты").isEmail(),
check("password", "Минимальная длина пароля шесть символов же").isLength({ min: 6 })
]
,userController.login)

router.get('/auth', authMiddleware ,userController.auth) 



module.exports = router