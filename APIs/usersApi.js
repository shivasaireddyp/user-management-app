// creating mini express application

const exp = require('express')
const userApp = exp.Router()
require('dotenv').config()

const expressAsyncHandler = require('express-async-handler')

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../APIs/middlewares/verifyToken')
const { request } = require('express')
const { response } = require('express')

// userApp.get('/get-users',expressAsyncHandler(
//     async(request,response)=>{
//         const usersCollection = request.app.get('usersCollection')
//         //the find method returns a cursor
//         let users = await usersCollection.find().toArray()
//         response.status(200).send({message:"Users Data:",payload:users})
//     }
// ))

// userApp.get('/get-users/:id',expressAsyncHandler(
//     async(request,response)=>{
//         // get userCollection
//         const usersCollection = request.app.get('usersCollection')
//         // get user from request body
//         let userId = (+request.params.id)
//         //save or insert or create newuser in userscollection
//         let user = await usersCollection.findOne({id:userId})
//         response.status(200).send({message:"Users Found:",payload:user})
//     }
// ))

// userApp.use(exp.json())
// userApp.post('/create-user',expressAsyncHandler(
//     async(request,response)=>{
//         const usersCollection = request.app.get('usersCollection')
//         // get user from the requests
//         const newUser = request.body
//         let result = await usersCollection.insertOne(newUser)
//         response.status(200).send({message:"User Created",payload:result})
//     }
// ))

// userApp.put('/update-user',expressAsyncHandler(
//     async(request,response)=>{
//         const usersCollection = request.app.get('usersCollection')
//         let modifiedUser = request.body
//         let result = await usersCollection.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}})
//         response.status(200).send({message:"User Updated",payload:result})
//     }
// ))

// userApp.delete('/delete-user/:id',expressAsyncHandler(
//     async(request,response)=>{
//         const usersCollection = request.app.get('usersCollection')
//         let userId = (+request.params.id)
//         let result = await usersCollection.deleteOne({id:userId})
//         response.status(200).send({message:"User Deleted",payload:result})
//     }
// ))



// User Registration

//body parser
userApp.use(exp.json())

userApp.get('/get-users',verifyToken,expressAsyncHandler(
    async(request,response)=>{
        const usersCollection = request.app.get('usersCollection')
        let allUsers = await usersCollection.find().toArray()
        response.status(200).send({message:"Users data",payload:allUsers})
    }
))

userApp.post('/register-user',expressAsyncHandler(
    async(request,response)=>{
        const usersCollection = request.app.get('usersCollection')
        const newUser = request.body
        let result = await usersCollection.findOne({username:newUser.username})
        // console.log(result)
        if(result!==null){
            response.status(200).send({message:"Username already exists"})
        }
        else{
            // hash the password before pushing into database
            let hashedPassword = await bcryptjs.hash(newUser.password,5)
            newUser.password = hashedPassword
            // push into database
            await usersCollection.insertOne(newUser)
            // send response
            response.status(201).send({message:"User Registered"})
        }
    }
))

// userApp.delete('/delete-user/:username',expressAsyncHandler(
//     async(request,response)=>{
//         const usersCollection = request.app.get('usersCollection')
//         let userNameDel = request.params.username
//         let deletedUser = await usersCollection.deleteOne({username:userNameDel})
//         response.status(200).send({message:"User deleted",payload:deletedUser})
//     }
// ))

userApp.post('/login-user',expressAsyncHandler(
    async(request,response)=>{
        const usersCollection = request.app.get('usersCollection')
        const userCredentials = request.body
        let userOfDb = await usersCollection.findOne({username:userCredentials.username})
        if(userOfDb===null){
            response.send({message:"Invalid username"})
        }
        else{
            // compare passwords
            if(await bcryptjs.compare(userCredentials.password,userOfDb.password)){
                // create JWT token
                let signedToken = jwt.sign({username:userOfDb.username},process.env.SECRET_KEY,{expiresIn:"1d"})
                response.send({message:"Login Succesful",token:signedToken,user:userOfDb})
                
            }
            else{
                response.send({message:"Invalid Password"})
            }
        }
    }
))

userApp.get("/test",verifyToken,(request,response)=>{
    response.send({message:"A message from protected route"})
})

module.exports = userApp