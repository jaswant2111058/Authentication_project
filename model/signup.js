const mongoose=require("mongoose");
const bcrypt = require("bcrypt");


const signschema=new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"email is already used"]
    },
    nickname:{
        type:String,
    },
    
    password:{

        type:String,
        },
    role:{
        type:String,
        enum:["user","admin"],
        default: "user"
    }
});

signschema.pre("save",async function (next)
{
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})


const signup= new mongoose.model("signup",signschema);
module.exports=signup;


// hashing password


// signschema.pre("save",async (next)=>
// {
//     if(this.isModified("password"))
//     {
//         this.password = bcrypt.hash(this.password,12);
//     }
//     next();
// })