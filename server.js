const exp = require('express')
const app = exp()
require('dotenv').config()

const port=process.env.PORT||4000

app.listen(port||4000,()=>console.log("server started on port 4000"))

// Connect React with Express
const path = require('path')
app.use(exp.static(path.join(__dirname,"./build")))


// get mongo client
const mclient = require('mongodb').MongoClient
// console.log(mclient)

//connect to MongoDB server
mclient.connect('mongodb://127.0.0.1:27017/firstdb')
.then(dbRef=>{
    //get database obj
    let dbObj = dbRef.db('firstdb')
    let usersCollection = dbObj.collection("userscollection")
    let productsCollection = dbObj.collection("productscollection")
    
    //share collection objs to API
    app.set("usersCollection",usersCollection)
    app.set("productsCollection",productsCollection)
    console.log("Data base conn succesful")
})
.catch(err=>console.log("An error is occured",err))

// importing apis
const usersApp = require("./APIs/usersApi")
const productsApp = require("./APIs/productsApi")
const { request } = require('http')

// forwarding requests to apis
app.use('/users-api',usersApp)
// app.use('/products-api',productsApp)


// middleware for page refresh 
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,"./build/index.html"))
}
app.use("*",pageRefresh)

const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:"Invalid url check again!"})
    console.log("invalid paths handled")
    next()
}

app.use(invalidPathMiddleware)

const errorHandlingMiddleware=(error,request,response,next)=>{
    response.send({"error-message":error.message})
    console.log("errors handled here")
    next()
}

app.use(errorHandlingMiddleware)