import React, { useState, useEffect } from "react"
import {
Button,
IconButton,
Menu,
MenuItem,
InputLabel,
Select,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useNavigate } from "react-router-dom"
import "./Admin-Dash.css"
import DrawerNav from "./DrawerNav"
import { adminCheck } from "../../helpers/adminCheck"

    const ApplicationsTable = () => {
        const navigate = useNavigate()
        const isAdmin = adminCheck()
        if (!isAdmin) navigate("/")
        const [applications, setApplications] = useState([])
        const [dogs, setDogs] = useState([])
        const [selectedApplication, setSelectedApplication] = useState(null)
        const [sortColumn, setSortColumn] = useState(null)
        const [sortOrder, setSortOrder] = useState(null)
        const [caseworkerName, setCaseworkerName] = useState("All")
        const [adoptionStatus, setAdoptionStatus] = useState("All")
        const [sponsorshipStatus, setSponsorshipStatus] = useState("All")
        const [caseworkerList, setCaseworkerList] = useState([])
        const [originalApplications, setOriginalApplications] = useState([])
        const [showArchived, setShowArchived] = useState(false)
        const [approvalFilter, setApprovalFilter] = useState(null)
        const [feePaidFilter, setFeePaidFilter] = useState(null)
        const token = localStorage.getItem("token")

    useEffect(() => {
    const fetchApplications = async () => {
        const response = await fetch("http://localhost:4000/form/applications", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        if (!response.ok) {
        throw new Error("Network response was not ok")
        }
        const data = await response.json()
        const filteredApplications = data.applications.filter((application) => {
        const matchesShowArchived =
            showArchived === null || application.archiveStatus === showArchived
        const matchesApprovalStatus =
            approvalFilter === null ||
            application.approvalStatus === approvalFilter
        const dog = findDogById(application.petPreferences.dogId)
        const matchesFeePaid =
            feePaidFilter === null || (dog && dog.isFeePaid === feePaidFilter)
        return matchesShowArchived && matchesApprovalStatus && matchesFeePaid
        })

        setApplications(filteredApplications)
        setOriginalApplications(data.applications)
    }

    const fetchDogs = async () => {
        const response = await fetch("http://localhost:4000/dog")
        if (!response.ok) {
        throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setDogs(data)
        const uniqueCaseworkers = [...new Set(data.map((dog) => dog.caseworker))]
        setCaseworkerList(uniqueCaseworkers)
    }

    fetchApplications()
    fetchDogs()
    }, [token, showArchived, approvalFilter, selectedApplication, feePaidFilter])

    const findDogById = (dogId) => {
    return dogs.find((dog) => dog._id === dogId)
    }

    const sortApplicationsByColumn = (column) => {
    const sorted = [...applications].sort((a, b) => {
        if (column === "name") {
        const valueA = a.personalInformation.fullName.toLowerCase()
        const valueB = b.personalInformation.fullName.toLowerCase()
        return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
        } else {
        const dogA = findDogById(a.petPreferences.dogId)
        const dogB = findDogById(b.petPreferences.dogId)

        if (!dogA || !dogB) return 0

        let valueA, valueB
        if (column === "caseWorker") {
            valueA = dogA.caseworker.toLowerCase()
            valueB = dogB.caseworker.toLowerCase()
        } else if (column === "adoptionStatus") {
            valueA = dogA.adoptionStatus.toLowerCase()
            valueB = dogB.adoptionStatus.toLowerCase()
        } else if (column === "sponsorshipStatus") {
            valueA = dogA.sponsorshipStatus ? "yes" : "no"
            valueB = dogB.sponsorshipStatus ? "yes" : "no"
        } else if (column === "dogName") {
            valueA = getDogNameById(a.petPreferences.dogId).toLowerCase()
            valueB = getDogNameById(b.petPreferences.dogId).toLowerCase()
        }

        return sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA)
        }
    })

    if (sortColumn === column) {
        if (column === "adoptionStatus") {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else if (column === "sponsorshipStatus") {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
    } else {
        setSortColumn(column)
        setSortOrder("asc")
    }

    setApplications(sorted)
    }

    const getDogNameById = (dogId) => {
    const dog = dogs.find((dog) => dog._id === dogId)
    return dog ? dog.name : "No information available"
    }

    const getSortArrow = (column) => {
    if (sortColumn === column) {
        return sortOrder === "asc" ? <span>&uarr;</span> : <span>&darr;</span>
    } else {
        return null
    }
    }

    const handleApplicationClick = (application) => {
    setSelectedApplication(application)
    console.log("Selected Dog ID:", application.petPreferences.dogId)
    console.log("APPLICATION CLICK", selectedApplication)
    }

    const resetFilters = () => {
    setCaseworkerName("All")
    setAdoptionStatus("All")
    setSponsorshipStatus("All")
    setSortColumn(null)
    setSortOrder(null)
    setApplications(originalApplications)
    }

    const handleCaseworkerFilter = (selectedCaseworker) => {
    if (selectedCaseworker === "All") {
        resetFilters()
    } else {
        setSortColumn(null)
        setSortOrder(null)

        const filteredApps = originalApplications.filter((application) => {
        const dog = findDogById(application.petPreferences.dogId)
        return (
            dog &&
            dog.caseworker
            .toLowerCase()
            .includes(selectedCaseworker.toLowerCase())
        )
        })
        setApplications(filteredApps)
        setCaseworkerName(selectedCaseworker)
    }
    }

    const handleAdoptionStatusFilter = (selectedStatus) => {
    if (selectedStatus === "All") {
        resetFilters()
    } else {
        setSortColumn(null)
        setSortOrder(null)

        const filteredApps = originalApplications.filter((application) => {
        const dog = findDogById(application.petPreferences.dogId)
        return (
            dog &&
            dog.adoptionStatus.toLowerCase() === selectedStatus.toLowerCase()
        )
        })
        setApplications(filteredApps)
        setAdoptionStatus(selectedStatus)
    }
    }

    const handleSponsorshipStatusFilter = (selectedStatus) => {
    if (selectedStatus === "All") {
        resetFilters()
    } else {
        setSortColumn(null)
        setSortOrder(null)

        const filteredApps = originalApplications.filter((application) => {
        const dog = findDogById(application.petPreferences.dogId)
        return dog && dog.sponsorshipStatus === (selectedStatus === "Yes")
        })
        setApplications(filteredApps)
        setSponsorshipStatus(selectedStatus)
    }
    }

    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
    setAnchorEl(null)
    }

    const handleApprove = (id) => {
    const application = selectedApplication

    if (application.approvalStatus) {
        // If the application is already approved, unapprove it
        fetch(`http://localhost:4000/form/unapprove/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((data) => {
            // Update the local state with the updated form
            setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app._id === data.updatedForm._id ? data.updatedForm : app
            )
            )
            setSelectedApplication(data.updatedForm)
        })
        .catch((error) => {
            console.error(error)
        })
    } else {
        // If the application is not approved, approve it
        fetch(`http://localhost:4000/form/approve/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((data) => {
            // Update the local state with the updated form
            setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app._id === data.updatedForm._id ? data.updatedForm : app
            )
            )
            setSelectedApplication(data.updatedForm)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    }

    const handleArchive = (id) => {
    const application = selectedApplication
    if (!application) {
        // If there is no selected application, do nothing or show an error message
        return
    }

    if (application.archiveStatus) {
        // If the application is already archived, unarchive it
        fetch(`http://localhost:4000/form/unarchive/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((data) => {
            // Update the local state with the updated form
            setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app._id === data.updatedForm._id ? data.updatedForm : app
            )
            )
            // Deselect the application after archiving/unarchiving
            setSelectedApplication(null)
        })
        .catch((error) => {
            console.error(error)
        })
    } else {
        // If the application is not archived, archive it
        fetch(`http://localhost:4000/form/archive/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then((data) => {
            // Update the local state with the updated form
            setApplications((prevApplications) =>
            prevApplications.map((app) =>
                app._id === data.updatedForm._id ? data.updatedForm : app
            )
            )
            // Deselect the application after archiving/unarchiving
            setSelectedApplication(null)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    }

    const handleShowArchivedChange = (event) => {
    const value = event.target.value === "archived"
    setShowArchived(value)
    }

    const handleEmailSend = async () => {
    const application = selectedApplication
    const dogID = application.petPreferences.dogId
    const formID = application._id
    const applicantName = selectedApplication.personalInformation.fullName
    const applicantEmail = selectedApplication.personalInformation.email
    const url1 = "http://127.0.0.1:4000/payment/create-checkout-session"
    const url2 = "http://127.0.0.1:4000/form/sendApprovedEmail"
    const token = localStorage.getItem("token")

    const response1 = await fetch(url1, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        dogId: dogID,
        isSponsorship: false,
      }),
    })

    const data1 = await response1.json()
    const paymentLink = data1.url

    if (
        selectedApplication &&
        formID &&
        applicantEmail &&
        applicantName &&
        paymentLink
    ) {

      const response2 = await fetch(url2, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({
            applicantEmail,
            applicantName,
            dogID,
            paymentLink,
            formID,
        }),
      })

      const data2 = await response2.json()
      console.log(data2)

      setApplications((prevApplications) =>
    prevApplications.map((app) =>
      app._id === selectedApplication._id ? data2.updatedForm : app
    )
  );
  setSelectedApplication(data2.updatedForm);

    } else {
        console.log("Information not found.")
    }
    }

    const handleApprovalStatusChange = (event) => {
    const value = event.target.value
    if (value === "approved") {
        setApprovalFilter(true)
    } else if (value === "nonApproved") {
        setApprovalFilter(false)
    } else {
        setApprovalFilter(null)
    }
    }

    const handleFeePaidChange = (event) => {
    const value = event.target.value
    if (value === "paid") {
        setFeePaidFilter(true)
    } else if (value === "notPaid") {
        setFeePaidFilter(false)
    } else {
        setFeePaidFilter(null)
    }
    }

    return (
    <div>
      <DrawerNav />
      <h2 id="applications-list">Applications List</h2>
      <IconButton onClick={handleMenuClick}>
        <FilterListIcon />
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        >
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="caseworker">Caseworker:</InputLabel>
            <Select
                id="caseworker"
                value={caseworkerName}
                onChange={(e) => {
                setCaseworkerName(e.target.value)
                handleCaseworkerFilter(e.target.value)
                }}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="All">All</MenuItem>
                {caseworkerList.map((caseworker) => (
                <MenuItem key={caseworker} value={caseworker}>
                    {caseworker}
                </MenuItem>
                ))}
            </Select>
            </div>
        </MenuItem>
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="adoptionStatus">Adoption Status:</InputLabel>
            <Select
                id="adoptionStatus"
                value={adoptionStatus}
                onChange={(e) => {
                handleAdoptionStatusFilter(e.target.value)
                }}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Adopted">Adopted</MenuItem>
            </Select>
            </div>
        </MenuItem>
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="sponsorshipStatus">
                Sponsorship Status:
            </InputLabel>
            <Select
                id="sponsorshipStatus"
                value={sponsorshipStatus}
                onChange={(e) => {
                handleSponsorshipStatusFilter(e.target.value)
                }}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
            </Select>
            </div>
        </MenuItem>
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="showArchived">Show Archived:</InputLabel>
            <Select
                id="showArchived"
                value={showArchived ? "archived" : "nonArchived"}
                onChange={handleShowArchivedChange}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="nonArchived">Non-Archived</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
            </Select>
            </div>
        </MenuItem>
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="approvalStatus">Approval Status:</InputLabel>
            <Select
                id="approvalStatus"
                value={
                approvalFilter === true
                    ? "approved"
                    : approvalFilter === false
                    ? "nonApproved"
                    : "all"
                }
                onChange={handleApprovalStatusChange}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="nonApproved">Non-Approved</MenuItem>
            </Select>
            </div>
        </MenuItem>
        <MenuItem>
            <div className="filter-option-container">
            <InputLabel htmlFor="feePaid">Fee Paid:</InputLabel>
            <Select
                id="feePaid"
                value={
                feePaidFilter === true
                    ? "paid"
                    : feePaidFilter === false
                    ? "notPaid"
                    : "all"
                }
                onChange={handleFeePaidChange}
                style={{ minWidth: "200px" }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="notPaid">Not Paid</MenuItem>
            </Select>
            </div>
        </MenuItem>
      </Menu>
      <table id="main-table">
        <thead>
            <tr>
            <th
                onClick={() => sortApplicationsByColumn("name")}
                className="header-cell"
            >
                Name {getSortArrow("name")}
            </th>
            <th
                onClick={() => sortApplicationsByColumn("caseWorker")}
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
                onClick={() => sortApplicationsByColumn("adoptionStatus")}
                className="header-cell"
            >
                Adoption Status {getSortArrow("adoptionStatus")}
            </th>
            <th
                onClick={() => sortApplicationsByColumn("sponsorshipStatus")}
                className="header-cell"
            >
                Sponsorship Status {getSortArrow("sponsorshipStatus")}
            </th>
            </tr>
        </thead>
    <tbody>
        {applications.map((application) => {
        const dog = findDogById(application.petPreferences.dogId)
        return (
            <tr
            key={application._id}
            onClick={() => handleApplicationClick(application)}
            className={
                selectedApplication === application ? "selected" : ""
            }
            style={{ cursor: "pointer" }}
            >
            <td>{application.personalInformation.fullName}</td>
            <td>{dog ? dog.caseworker : "No information available"}</td>
            <td>{getDogNameById(application.petPreferences.dogId)}</td>
            <td>{dog ? dog.adoptionStatus : "No information available"}</td>
            <td>
                {dog
                ? dog.sponsorshipStatus
                    ? "Yes"
                    : "No"
                : "No information available"}
            </td>
            </tr>
        )
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
              <table id="sub-table-1">
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>{selectedApplication.personalInformation.fullName}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>
                      {selectedApplication.personalInformation.fullAddress}
                    </td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{selectedApplication.personalInformation.age}</td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>
                      {selectedApplication.personalInformation.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{selectedApplication.personalInformation.email}</td>
                  </tr>
                  <tr>
                    <td>Distance willing to travel:</td>
                    <td>
                      {
                        selectedApplication.petPreferences
                          .distanceWillingToTravel
                      } miles
                    </td>
                  </tr>
                  <tr>
                    <td>Current Employment Status:</td>
                    <td>
                      {
                        selectedApplication.employmentInformation
                          .currentEmploymentStatus
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="details-column">
              <table id="sub-table-2">
                <tbody>
                  <tr>
                    <td>Employer Name:</td>
                    <td>
                      {selectedApplication.employmentInformation.employerName}
                    </td>
                  </tr>
                  <tr>
                    <td>Job Title:</td>
                    <td>
                      {selectedApplication.employmentInformation.jobTitle}
                    </td>
                  </tr>
                  <tr>
                    <td>Monthly Income:</td>
                    <td>
                      $ {selectedApplication.employmentInformation.monthlyIncome}
                    </td>
                  </tr>
                  <tr>
                    <td>Home Condition:</td>
                    <td>{selectedApplication.homeInformation.homeCondition}</td>
                  </tr>
                  <tr>
                    <td>Type of Home:</td>
                    <td>{selectedApplication.homeInformation.typeOfHome}</td>
                  </tr>
                  <tr>
                    <td>Landlord Contact:</td>
                    <td>
                      {selectedApplication.homeInformation.landlordContact}
                    </td>
                  </tr>
                  <tr>
                    <td>Monthly Rent/Mortgage:</td>
                    <td>
                      $ {
                        selectedApplication.homeInformation
                          .monthlyRentOrMortgage
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Buttons */}
          <div className="buttons-container">
            {/* Approve Button */}
            {selectedApplication.sentApprovedEmail ? null : (
              <>
                {selectedApplication.approvalStatus ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleApprove(selectedApplication._id)}
                  >
                    Unapprove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(selectedApplication._id)}
                  >
                    Approve
                  </Button>
                )}
                </>
            )}

        {/* Archive Button */}
        {!selectedApplication.approvalStatus &&
            (selectedApplication.archiveStatus ? (
            <Button
                variant="contained"
                color="error"
                onClick={() => handleArchive(selectedApplication._id)}
            >
                Unarchive
            </Button>
            ) : (
            <Button
                variant="contained"
                color="success"
                onClick={() => handleArchive(selectedApplication._id)}
            >
                Archive
            </Button>
            ))}

        {selectedApplication.sentApprovedEmail ? (
            <Button variant="contained" color="info">
            Approved Email Sent
            </Button>
        ) : (
            <Button
            variant="contained"
            color="success"
            onClick={() => handleEmailSend()}
            >
            Send Approved Email
            </Button>
        )}
        </div>
    </div>
    )}
</div>
)
}
export default ApplicationsTable
