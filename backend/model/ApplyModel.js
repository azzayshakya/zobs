const mongoose= require('mongoose')
const {Schema} = mongoose;


const UserJob = new Schema({
    jobid:{
        type:String,
        // default:true
    },
    jobtitle:{
        type:String,
        // default:true
    },
    jobemail:{
        type:String,
        // default:true
    },

    applicant:{
        type:Array,
        // default:true
    },
    link:{
        type:String
    }
})

module.exports=mongoose.model("applied jobs",UserJob)