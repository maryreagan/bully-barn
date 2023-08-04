require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { dbConnect } = require("./db");

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "127.0.0.1";

const dogController = require("./controllers/dog-route");
const formController = require("./controllers/form-route");
const authController = require("./controllers/auth");
const paymentController = require("./controllers/payment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authController);
app.use("/dog", dogController);
app.use("/form", formController);
app.use('/payment', paymentController); 



app.listen(PORT, HOST, () => {
    dbConnect();
    console.log(`[server] listening on ${HOST} ${PORT}`);
});

