const express = require('express');
const router = express.Router();
const applicant = require("../model/ApplyModel");
const multer = require('multer');
const cloudinary = require("../middleware/cloudnary");
const upload = require("../middleware/multer")

const storage = multer.memoryStorage();
const multerUpload = multer({ storage: storage });

router.post("/applyforjob", multerUpload.single("file"), async (req, res) => {
    console.log("heyyy boii", req.body)
    try {
        console.log("body    ", req.body);
        console.log("file    ", req.file);

        const result = await cloudinary.uploader.upload(req.file.buffer); 
        const { jobid, jobtitle, jobemail, name, email, number, skills, experienceLevel, experienceinyears } = req.body;
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
                    file: result.secure_url,
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
                            file: result.secure_url,
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
