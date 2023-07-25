const router = require("express").Router()
const Dog = require("../models/Dog")
const multer = require('multer')
const AWS = require('aws-sdk')


const s3 = new AWS.S3(
    {accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION}
);

const imageFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg)$/)){
        return cb(new Error('Only JPG files are allowed'), false)
    }
    cb(null, true);
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: imageFilter,
    limits: {
        fileSize: 4 * 1024 * 1024 //4MB
    },
})

//POST a new dog 
router.post("/create", upload.single('image'), async (req,res) => {
    try{
        const imageBuffer = req.file.buffer.toString("base64")
        const croppedImageBase64 = req.body.croppedImage;
        const {name, age, bio, gender, weight, energyLevel, goodwDog, goodwCat, goodwKid, crateTrained, houseTrained, objAggression, objAggressionDesc, specialNeeds, specialNeedsDesc, medication, caseworker, adoptionStatus, sponsorshipStatus, intakeType, intakeDate, adoptionFee} = req.body


        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${Date.now()} ${req.file.originalname}`,
            Body: Buffer.from(imageBuffer, "base64"),
            acl: 'public-read',
            ContentType: req.file.mimetype,
        }

        const croppedImageS3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `cropped_${Date.now()} ${req.file.originalname}`,
            Body: Buffer.from(croppedImageBase64, 'base64'),
            acl: "public-read",
            ContentType: req.file.mimetype,
        }

        const data = await s3.upload(s3Params).promise()
        const croppedImageData = await s3.upload(croppedImageS3Params).promise()

        const newDog = new Dog({
            image: data.Location,
            croppedImage: croppedImageData.Location,
            name, age, bio, gender, weight, energyLevel,
            goodwDog, goodwCat, goodwKid, crateTrained, houseTrained,
            objAggression, objAggressionDesc,
            specialNeeds, specialNeedsDesc, medication,
            caseworker, adoptionStatus, sponsorshipStatus, 
            intakeType, intakeDate, adoptionFee
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


// get all dogs from database 
router.get("/", async (req,res)=> {
    try{
        const getDogs = await Dog.find({})
        if(getDogs.length === 0) throw Error ("No Dogs Available")
        
        res.status(201).json(getDogs)

    }catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }

})

// gets one dog by ID
router.get("/:id", async(req,res)=> {
    try{
        const {id: _id} = req.params
        const findOne = await Dog.findOne({_id})

        if(!findOne) throw Error ("Dog Not Found")

        res.status(200).json(findOne)

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// edit a dog by ID
router.put("/update/:id", async(req,res)=>{
    try{
        const {id:_id} = req.params
        const editDog = req.body
    
        const updatedDog = await Dog.updateOne({_id}, {$set: editDog})
        if(updatedDog.matchedCount === 0) throw Error ("Dog Not Found")
    
        res.status(200).json({
            message: `Dog successfully updated`,
            updatedDog
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// delete a dog by ID
router.delete("/delete/:id", async(req,res)=> {
    try{
        const {id: _id} = req.params
        const deleteDog = await Dog.findByIdAndDelete({_id})
        if(!deleteDog) throw Error ("Dog Not Found")

        res.status(200).json({
            message: `Dog Deleted`, 
            deleteDog
        })

    }catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})


module.exports = router;



// want user to upload a photo that is stored in S3. S3 then sends a response which contains the URL to the photo and we use the id param to find the user in Mongo to store the URL photo 