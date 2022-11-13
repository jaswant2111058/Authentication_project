const mongoose=require("mongoose");
const bcrypt = require("bcrypt");



const logschema=new mongoose.Schema({
    email:{
        type:String,
        
    },
    password:{
        type:String,
         }
});

// hasing password

logschema.pre("save",async function(next)
{
    if(this.isModified("password"))
    {
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})


const login= new mongoose.model("login",logschema);
module.exports=login;
