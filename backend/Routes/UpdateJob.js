

const express = require('express');
const router = express.Router();
const allJobs = require("../model/PostJob");
const UserJob= require("../model/UserJob")


router.post('/updateJob', async (req, res) => {
    try {
        const jobId = req.body.updatedJob._id; 
        // console.log("jobid",jobId)
        const updatedJobData = req.body;
        // console.log("before", updatedJobData)
        const updatedJob = await allJobs.findByIdAndUpdate(jobId, updatedJobData.updatedJob, { new: true });
        // console.log("after",updatedJob)
        

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        

        const user = await UserJob.findOne({ email: req.body.email });
        // console.log("user", user)
        if (!user) {
            return res.status(404).json({ message: 'UserJob not found' });
        }

        // Find the index of the job to update in the user's job array
        const jobIndex = user.job.findIndex(job => job._id === jobId);
        console.log("Job index in user's job array:", jobIndex);

        if (jobIndex === -1) {
            return res.status(404).json({ message: 'Job not found in UserJob' });
        }

        // Update the job object within the array
        user.job[jobIndex] = updatedJobData;
        console.log("User after updating job:", user);

        // Save the updated UserJob document
        await user.save();
        console.log("UserJob saved successfully.");

        return res.status(200).json({ updatedJob, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;