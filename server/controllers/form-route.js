const express = require("express");
const router = express.Router();
const ApplicationForm = require("../models/Form");

// Submit Application Route
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

// Fetch All Applications Route
router.get("/applications", async (req, res) => {
    try {
        const applications = await ApplicationForm.find();
        res.status(200).json({
            message: "Fetched all applications",
            applications,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch applications",
        });
    }
});

module.exports = router;
