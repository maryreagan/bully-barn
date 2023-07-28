const User = require('../models/User')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const roleValidation = async (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization.includes("Bearer")
  ? req.headers.authorization.split(" ")[1]
  : req.headers.authorization
 
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decodedToken = jwt.verify(token, JWT_KEY)

    if (decodedToken.isAdmin === true) {
      req.isAdmin = true
    } else {
      return res.status(403).json({ message: 'Forbidden' })
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = roleValidation