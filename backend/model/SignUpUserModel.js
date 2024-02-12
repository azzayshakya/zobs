const mongoose = require('mongoose');

const {Schema} = mongoose;

const SignUpUserSchema=new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String ,
        require:true
    }
})
module.exports=mongoose.model("users",SignUpUserSchema)