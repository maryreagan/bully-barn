const { mongoose } = require("../db");

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    passwordResetToken: {
        type: String, 
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("users", User);