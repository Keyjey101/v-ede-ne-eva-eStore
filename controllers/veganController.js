const {Vegan} = require('../models/models')
const ApiError = require('../handlers/ApiError')

class VeganController {

//-----------------------------------CREATE----------------------------------//    
    async create(req, res){
        const {name} = req.body
        const vegan = await Vegan.create({name})
        return res.json(vegan)
    }


//-----------------------------------GET ALL----------------------------------//    
    async getAll(req, res){
        const vegans = await Vegan.findAll()
        return res.json(vegans)
    }


//-----------------------------------DELETE ONE----------------------------------//    
    
async deleteOne(req, res, next){

    try {
        
    const {id} = req.params
    console.log('deleting one vegan where id is', id)
    const deleteVegan = await Vegan.destroy({where: {id}})

    return res.redirect('/')
}
    catch(e) {

        next(ApiError.badRequest(e.message))
    }
}

//-----------------------------------DELETE ALL----------------------------------//    

async deleteAll(req, res, next){

    try {
        console.log('deleting all vegans')
    const deleteVegan = await Vegan.destroy()

    return res.redirect('/api/vegan')
}
    catch(e) {

        next(ApiError.badRequest(e.message))
    }
}   


}

module.exports = new VeganController()