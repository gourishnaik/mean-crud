const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

// cors middleware will allow cors req
app.use(cors());
// parsing json req
app.use(express.json());
// to parse url encoded req
app.use(express.urlencoded({extended:true}));

// mongo db
const mongoose = require("mongoose")

//model import
const User = require("./contactmodel")
// connection
mongoose.connect("mongodb://127.0.0.1:27017/MyDatabase").then(()=>{
    console.log("mongodb connected")
}).catch(err=>{
    console.log(err)
})


// creation of user POST REQ

app.post("/CreateContact",async(req,res)=>{
    try{
         const {firstName,lastName,email,phoneNumber} = req.body;
         const user = new User({firstName,lastName,email,phoneNumber});
         await user.save();
         res.status(200).json({message:"user sucessfully created"});

    }catch(err) {
        console.error(err);
        res.status(500).json({message:"Error while creating user"});
    }

});


// get request specific user
app.get("/finduser/:id",async(req,res)=>{
    try{
        const userid = req.params.id; // to get the id

        const user = await User.findById(userid) // find by user id

        if(!user){
          return  res.status(404).json({message:"user not found"});
        }
        res.status(200).json(user);
    }catch(error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
})


// put req 
app.put("/edituserById/:id",async(req,res)=>{
    try{
   const userId = req.params.id;
   const {firstName,lastName,email,phoneNumber} = req.body;

   //update
   const user = await User.findByIdAndUpdate(userId,{firstName,lastName,email,phoneNumber},{new:true});
   if(!user){
    res.status(404).json({message:"user not found"});
   }
   res.status(200).json(user)
    }
    catch{
        res.status(500).json({message:"Internal server error"});
    }
})


// delete
 app.delete("/deleteuser/:id",async(req,res)=>{
    try{
       const userId = req.params.id;
       const user = await User.findByIdAndDelete(userId);
       if(!user){
        res.status(404).json({message:"user not found"});
       }
       res.status(200).json({message:"User deleted successfully"});
    }
    catch{
        res.status(500).json({message:"Internal server error"});
    }
 })



// get alll user
app.get("/getallusers",async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

app.listen(port,()=>{
    console.log("port running on ",`${port}`)
})