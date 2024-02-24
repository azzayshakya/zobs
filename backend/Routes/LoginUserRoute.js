const express = require('express');
const router = express.Router();
const users = require('../model/SignUpUserModel');
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")
const jwtSecret = "mynameisajayshakyaIamFrommyownw"

router.post('/LogIn', async (req, res) => {
    try {
        const { email, password } = req.body;

        try {
           
            const user = await users.findOne({ email });

            if (!user) {
                return res.status(500).json({ success: false, message: 'User not found' });
            }
            const passwordMatch = bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(500).json({ success: false, message: 'Password does not match' });
            }
        
            const jwtdata={
                    id:user.id   
            }           
            const authToken= jwt.sign(jwtdata,jwtSecret);

            
            return res.status(201).json({ success: true, message: 'Login successfully',authToken:authToken });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error(error);
        return res.status(501).json({ success: false, message: 'Request processing failed' });
    }
});

module.exports = router;