const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const SALT = Number(process.env.SALT)
const jwt = require("jsonwebtoken")
const JWT_KEY = process.env.JWT_KEY

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all the required information'})
    }

    const hashedPwd = await bcrypt.hash(password, SALT)
    const createdUser = new User({ firstName, lastName, email, password: hashedPwd, isAdmin: false })

    const validationError = createdUser.validateSync()

    if (validationError) { // Validates schema values
      return res.status(400).json({ message: validationError.message })
    }

    await createdUser.save()

    const token = jwt.sign(
      { _id: createdUser._id },
      JWT_KEY,
      { expiresIn: 60 * 60 * 24 }
    )

    res.status(201).json({
      message: 'User registered successfully',
      fullName: `${createdUser.firstName} ${createdUser.lastName}`,
      email: createdUser.email,
      token: token
    })

  } catch (err) {
    res.status(500).json({ message: `${err}`})
  }
})

module.exports = router