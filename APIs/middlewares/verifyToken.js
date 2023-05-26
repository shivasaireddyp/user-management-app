const jwt = require('jsonwebtoken')
require('dotenv')

const verifyToken=(request,response,next)=>{
    // Token verification logic
    let bearerToken = request.headers.authorization
    // if bearer token is not there then send resp "unautorized req."
    if(bearerToken===undefined){
        response.send({message:"Unauthoized Request, try again"})
    }
    else{
        const token = bearerToken.split(" ")[1]
        try{
        jwt.verify(token,process.env.SECRET_KEY)
        next()
        }
        catch(err){
            response.send({message:"Please login again!"})
        }
    }

}

module.exports = verifyToken