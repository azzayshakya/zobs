const express = require("express");
const router = express.Router();
const applicants = require("../model/ApplyModel");

router.post("/applicants", async (req, res) => {
    console.log("applicants")
    try {
    
        const { email } = req.body;
        const applicantData = await applicants.find({ jobemail: email });
        console.log("i love yoy" ,applicantData)
        
        if (applicantData) {
        
            res.status(200).json({ success: true, message: "Applicant data found", data: applicantData });
        } else {
            
            res.status(200).json({ success: true, message: "No applicant data found", data: null });
        }
    } catch (error) {
       
        console.error("Error fetching applicant data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
