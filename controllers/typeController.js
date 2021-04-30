const {Type} = require('../models/models')
const ApiError = require('../handlers/ApiError')

class TypeController {

//-----------------------------------CREATE----------------------------------//        
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }
//-----------------------------------GET ALL----------------------------------//    
    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }

//-----------------------------------DELETE ONE----------------------------------//    
    
async deleteOne(req, res, next){

    try {
    const {id} = req.params
    
    const deleteType = await Type.destroy({where: {id}})

    return res.redirect('/')
}
    catch(e) {

        next(ApiError.badRequest(e.message))
    }
}

//-----------------------------------DELETE ALL----------------------------------//    

async deleteAll(req, res, next){

    try {
        console.log('deleting all')
    const deleteType = await Type.destroy()

    return res.redirect('/api/type')
}
    catch(e) {

        next(ApiError.badRequest(e.message))
    }
}

}

module.exports = new TypeController()