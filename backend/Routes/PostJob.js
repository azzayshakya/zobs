const express = require('express');
const router = express.Router();
const allJobs =require("../model/PostJob")
const UserJob= require("../model/UserJob")
router.post('/PostJob', async (req, res) => {
  try {
    const {
      email,
      companyName,
      jobTitle,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      companyLogo,
      description,
    } = req.body;

    await allJobs.create({
      email,
      companyName,
      jobTitle,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      companyLogo,
      description,
    });

    
    let userJob = await UserJob.findOne({ email });
    if (!userJob) {
      await UserJob.create({
        email,
        job: [{
          companyName,
          jobTitle,
          minPrice,
          maxPrice,
          salaryType,
          jobLocation,
          postingDate,
          experienceLevel,
          employmentType,
          companyLogo,
          description,
        }],
      });
    } else {
      await UserJob.findOneAndUpdate(
        { email },
        {
          $push: {
            job: {
              companyName,
              jobTitle,
              minPrice,
              maxPrice,
              salaryType,
              jobLocation,
              postingDate,
              experienceLevel,
              employmentType,
              companyLogo,
              description,
            },
          },
        }
      );
    }

    res.status(200).json({ success: true, message: 'Job posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


module.exports = router;