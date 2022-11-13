const express= require("express");
const app = express();
app.use(express.json());
require("./connection/conn");
const login = require("./model/login");
const signup = require("./model/signup");
// const schema = require("./model/schema");


// signup

app.post("/signup",async (req,res)=>{
      
    try{
        const user = new signup(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

//login


app.post("/login",async (req,res)=>{
      
    try{
        const user = new login(req.body);
        const user_email = await signup.findOne({email:{login:email}});
        console.log(user_email);
        const user_password = await signup.findOne({email:{login:password}});
        console.log(user_password);
        
        if(!user_email){
            return res.status(404).send();
        }else{
            res.send(user_email);
        }
        if(!user_password){
            return res.status(404).send();
        }else{
            res.send(user_password);
        }
        
       
        
    }catch(e){
        res.status(400).send(e);
    }
})

//password reset


app.post("/password/reset",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

//password reset token


app.post("/password/reset/:token",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

// user nickname get


app.get("/user/nickname",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

// user nickname post


app.post("/user/nickname",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

// admin delete email


app.get("/admin/delete/:email",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})

// admin make admin email


app.get("/admin/make_admin/:email",async(req,res)=>{
      
    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})


app.get("/registration",async(req,res)=>{

    try{
        const user = new student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})
app.listen(8000, function(){
    console.log("Server is up");
})