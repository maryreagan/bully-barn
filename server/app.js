require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnect } = require("./db");
const AWS = require("aws-sdk");

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const dogController = require("./controllers/dog-route");
const formController = require("./controllers/form-route");
const authController = require("./controllers/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/dog", dogController);
app.use("/form", formController);
app.use("/auth", authController);

app.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST} ${PORT}`);
});
