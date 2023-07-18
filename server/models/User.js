const { mongoose } = require('../db')

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Ensures the password is at least 7 characters long + contains at least 1 letter & 1 number
        return /^(?=.*[A-Za-z])(?=.*\d).{7,}$/.test(value)
      },
      // Error message if validation fails
      message: 'Password must be at least 7 characters with at least one letter and one number'
    }
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model("user", User)