import React, { useState, useEffect } from "react";
import "./Admin-Dash.css";
import DrawerNav from "./DrawerNav";

const ApplicationsTable = () => {
    const [applications, setApplications] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [caseworkerName, setCaseworkerName] = useState("");
    const [adoptionStatus, setAdoptionStatus] = useState("All");
    const [sponsorshipStatus, setSponsorshipStatus] = useState("All");
    const [caseworkerList, setCaseworkerList] = useState([]);
    const [originalApplications, setOriginalApplications] = useState([]);
    const [originalAdoptionStatus, setOriginalAdoptionStatus] = useState([]);
    const [originalSponsorshipStatus, setOriginalSponsorshipStatus] = useState(
        []
    );
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch applications data
        fetch("http://localhost:4000/form/applications", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setApplications(data.applications);
                setOriginalApplications(data.applications); // Save the original data
                setOriginalAdoptionStatus(data.applications); // Save the original data for adoption status
                setOriginalSponsorshipStatus(data.applications); // Save the original data for sponsorship status
            })
            .catch((error) => {
                console.error(error);
            });

        // Fetch dogs data
        fetch("http://localhost:4000/dog")
            .then((response) => response.json())
            .then((data) => {
                setDogs(data);
                // Extracting unique caseworker names from the dogs state
                const uniqueCaseworkers = [
                    ...new Set(data.map((dog) => dog.caseworker)),
                ];
                setCaseworkerList(uniqueCaseworkers);
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
                } else if (column === "dogName") {
                    valueA = getDogNameById(
                        a.petPreferences.dogId
                    ).toLowerCase();
                    valueB = getDogNameById(
                        b.petPreferences.dogId
                    ).toLowerCase();
                }

                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }
        });

        if (sortColumn === column) {
            if (column === "adoptionStatus") {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else if (column === "sponsorshipStatus") {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            }
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }

        setApplications(sorted);
    };

    // New function to get the dog name by dogId
    const getDogNameById = (dogId) => {
        const dog = dogs.find((dog) => dog._id === dogId);
        return dog ? dog.name : "No information available";
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

    const handleCaseworkerFilter = (selectedCaseworker) => {
        // Check if a caseworker is selected or not
        if (!selectedCaseworker) {
            // Clear the filter and sorting
            setCaseworkerName("");
            setSortColumn(null);
            setSortOrder(null);
            // Reset the applications list to its original state
            setApplications(originalApplications); // Reset to the original unfiltered data
        } else {
            // Reset the sorting when a new caseworker is selected
            setSortColumn(null);
            setSortOrder(null);

            // Filter applications based on selected caseworker from the original data
            const filteredApps = originalApplications.filter((application) => {
                const dog = findDogById(application.petPreferences.dogId);
                return (
                    dog &&
                    dog.caseworker
                        .toLowerCase()
                        .includes(selectedCaseworker.toLowerCase())
                );
            });
            setApplications(filteredApps);
        }
    };

    const handleAdoptionStatusFilter = (selectedStatus) => {
        // Check if adoptionStatus is selected or not
        if (!selectedStatus || selectedStatus === "All") {
            // Clear the filter and sorting
            setAdoptionStatus("All");
            setSortColumn(null);
            setSortOrder(null);
            // Reset the applications list to its original state
            setApplications(originalAdoptionStatus);
        } else {
            // Reset the sorting when a new adoptionStatus is selected
            setSortColumn(null);
            setSortOrder(null);

            // Filter applications based on selected adoptionStatus from the original data
            const filteredApps = originalAdoptionStatus.filter(
                (application) => {
                    const dog = findDogById(application.petPreferences.dogId);
                    return (
                        dog &&
                        dog.adoptionStatus.toLowerCase() ===
                            selectedStatus.toLowerCase()
                    );
                }
            );
            setApplications(filteredApps);
            setAdoptionStatus(selectedStatus);
        }
    };

    const handleSponsorshipStatusFilter = (selectedStatus) => {
        // Check if sponsorshipStatus is selected or not
        if (selectedStatus === "All") {
            // Clear the filter and sorting
            setSponsorshipStatus("All");
            setSortColumn(null);
            setSortOrder(null);
            // Reset the applications list to its original state
            setApplications(originalSponsorshipStatus);
        } else {
            // Convert the selected status to a boolean value
            const statusFilter = selectedStatus === "Yes";

            // Reset the sorting when a new sponsorshipStatus is selected
            setSortColumn(null);
            setSortOrder(null);

            // Filter applications based on selected sponsorshipStatus from the original data
            const filteredApps = originalSponsorshipStatus.filter(
                (application) => {
                    const dog = findDogById(application.petPreferences.dogId);
                    return dog && dog.sponsorshipStatus === statusFilter;
                }
            );

            setApplications(filteredApps);
            setSponsorshipStatus(selectedStatus);
        }
    };

    return (
        <div>
            <DrawerNav />
            <h2>Applications List</h2>
            {/* Caseworker Filter */}
            <div>
                <label htmlFor="caseworker">Select Caseworker:</label>
                <select
                    id="caseworker"
                    value={caseworkerName}
                    onChange={(e) => {
                        // Update the caseworker name state
                        setCaseworkerName(e.target.value);
                        // Call the filter function with the selected caseworker
                        handleCaseworkerFilter(e.target.value);
                    }}
                >
                    <option value="">All</option>
                    {caseworkerList.map((caseworker) => (
                        <option key={caseworker} value={caseworker}>
                            {caseworker}
                        </option>
                    ))}
                </select>
            </div>
            {/* Adoption Status Filter */}
            <div>
                <label htmlFor="adoptionStatus">Select Adoption Status:</label>
                <select
                    id="adoptionStatus"
                    value={adoptionStatus}
                    onChange={(e) => {
                        handleAdoptionStatusFilter(e.target.value); // Call the filter function immediately after the selection changes
                    }}
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Adopted">Adopted</option>
                </select>
            </div>
            {/* Sponsorship Status Filter */}
            <div>
                <label htmlFor="sponsorshipStatus">
                    Select Sponsorship Status:
                </label>
                <select
                    id="sponsorshipStatus"
                    value={sponsorshipStatus}
                    onChange={(e) => {
                        handleSponsorshipStatusFilter(e.target.value); // Call the filter function immediately after the selection changes
                    }}
                >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
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
                            onClick={() => sortApplicationsByColumn("dogName")}
                            className="header-cell"
                        >
                            Dog Name {getSortArrow("dogName")}
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
                                <td>
                                    {dog
                                        ? dog.caseworker
                                        : "No information available"}
                                </td>
                                <td>
                                    {getDogNameById(
                                        application.petPreferences.dogId
                                    )}
                                </td>
                                <td>
                                    {dog
                                        ? dog.adoptionStatus
                                        : "No information available"}
                                </td>
                                <td>
                                    {dog
                                        ? dog.sponsorshipStatus
                                            ? "Yes"
                                            : "No"
                                        : "No information available"}
                                </td>
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
