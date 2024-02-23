const express = require ("express")
const router = express.Router();
const users = require("../model/SignUpUserModel")

const bcrypt = require('bcrypt');


router.post("/SignUp",async(req,res)=>{

    try{
        const salt = await bcrypt.genSalt(10);
        let HashedPassword = await bcrypt.hash(req.body.password, salt)
        const {
            name,
            email,
            mobileNumber,
        } = req.body;
        
        const lowercaseEmail = email.toLowerCase();
        

        await users.create({
            name,
            email:lowercaseEmail,
            mobileNumber,
            password,
        }
        )
        res.status(201).json({success:true,message:"sign up successfully"})

    }
    catch(error){
        console.log("SignUp route error",error)
        res.status(500).json({success:false,message:"SignUp route error"})
    }

})
module.exports=router;