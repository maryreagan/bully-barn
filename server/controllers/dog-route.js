const router = require("express").Router()
const Dog = require("../models/Dog")
const AWS = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3");

    const s3 = new AWS.S3()

    // AWS S3 Configuration 
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });


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
router.post("/create", async (req,res) => {
    try{
        let {name, age, kids, image} = req.body
        const newDog = new Dog({
            name,
            age,
            kids,
            image,
        })
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



// want user to upload a photo that is stored in S3. S3 then sends a response which contains the URL to the photo and we use the id param to find the user in Mongo to store the URL photo 