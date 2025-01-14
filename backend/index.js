const express = require('express');
//mongo
const {connectMongoDb} = require('./connection')
const app = express();
const port = 8080;
const cors = require('cors');

// cors middleware will allow cors req
app.use(cors());
// parsing json req
app.use(express.json());
// to parse url encoded req
app.use(express.urlencoded({extended:true}));


 // start mongo
 connectMongoDb("mongodb://127.0.0.1:27017/MyDatabase").then(()=>{
    console.log("Mongodb connected")
 })


// router import
const userRouter = require('./routes/user')




//routes
 app.use("/",userRouter)

//  app.use("/api/user",userRouter) if path is like that it will go to this file


app.listen(port,()=>{
    console.log("port running on ",`${port}`)
})