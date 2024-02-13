const mongoose = require('mongoose')


const {Schema} = mongoose;

const PostJobSchema= new Schema({
    email:{
        type:String
    }
    ,
    companyName:{
        type: String,
        required: true,
    },
    jobTitle:{
        type:String,
        required:true
    },
    minPrice:{
        type:Number,
        required:true
    },
    maxPrice:{
        type:Number,
        required:true
    },
    salaryType:{
        type:String,
        required:true
    },
    jobLocation:{
        type:String,
        required:true
    },
    postingDate:{
        type:String,
        required:true
    },
    experienceLevel:{
        type:String,
        required:true
    },
    employmentType:{
        type:String,
        required:true
    },
    companyLogo:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("allJobs" ,PostJobSchema )
