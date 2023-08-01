const { mongoose } = require("../db");

const ApplicationFormSchema = new mongoose.Schema({
    archived: {
        type: Boolean,
        default: false,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    personalInformation: {
        fullName: {
            type: String,
            required: true,
        },
        fullAddress: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    petPreferences: {
        distanceWillingToTravel: {
            type: String,
            required: true,
        },
        dogId: {
            type: String,
            required: true,
        },
    },
    employmentInformation: {
        currentEmploymentStatus: {
            type: String,
            required: true,
        },
        employerName: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        monthlyIncome: {
            type: Number,
            required: true,
        },
    },
    homeInformation: {
        homeCondition: {
            type: String,
            required: true,
        },
        typeOfHome: {
            type: String,
            required: true,
        },
        landlordContact: {
            type: String,
        },
        monthlyRentOrMortgage: {
            type: Number,
            required: true,
        },
    },
});

module.exports = mongoose.model("applicationForm", ApplicationFormSchema);
