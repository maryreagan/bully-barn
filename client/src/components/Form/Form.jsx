import React, { useState} from "react";
import "./Form.css";
import {TextField, Button, InputAdornment} from '@mui/material'



const Form = ({ selectedDog, setShowForm }) => {
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
                setShowForm(false)

            } else {
                const errorMessage = await response.text();
                console.error("Error:", errorMessage);
                alert('Error Occured. Application Not Submitted.')
            }
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    function displayApplicationForm() {

        return (
            <form id='application-form' onSubmit = {handleSubmit}>
                <h2>Application Form for {selectedDog.name}</h2>
                <h3>Please fill out all required fields.</h3>
                <h3>Personal Information</h3>
                <TextField
                type="text"
                name="personalInformation.fullName"
                label= 'Full Name'
                value={formData.personalInformation.fullName}
                onChange={handleChange}
                required
                />

                <TextField
                type="text"
                name="personalInformation.fullAddress"
                label="Full Address"
                value={formData.personalInformation.fullAddress}
                onChange={handleChange}
                required
                />

                <TextField
                type="number"
                name="personalInformation.age"
                label="Age"
                value={formData.personalInformation.age}
                onChange={handleChange}
                required
                />

                <TextField
                type="text"
                name="personalInformation.phoneNumber"
                label="Phone Number"
                value={formData.personalInformation.phoneNumber}
                onChange={handleChange}
                required
                />

                <TextField
                type="email"
                name="personalInformation.email"
                label="Email"
                value={formData.personalInformation.email}
                onChange={handleChange}
                required
                />

                <TextField
                type="number"
                name="petPreferences.distanceWillingToTravel"
                value={formData.petPreferences.distanceWillingToTravel}
                label="Distance Willing To Travel"
                style= {{width:300}}
                InputProps={{endAdornment: <InputAdornment position='end'>miles</InputAdornment>}}
                onChange={handleChange}
                required
                />

                <h3>Employment Information</h3>
                <TextField
                type="text"
                name="employmentInformation.currentEmploymentStatus"
                label="Employment Status"
                value={formData.employmentInformation.currentEmploymentStatus}
                onChange={handleChange}
                required
                />

                <TextField
                type="text"
                name="employmentInformation.employerName"
                label="Employer Name"
                value={formData.employmentInformation.employerName}
                onChange={handleChange}
                required
                />

                <TextField
                type="text"
                name="employmentInformation.jobTitle"
                label="Job Title"
                value={formData.employmentInformation.jobTitle}
                onChange={handleChange}
                required
                />

                <TextField
                type="number"
                name="employmentInformation.monthlyIncome"
                label="Monthly Income"
                value={formData.employmentInformation.monthlyIncome}
                InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                onChange={handleChange}
                required
                />

                <h3>Home Information</h3>
                <TextField
                type="text"
                name="homeInformation.typeOfHome"
                label="Type of Home"
                value={formData.homeInformation.typeOfHome}
                onChange={handleChange}
                required
                />
                
                <TextField
                type="text"
                name="homeInformation.homeCondition"
                label='Home Condition'
                helperText='Describe your home to us. i.e. Do you have a yard? Are you near a busy road?'
                value={formData.homeInformation.homeCondition}
                onChange={handleChange}
                required
                multiline
                />

                <TextField
                type="text"
                name="homeInformation.landlordContact"
                label='LandLord Contact'
                value={formData.homeInformation.landlordContact}
                onChange={handleChange}
                />
                
                <TextField
                type="number"
                name="homeInformation.monthlyRentOrMortgage"
                label="Monthly Rent or Mortgage"
                value={formData.homeInformation.monthlyRentOrMortgage}
                InputProps={{startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                onChange={handleChange}
                required
                />

                <Button
                id='application-btn'
                type='submit'
                variant='contained'
                >Submit</Button>
            </form>

        )
    }


    return (
        <>
        {displayApplicationForm()}
        </>
    );
};

export default Form;
