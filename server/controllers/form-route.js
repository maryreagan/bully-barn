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

// Archive Application Route
router.put("/archive/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const existingForm = await ApplicationForm.findById(id);

        if (!existingForm) {
            return res.status(404).json({
                message: "Application form not found",
            });
        }

        existingForm.archiveStatus = true;

        const updatedForm = await existingForm.save();

        res.status(200).json({
            message: "Application form archived",
            updatedForm,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to archive the application form",
        });
    }
});

// Unarchive Application Route
router.put("/unarchive/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const existingForm = await ApplicationForm.findById(id);

        if (!existingForm) {
            return res.status(404).json({
                message: "Application form not found",
            });
        }

        existingForm.archiveStatus = false;

        const updatedForm = await existingForm.save();

        res.status(200).json({
            message: "Application form unarchived",
            updatedForm,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to unarchive the application form",
        });
    }
});

// Approve Application Route
router.put("/approve/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the existing application form by ID
        const existingForm = await ApplicationForm.findById(id);

        if (!existingForm) {
            return res.status(404).json({
                message: "Application form not found",
            });
        }

        // Update the approvalStatus field to true
        existingForm.approvalStatus = true;

        // Save the updated form
        const updatedForm = await existingForm.save();

        res.status(200).json({
            message: "Application form approved",
            updatedForm,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to approve the application form",
        });
    }
});

// Unapprove Application Route
router.put("/unapprove/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the existing application form by ID
        const existingForm = await ApplicationForm.findById(id);

        if (!existingForm) {
            return res.status(404).json({
                message: "Application form not found",
            });
        }

        // Update the approvalStatus field to false
        existingForm.approvalStatus = false;

        // Save the updated form
        const updatedForm = await existingForm.save();

        res.status(200).json({
            message: "Application form unapproved",
            updatedForm,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to unapprove the application form",
        });
    }
});

module.exports = router;
