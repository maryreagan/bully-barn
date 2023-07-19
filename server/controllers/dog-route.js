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
        const newDog = new Dog(req.body)
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