const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../middleware/cloudnary');

router.post('/createPost',upload.any(), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files[0].path, { resource_type: "raw" });
        const data=req.body;
        // console.log("multer",result)
        
        
        await fetch('https://zobs-major-project.onrender.com/applyforjob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secure_url: result.secure_url, data:data })
        });

        res.status(200).json({ success: true, message: 'multer send the data' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'multer error' });
    }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer =require('multer')
// const upload=multer({dest:'uploads/'});
// const cloudinary=require('../middleware/cloudnary')

// router.post('/createPost',upload.single("file"),async (req,res)=>{
//     try{
//         console.log(req)
//         const result=await cloudinary.uploader.upload(req.file.path)
//         console.log(result.secure_url)
//         res.json({message:'success'})
//     }
//     catch(err){
//         console.log(err)
//     }
// })

// module.exports=router
