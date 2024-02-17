const express = require('express');
const router = express.Router();
const applicant = require("../model/ApplyModel");
const multer = require('multer');
const cloudinary = require("../middleware/cloudnary");
const upload = require("../middleware/multer")

// Multer configuration
// const upload = multer({
//     limits: {
//         fileSize: 10 * 1024 * 1024, // Set a 10MB file size limit (adjust as needed)
//     },
// });

router.post("/applyforjob", upload.single("file"), async (req, res) => {
    console.log("heyyy boii")
    try {
        console.log("body    ",req.body);

        const result = await cloudinary.uploader.upload(req.body.formData.file.webkitRelativePath);

        const { jobid, jobtitle, jobemail, formData } = req.body;
        const { name, email, number, file, skills, experienceLevel, experienceinyears } = formData;

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

        res.status(200).json({ success: true, message: 'you have applied successfully' });
    } catch (error) {
        console.log( "apply for job route ", error);
        res.status(500).json({ success: false, message: 'Internal Server Error is here' });
    }
});

module.exports = router;
