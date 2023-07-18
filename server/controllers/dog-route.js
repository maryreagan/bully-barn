const router = require("express").Router()
const Dog = require("../models/Dog")
const AWS = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3");

    // AWS S3 Configuration 
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    const s3 = new AWS.S3();


    // Multer middleware tohandle file uploads 
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: "public-read",
        key: function (req, file, cb) {
        cb(null, Date.now().toString() + "-" + file.originalname);
        },
    }),
});


//POST a new dog 
router.post("/create", upload.single("image"), async (req,res) => {
    try{
        let {name, age, kids} = req.body
        const imageURL = req.file.location; // AWS S3 image URL
        const newDog = new Dog(req.body, {image: imageURL})
        await newDog.save()

        res.status(201).json({
            message: `New Dog Added`,
            newDog
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;