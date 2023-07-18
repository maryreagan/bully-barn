const {mongoose} = require("../db")

const Dog = new mongoose.Schema(
    {
        adminInfo:{
            caseworker: {
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
            },
            intakeDate:{
                type: Date,
            },
            adoptionFee:{
                type: Number,
                required: true
            },
        },

        dogInfo:{
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
            },
            energyLevel:{
                type: String,
            },
            image: {
                type: String,
            },
        },

        behaviorInfo:{
            goodwDogs:{
                type: Boolean,
                required: true
            },
            goodwCats:{
                type: Boolean,
                required: true,
            },
            goodwKids: {
                type: Boolean, 
                required: true
            },
            crateTrained: {
                type: Boolean,
                required: true,
            },
            houseTrained: {
                type: Boolean,
                required: true
            },
            objectAggression: {
                yesOrNo:{
                    type: Boolean,
                    required: true,
                },
                description: {
                    type: String,
                    required: true
                },
            },
        },
        medicalInfo:{
            specialNeeds: {
                yesorNo:{
                    type: Boolean,
                    required: true,
                },
                description: {
                    type: String,
                    required: true
                },
            },
            medication: {
                type: String,
                required: true
            },

        },
    }
)

module.exports = mongoose.model("dog", Dog)

//dog model comment 
