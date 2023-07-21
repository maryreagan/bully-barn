import React, { useState, useEffect } from "react";
import "./Admin-Dash.css";

const ApplicationsTable = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/form/applications")
            .then((response) => response.json())
            .then((data) => {
                setApplications(data.applications);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
    };

    return (
        <div>
            <h2>Applications List</h2>
            <ul>
                {applications.map((application) => (
                    <li
                        key={application._id}
                        onClick={() => handleApplicationClick(application)}
                        style={{ cursor: "pointer" }}
                    >
                        {application.personalInformation.fullName}
                    </li>
                ))}
            </ul>
            {selectedApplication && (
                <div>
                    <h2>Selected Application Details</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Full Name:</td>
                                <td>
                                    {
                                        selectedApplication.personalInformation
                                            .fullName
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>
                                    {
                                        selectedApplication.personalInformation
                                            .fullAddress
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>
                                    {
                                        selectedApplication.personalInformation
                                            .age
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>
                                    {
                                        selectedApplication.personalInformation
                                            .phoneNumber
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>
                                    {
                                        selectedApplication.personalInformation
                                            .email
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Distance willing to travel:</td>
                                <td>
                                    {
                                        selectedApplication.petPreferences
                                            .distanceWillingToTravel
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Current Employment Status:</td>
                                <td>
                                    {
                                        selectedApplication
                                            .employmentInformation
                                            .currentEmploymentStatus
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Employer Name:</td>
                                <td>
                                    {
                                        selectedApplication
                                            .employmentInformation.employerName
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Job Title:</td>
                                <td>
                                    {
                                        selectedApplication
                                            .employmentInformation.jobTitle
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Monthly Income:</td>
                                <td>
                                    {
                                        selectedApplication
                                            .employmentInformation.monthlyIncome
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Home Condition:</td>
                                <td>
                                    {
                                        selectedApplication.homeInformation
                                            .homeCondition
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Type of Home:</td>
                                <td>
                                    {
                                        selectedApplication.homeInformation
                                            .typeOfHome
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Landlord Contact:</td>
                                <td>
                                    {
                                        selectedApplication.homeInformation
                                            .landlordContact
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Monthly Rent/Mortgage:</td>
                                <td>
                                    {
                                        selectedApplication.homeInformation
                                            .monthlyRentOrMortgage
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicationsTable;
