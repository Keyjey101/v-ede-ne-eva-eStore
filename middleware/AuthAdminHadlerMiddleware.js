require('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
    
        try {
    
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: 'User is not authenticated'})
    }
    
      const isAdmin = jwt.decode(token, process.env.JWT).role
    
    if (isAdmin !== role) {
     return  res.status(403).json({message: 'No access'})
    }
    
    req.user = isAdmin
    next()
    
    
        }
        catch (e) {
            res.status(401).json({message: 'User is not authenticated'})
        }
    }

}



