const express = require('express');
const router= express.Router();
const alljobs = require("../model/PostJob")

router.post("/alljobs", async (req, res) => {
    try {
        const data = await alljobs.find();   
        res.status(200).json({ success: true, data });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
module.exports = router;
