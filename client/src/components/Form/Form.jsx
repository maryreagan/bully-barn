import React, { useState } from "react";
import "./Form.css";

const Form = ({ selectedDog }) => {
    const dogId = selectedDog._id
    const [formData, setFormData] = useState({
        personalInformation: {
            fullName: "",
            fullAddress: "",
            age: "",
            phoneNumber: "",
            email: "",
        },
        petPreferences: {
            distanceWillingToTravel: "",
            dogId: dogId,
        },
        employmentInformation: {
            currentEmploymentStatus: "",
            employerName: "",
            jobTitle: "",
            monthlyIncome: "",
        },
        homeInformation: {
            homeCondition: "",
            typeOfHome: "",
            landlordContact: "",
            monthlyRentOrMortgage: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split(".");

        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: {
                ...prevFormData[field],
                [subField]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/form/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                alert('Application Submitted Succesfully!')
                setFormData({
                    personalInformation: {
                        fullName: "",
                        fullAddress: "",
                        age: "",
                        phoneNumber: "",
                        email: "",
                    },
                    petPreferences: {
                        distanceWillingToTravel: "",
                    },
                    employmentInformation: {
                        currentEmploymentStatus: "",
                        employerName: "",
                        jobTitle: "",
                        monthlyIncome: "",
                    },
                    homeInformation: {
                        homeCondition: "",
                        typeOfHome: "",
                        landlordContact: "",
                        monthlyRentOrMortgage: "",
                    },
                });
            } else {
                const errorMessage = await response.text();
                console.error("Error:", errorMessage);
                alert('Error Occured. Application Not Submitted.')
            }
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return (
        <div className="application-form-container">
            <h2>Application Form</h2>
            <form onSubmit={handleSubmit}>
                <h3>Personal Information</h3>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="personalInformation.fullName"
                        value={formData.personalInformation.fullName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Full Address:
                    <input
                        type="text"
                        name="personalInformation.fullAddress"
                        value={formData.personalInformation.fullAddress}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Age:
                    <input
                        type="number"
                        name="personalInformation.age"
                        value={formData.personalInformation.age}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="personalInformation.phoneNumber"
                        value={formData.personalInformation.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="personalInformation.email"
                        value={formData.personalInformation.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <h3>Pet Preferences</h3>
                <label>
                    Distance Willing to Travel:
                    <input
                        type="text"
                        name="petPreferences.distanceWillingToTravel"
                        value={formData.petPreferences.distanceWillingToTravel}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <h3>Employment Information</h3>
                <label>
                    Current Employment Status:
                    <input
                        type="text"
                        name="employmentInformation.currentEmploymentStatus"
                        value={
                            formData.employmentInformation
                                .currentEmploymentStatus
                        }
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Employer Name:
                    <input
                        type="text"
                        name="employmentInformation.employerName"
                        value={formData.employmentInformation.employerName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="employmentInformation.jobTitle"
                        value={formData.employmentInformation.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Monthly Income:
                    <input
                        type="number"
                        name="employmentInformation.monthlyIncome"
                        value={formData.employmentInformation.monthlyIncome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <h3>Home Information</h3>
                <label>
                    Home Condition:
                    <input
                        type="text"
                        name="homeInformation.homeCondition"
                        value={formData.homeInformation.homeCondition}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Type of Home:
                    <input
                        type="text"
                        name="homeInformation.typeOfHome"
                        value={formData.homeInformation.typeOfHome}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Landlord Contact:
                    <input
                        type="text"
                        name="homeInformation.landlordContact"
                        value={formData.homeInformation.landlordContact}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Monthly Rent or Mortgage:
                    <input
                        type="number"
                        name="homeInformation.monthlyRentOrMortgage"
                        value={formData.homeInformation.monthlyRentOrMortgage}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default Form;
