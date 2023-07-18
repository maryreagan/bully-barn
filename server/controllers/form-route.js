const express = require("express");
const router = express.Router();
const ApplicationForm = require("../models/Form");

router.post("/create", async (req, res) => {
    try {
        const newApplicationForm = new ApplicationForm(req.body);
        await newApplicationForm.save();
        res.status(201).json({
            message: `Application form created`,
            newApplicationForm,
        });
    } catch (err) {
        console.error(err);
        if (err.name === "ValidationError") {
            res.status(400).json({
                message: `Provided data type invalid`,
            });
        } else {
            res.status(500).json({
                message: `${err}`,
            });
        }
    }
});

module.exports = router;
