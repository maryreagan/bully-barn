require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const { dbConnect } = require("./db")
const AWS = require("aws-sdk");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3()


const dogController = require("./controllers/dog-route")

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/dog", dogController)


app.listen(PORT, HOST, () => {
    dbConnect()
    console.log(`[server] listening on ${HOST} ${PORT}`)
})


// comment for develop branch 
// comment from Angelina's branch
// comment for amanda branch

