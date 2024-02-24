const express = require("express");
const router = express.Router();
const allJobs = require("../model/PostJob");

router.post("/MyCreatedJobs", async (req, res) => {
    try {
        const email = req.body.email;
    
        const postedJobs = await allJobs.find({ email }).sort({ _id: -1 });

        if (postedJobs.length > 0) {
            
            
            res.status(200).json({postedJobs});

        } else {
            console.log("No posted jobs found for this user");
            res.status(404).json({ message: "No posted jobs found for this user" });
        }
    } catch (error) {
        console.error("Error in MyCreatedJobs route:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
