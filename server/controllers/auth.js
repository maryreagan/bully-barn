const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const SALT = Number(process.env.SALT);
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const { isValidPwd, isValidEmail }  = require("../helpers/validate");
const { sendValidationEmail, sendForgotPwdEmail } = require("../helpers/sendEmail")
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

        if (!isValidEmail(email)) {
          return res.status(400).json({
            message: 'Please enter a valid email address'
          })
        }

        if (!isValidPwd(password)) {
          return res.status(400).json({
            message: 'Password must be at least 7 characters with at least one letter and one number'
          })
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

        const validationLink = "http://localhost:5173/valid-email"

        try {
          await sendValidationEmail(createdUser.email, validationLink)
        } catch (err) {
          res.status(500).json({ message: 'Error sending validation email'})
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

// Forgot-password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Please provide your email address'})
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Email not found'})
    }

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetPwdLink = `http://localhost:5173/reset-password/${resetToken}`

    user.passwordResetToken = resetToken
    user.passwordResetExpires = Date.now() + 3600000 // Expires in one hour
    await user.save()

    try {
      await sendForgotPwdEmail(user.email, resetPwdLink)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (err) {
      res.status(500).json({ message: 'Error sending password reset email'})
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error'})
  }
})

// Reset-password route
router.put('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params
    const { newPwd } = req.body
   
    if (!newPwd) {
      return res.status(400).json({ message: 'Please enter a new password'})
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() } // Check if token is not expired
    })

    if (!user) {
      return res.status(404).json({ message: 'Password reset token is invalid or has expired' })
    }

    const hashedPwd = await bcrypt.hash(newPwd, SALT)
    user.password = hashedPwd
    user.passwordResetToken = null
    user.passwordResetExpires = null
    await user.save()

    res.status(200).json({ message: 'Password reset successfully'})
  } catch (err) {
    res.status(500).json({ message: 'Internal server error'})
  }
})

module.exports = router;
