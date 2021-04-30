require('dotenv').config()
const ApiError = require('../handlers/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require("express-validator");
const {User, Basket} = require('../models/models')



const jwtGenerate = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.JWT, {expiresIn: '1h'})
}




class UserController {

//----------------------------------------------REGISTRATION---------------------------------------//    
    async registration(req, res, next){
        try {


            //validation of email and password lenght, dependencies are in userRouter
            const valitationErrors = validationResult(req) 
                       
            if (!valitationErrors.isEmpty()) {
                return res
                  .status(400)
                  .json({
                    valitationErrors: valitationErrors.array(),
                    message: valitationErrors.errors[0].msg,
                  });
              }


//getting fields from frontend
        const {email, password, role} = req.body
        
        //check user is already register, async cz get from DB

        const candidate = await User.findOne({where: {email}})

        if (candidate) {
            return next(ApiError.badRequest('User already exist'))
             }
//creating User: Hash password - creating user with hashPassword - creating Basket belongs to User - send jwt
const hashPassword = await bcrypt.hash(password, 12)
const user = await User.create({email, password: hashPassword, role})
const basket = await Basket.create({userId: user.id})
const token = jwtGenerate(user.id, user.email, user.role)

return res.json({token})


        }
        catch(e){
console.log(e)
        }
    }
//----------------------------------------------LOGIN---------------------------------------//  
    async login(req, res, next){
        

        try {

            //validation of email and password lenght, dependencies are in userRouter
            //This block from registration is added cz personaly if i forgot my password tips of minimum lenght and/or letter case/special symbols are usefull to recall it
            const valitationErrors = validationResult(req) 
                       
            if (!valitationErrors.isEmpty()) {
                return res
                  .status(400)
                  .json({
                    valitationErrors: valitationErrors.array(),
                    message: valitationErrors.errors[0].msg,
                  });
              }


//getting fields from frontend
        const {email, password} = req.body
        
        //check if user exist then check password in response where is no message difference cz of security 

        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('Wrong username and/or password'))
             }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return next(ApiError.internal('Wrong username and/or password'))
        }
             

//creating token

const token =  jwtGenerate(user.id, user.email, user.role)
return res.json({token})


        }
        catch(e){
console.log(e)
        }





    }

//----------------------------------------------AUTHENTICATION---------------------------------------//  
    async auth(req, res, next){
        
const token = jwtGenerate(req.user.id, req.user.email, req.user.role)
return res.json({token})
}




}

module.exports = new UserController()