const User = require('../models/User')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const sessionValidation = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") next()
    if(!req.headers.authorization) {
      res.status(401).json({ message: 'Forbidden'})
      return
    }
    // Get token from header
    const token = req.headers.authorization.includes("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization

    try {
      const decoded = jwt.verify(token, JWT_KEY)
      const user = await User.findById(decoded._id)
      if (!user) {
        res.status(403).json({ message: 'Invalid token'})
        return
      } 

        req.user = user
        next()
    } catch (err) {
      res.status(403).json({ message: 'Invalid token'})
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = sessionValidation