const mongoose= require('mongoose')
const {Schema} = mongoose;


const UserJob = new Schema({
    email:{
        type:String,
        default:true
    },
    job:{
        type:Array,
        default:true
    }
})

module.exports=mongoose.model("UserJobs",UserJob)
