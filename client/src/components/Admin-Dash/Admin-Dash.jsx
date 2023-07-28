import React, { useState, useEffect } from "react";
import "./Admin-Dash.css";

const ApplicationsTable = () => {
    const [applications, setApplications] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [caseworkerName, setCaseworkerName] = useState("");

    useEffect(() => {
        // Fetch applications data
        fetch("http://localhost:4000/form/applications")
            .then((response) => response.json())
            .then((data) => {
                setApplications(data.applications);
            })
            .catch((error) => {
                console.error(error);
            });

        // Fetch dogs data
        fetch("http://localhost:4000/dog")
            .then((response) => response.json())
            .then((data) => {
                setDogs(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function to find the dog object based on dogId
    const findDogById = (dogId) => {
        return dogs.find((dog) => dog._id === dogId);
    };

    // Function to sort applications by column
    const sortApplicationsByColumn = (column) => {
        const sorted = [...applications].sort((a, b) => {
            if (column === "name") {
                const valueA = a.personalInformation.fullName.toLowerCase();
                const valueB = b.personalInformation.fullName.toLowerCase();
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else {
                const dogA = findDogById(a.petPreferences.dogId);
                const dogB = findDogById(b.petPreferences.dogId);

                if (!dogA || !dogB) return 0;

                let valueA, valueB;
                if (column === "caseWorker") {
                    valueA = dogA.caseworker.toLowerCase();
                    valueB = dogB.caseworker.toLowerCase();
                } else if (column === "adoptionStatus") {
                    valueA = dogA.adoptionStatus.toLowerCase();
                    valueB = dogB.adoptionStatus.toLowerCase();
                } else if (column === "sponsorshipStatus") {
                    valueA = dogA.sponsorshipStatus ? "yes" : "no";
                    valueB = dogB.sponsorshipStatus ? "yes" : "no";
                }

                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }
        });

        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }

        setApplications(sorted);
    };

    const getSortArrow = (column) => {
        if (sortColumn === column) {
            return sortOrder === "asc" ? (
                <span>&uarr;</span>
            ) : (
                <span>&darr;</span>
            );
        } else {
            return null;
        }
    };

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
        console.log("Selected Dog ID:", application.petPreferences.dogId);
    };

    // New function to handle caseworker filter
    const handleCaseworkerFilter = () => {
        const filteredApps = applications.filter((application) => {
            const dog = findDogById(application.petPreferences.dogId);
            return (
                dog &&
                dog.caseworker
                    .toLowerCase()
                    .includes(caseworkerName.toLowerCase())
            );
        });
        setApplications(filteredApps);
    };

    return (
        <div>
            <h2>Applications List</h2>
            <div>
                <input
                    type="text"
                    value={caseworkerName}
                    onChange={(e) => setCaseworkerName(e.target.value)}
                    placeholder="Enter Caseworker Name"
                />
                <button onClick={handleCaseworkerFilter}>
                    Filter by Caseworker
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th
                            onClick={() => sortApplicationsByColumn("name")}
                            className="header-cell"
                        >
                            Name {getSortArrow("name")}
                        </th>
                        <th
                            onClick={() =>
                                sortApplicationsByColumn("caseWorker")
                            }
                            className="header-cell"
                        >
                            Case Worker {getSortArrow("caseWorker")}
                        </th>
                        <th
                            onClick={() =>
                                sortApplicationsByColumn("adoptionStatus")
                            }
                            className="header-cell"
                        >
                            Adoption Status {getSortArrow("adoptionStatus")}
                        </th>
                        <th
                            onClick={() =>
                                sortApplicationsByColumn("sponsorshipStatus")
                            }
                            className="header-cell"
                        >
                            Sponsorship Status{" "}
                            {getSortArrow("sponsorshipStatus")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => {
                        const dog = findDogById(
                            application.petPreferences.dogId
                        );
                        return (
                            <tr
                                key={application._id}
                                onClick={() =>
                                    handleApplicationClick(application)
                                }
                                className={
                                    selectedApplication === application
                                        ? "selected"
                                        : ""
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <td>
                                    {application.personalInformation.fullName}
                                </td>
                                {dog ? (
                                    <>
                                        <td>{dog.caseworker}</td>
                                        <td>{dog.adoptionStatus}</td>
                                        <td>
                                            {dog.sponsorshipStatus
                                                ? "Yes"
                                                : "No"}
                                        </td>
                                    </>
                                ) : (
                                    <td colSpan="3">
                                        No information available
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {selectedApplication && (
                <div>
                    <h2 className="selected-application-text">
                        Selected Application Details
                    </h2>
                    <div className="selected-application-details">
                        <div className="details-column">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Full Name:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .personalInformation
                                                    .fullName
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .personalInformation
                                                    .fullAddress
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Age:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .personalInformation.age
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .personalInformation
                                                    .phoneNumber
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .personalInformation.email
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Distance willing to travel:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .petPreferences
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
                                </tbody>
                            </table>
                        </div>
                        <div className="details-column">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Employer Name:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .employmentInformation
                                                    .employerName
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Job Title:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .employmentInformation
                                                    .jobTitle
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Monthly Income:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .employmentInformation
                                                    .monthlyIncome
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Home Condition:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .homeInformation
                                                    .homeCondition
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Type of Home:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .homeInformation.typeOfHome
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Landlord Contact:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .homeInformation
                                                    .landlordContact
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Monthly Rent/Mortgage:</td>
                                        <td>
                                            {
                                                selectedApplication
                                                    .homeInformation
                                                    .monthlyRentOrMortgage
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsTable;