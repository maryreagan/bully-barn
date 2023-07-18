const {mongoose} = require("../db")

const Dog = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        age: {
            type: Number,
        },
        kids: {
            type: Boolean, 
            required: true
        },
        image: {
            type: String,
        },
    }
)

module.exports = mongoose.model("dog", Dog)