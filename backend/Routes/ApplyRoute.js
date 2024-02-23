const express = require('express');
const router = express.Router();
const applicant = require("../model/ApplyModel");

router.post("/applyforjob", async (req, res) => {
    try {
        console.log("Received data: ", req.body);

        const { secure_url } = req.body;
        const { jobid, jobtitle, jobemail, name, email, number, skills, experienceLevel, experienceinyears } = req.body.data;

        // console.log(req.body.data)
    
        

        let jobdata = await applicant.findOne({ jobid });

        if (!jobdata) {
            await applicant.create({
                jobid,
                jobtitle,
                jobemail,
                applicant: [{
                    name,
                    email,
                    number,
                    skills,
                    file: secure_url,
                    experienceLevel,
                    experienceinyears,
                }],
            });
        } else {
            await applicant.findOneAndUpdate(
                { jobid, jobtitle, jobemail },
                {
                    $push: {
                        applicant: {
                            name,
                            email,
                            number,
                            skills,
                            file: secure_url,
                            experienceLevel,
                            experienceinyears,
                        },
                    },
                }
            );
        }

        res.status(200).json({ success: true, message: 'You have applied successfully' });
    } catch (error) {
        console.log("apply for job route ", error);
        res.status(500).json({ success: false, message: 'Internal Server Error is here' });
    }
});

module.exports = router;
