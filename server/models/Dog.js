const {mongoose} = require("../db")

const Dog = new mongoose.Schema(
    {
            name:{
                type: String,
                required: true,
            },
            age: {
                type: Number,
            },
            bio: {
                type: String,
                required: true,
            },
            gender: {
                type: String,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            energyLevel:{
                type: String,
                required: true,
            },
            goodwDog:{
                type: Boolean,
                required: true,
            },
            goodwCat:{
                type: Boolean,
                required: true,
            },
            goodwKid:{
                type: Boolean,
                required: true,
            },
            crateTrained:{
                type: Boolean,
                required: true,
            },
            houseTrained:{
                type: Boolean,
                required: true,
            },
            objAggression:{
                type: Boolean,
                required: true,
            },
            objAggressionDesc:{
                type: String,
                required: false,
            },
            specialNeeds:{
                type: Boolean,
                required: true,
            },
            specialNeedsDesc:{
                type: String,
                required: false,
            },
            medication:{
                type: String,
                required: false,
            },
            caseworker:{
                type: String,
                required: true,
            },
            adoptionStatus:{
                type: String,
                required: true,
            },
            sponsorshipStatus:{
                type: Boolean,
                required: true,
            },
            intakeType:{
                type: String,
                required: true,
            },
            intakeDate:{
                type: Date,
                required: true,
            },
            adoptionFee:{
                type: Number,
                required: true,
            },
            image: {
                type: String,
            },
            croppedImage:{
                type: String,
            },
            multipleImages:{
                type: [String],
            },
            isFeePaid: {
                type: Boolean,
                default: false,
            }
        },
)

module.exports = mongoose.model("dog", Dog)


