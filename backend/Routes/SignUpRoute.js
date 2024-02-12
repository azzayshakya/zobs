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
        

        await users.create({
            name,
            email,
            mobileNumber,
            password: HashedPassword,
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