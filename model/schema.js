const mongoose=require("mongoose");

const stdschema=new mongoose.Schema({
    name:{
        type:String,
    },
    student_number:{
        type:String,
        unique:[true,"Student number already exist"],  
    },
    student_Roll:{
        type:Number,
        unique:[true,"Student roll no. already exist"],
         },
    branch:{
        type:String
    },
    city:{
        type:String
    },
    cgpa:{
        type:Number,
        min:1,
        max:10
    }
});
const std= new mongoose.model("student",stdschema);
module.exports=std;