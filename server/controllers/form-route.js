const express = require("express");
const router = express.Router();
const ApplicationForm = require("../models/Form");
const roleValidation = require("../middleware/roleValidation");

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
router.get("/applications", roleValidation, async (req, res) => {
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

// Update Application Status Route
router.put("/applications/:id", roleValidation, async (req, res) => {
    const { id } = req.params;
    const { approvalStatus, archiveStatus } = req.body;

    try {
        // Find the application form by ID and update the fields based on the request body
        const updatedForm = await ApplicationForm.findByIdAndUpdate(
            id,
            {
                $set: {
                    approvalStatus, // This will update the approvalStatus field
                    archiveStatus, // This will update the archiveStatus field
                },
            },
            { new: true } // Return the updated document
        );

        if (!updatedForm) {
            return res.status(404).json({
                message: "Application form not found",
            });
        }

        res.status(200).json({
            message: "Application form updated successfully",
            updatedForm,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update application form",
        });
    }
});

module.exports = router;
