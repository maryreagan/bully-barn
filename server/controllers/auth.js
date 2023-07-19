const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// Register route
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "Please provide all the required information",
            });
        }

        const hashedPwd = await bcrypt.hash(password, SALT);
        const createdUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPwd,
            isAdmin: false,
        });

        const validationError = createdUser.validateSync();

        if (validationError) {
            return res.status(400).json({ message: validationError.message });
        }

        await createdUser.save();

        const token = jwt.sign({ _id: createdUser._id }, JWT_KEY, {
            expiresIn: 60 * 60 * 24,
        });

        res.status(201).json({
            message: "User registered successfully",
            fullName: `${createdUser.firstName} ${createdUser.lastName}`,
            email: createdUser.email,
            token: token,
        });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide your email and password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign({ _id: user._id }, JWT_KEY, {
            expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
            message: "Login successful",
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: token,
        });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

module.exports = router;
