import React, {useState, useEffect, useRef} from 'react';
import DeleteDog from './DeleteDog';
import EditDog from './EditDog';
import { useLocation, useNavigate } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Form from "../Form/Form";
import './DisplayOne.css'
import { adminCheck } from '../../helpers/adminCheck'
import { Paper, Button } from '@mui/material'
import { scrollToTop } from '../../helpers/scrollToTop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { MdLens } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md"
import FeedIcon from '@mui/icons-material/Feed'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';



function DisplayOne() {
    const location = useLocation();
    const selectedDog = location.state;
    const navigate = useNavigate();
    const isAdmin = adminCheck()
    const [showForm, setShowForm] = useState(false)
    const token = localStorage.getItem('token')
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const formWrapperRef = useRef(null)

    const handleBackToAllDogs = () => {
        selectedDog.adoptionStatus === 'adopted'
        ? navigate('/adopted-dogs')
        : navigate('/');
        setShowForm(false)
    };

    const handleDonateClick = async () => {
        try {
            const payload = `{"fee": ${selectedDog.adoptionFee}, "dogId": "${selectedDog._id}"}`;
            const response = await fetch('http://localhost:4000/payment/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity',
                },
                body: payload,
            });
            const session = await response.json();
            window.location = session.url; // Redirect to the Stripe checkout page
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    const handleSponsorPayment = async () => {
        try {
            const payload = `{"fee": ${selectedDog.adoptionFee}, "dogId": "${selectedDog._id}", "isSponsorship": true}`;
            const response = await fetch('http://localhost:4000/payment/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'identity',
                },
                body: payload,
            });
            const session = await response.json();
            window.location = session.url;
        } catch (error) {
            console.error('Error initiating sponsorship payment:', error);
        }
    };

    const handleSponsorClick = () => {
        handleSponsorPayment();
    };

    const renderGenderIcon = (gender) => {
        return gender === "Female" ? <FemaleIcon /> : <MaleIcon />;
    };

    const handleApplyHere = () => {
        setShowForm(true) // show form when Apply Here button is clicked
        console.log('show form' , showForm)
    }

    useEffect(() => {
        console.log("formWrapperRef.current:", formWrapperRef.current)
        if(formWrapperRef.current){
            formWrapperRef.current.scrollIntoView({behavior:'smooth'})
        }
    }, [showForm])

    const renderSponsorButton = () => {
        if (!selectedDog.isFeePaid && !selectedDog.sponsorshipStatus) {
            return (
                <button onClick={handleSponsorClick}>
                    <VolunteerActivismIcon id='donate-icon' />
                    Sponsor
                </button>
            );
        }
        return null;
    };

    const renderDogDetails = () => {
        if (selectedDog) {
            return (
                <div id='one-dog-container'>
                {scrollToTop()}
                    <div id='button-container'>
                        <Button
                            variant='outlined'
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBackToAllDogs}
                        >Back</Button>
                    </div>

                    <div id='all-details-wrapper'>

                        <div className="admin-box">
                            {isAdmin && <Paper elevation={6} style={{ backgroundColor: 'rgb(217, 216, 216)' }} className='edit-delete-paper'>
                                <h4 id='admin-text'>For Administrative Use Only</h4>
                                {isAdmin && <DeleteDog selectedDog={selectedDog} />}
                                {isAdmin && <EditDog selectedDog={selectedDog} />}
                            </Paper>}
                        </div>

                        <div id='dog-details-container'
                            style={{
                                boxShadow:
                                    selectedDog.sponsorshipStatus === true
                                        ? '0 0 10px 5px rgba(52, 213, 213, 0.774)' // Sponsored
                                        : selectedDog.adoptionStatus === 'pending'
                                            ? '0 0 10px 5px rgba(0, 0, 187, 0.253)' //Pending   
                                            : '0 0 10px 5px rgba(0, 0, 255, 0.41)', // Default blue glow for available
                            }}>
                            
                            <div id='img-dog-container'>
                            
                            {selectedDog.multipleImages && selectedDog.multipleImages.length > 0 && (
                                    <Button className='scroll-btn' onClick={handlePreviousImage} disabled={currentImageIndex === 0} variant ='text' startIcon={<NavigateBeforeIcon />} style={{paddingTop: '4em'}}>
                                    Previous
                                    </Button>
                                )}
                                
                                {currentImageIndex === 0 ? (
                                    <img src={selectedDog.image} alt={selectedDog.name} />
                                ):(
                                    <img src={selectedDog.multipleImages[currentImageIndex - 1]} alt={`Dog ${currentImageIndex}`} />
                                )}
                                
                            {selectedDog.multipleImages && selectedDog.multipleImages.length > 0 && (
                                <Button className='scroll-btn' onClick={handleNextImage} disabled={currentImageIndex === selectedDog.multipleImages.length} variant='text'  endIcon={<NavigateNextIcon />} style={{paddingTop: '4em'}}>
                                Next
                                </Button>
                            )}
                            </div>
                            
                            <p id='adoption-status'>{selectedDog.adoptionStatus === "available" 
                            ? <MdLens id="status-available-icon"/> : <MdOutlinePending id="status-pending-icon"/>}{selectedDog.adoptionStatus}</p>

                            <div id='dog-details'>
                                <h1>{selectedDog.name}</h1>
                                <section id='basic-info'>
                                    <p>Age {selectedDog.age}</p>
                                    <div id='dog-gender'>
                                        {renderGenderIcon(selectedDog.gender)}
                                        <p>{selectedDog.gender}</p>
                                    </div>
                                    <p>Weight {selectedDog.weight}</p>
                                </section>
                                <section id='additional-info'>
                                    <div id='bio'>
                                        <h2>Bio</h2>
                                        <p>{selectedDog.bio}</p>
                                    </div>
                                    <hr />

                                    <div>
                                        <div className="sub-additional-info">
                                            <p><span className="span-style">{selectedDog.goodwDog ? <CheckIcon className="yes-icon" /> : <CloseIcon className="no-icon" />}</span>Good with other dogs</p>
                                            <p><span className="span-style">{selectedDog.goodwCat ? <CheckIcon className="yes-icon" /> : <CloseIcon className="no-icon" />}</span>Good with cats</p>
                                            <p><span className="span-style">{selectedDog.goodwKid ? <CheckIcon className="yes-icon" /> : <CloseIcon className="no-icon" />}</span>Good with children</p>
                                            <div className="sub-additional-info">
                                                <h4>Energy Level <span className="span-style">{selectedDog.energyLevel}</span></h4>
                                                <h4>Crate Trained <span className="span-style">{selectedDog.crateTrained ? 'yes' : 'No'}</span></h4>
                                                <h4>House Trained <span className="span-style">{selectedDog.houseTrained ? 'yes' : 'No'}</span></h4>
                                                <h4>Reactivity to Objects <span className="span-style">{selectedDog.objAggression ? 'yes' : 'No'}</span></h4>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h2>More info about me</h2>
                                    <div>
                                        <h4>Special Needs<span className="span-style">{selectedDog.specialNeeds !== "" ? "-" : selectedDog.specialNeedsDesc}</span></h4>
                                        <h4>Medication <span className="span-style">{selectedDog.medication !== "" ? "-" : selectedDog.medication}</span></h4>
                                        <h4>Intake Type <span className="span-style">{selectedDog.intakeType}</span></h4>
                                        <h4>Intake Date <span className="span-style">{selectedDog.intakeDate}</span></h4>
                                    </div>

                                </section>
                            </div>
                        </div>
                        <div id='side-box'>
                            <div id='adoption-fee'>
                                <div id="display-fee-amount">
                                    <h4>Adoption Fee: ${selectedDog.adoptionFee}</h4>
                                </div>
                                {selectedDog.isFeePaid && (
                                    <p id='fee-status'>Adoption Fee Paid</p>
                                )}
                            </div>
                            <div id='payments'>
                                {!selectedDog.isFeePaid && !selectedDog.sponsorshipStatus && (
                                    <>
                                        <button onClick={handleDonateClick}>Adoption Fee</button>
                                        {renderSponsorButton()}
                                    </>
                                )}
                            </div>

                            <div className='apply-here-container'>
                                {selectedDog.adoptionStatus != 'adopted' &&
                                <Paper elevation={6} style={{backgroundColor: 'rgb(159, 211, 199)'}} className='apply-paper'>
                                    <p id='ready-to-apply'>Ready to Apply?</p>
                                    {!token && <p id='login-text'>Login or Register to Access Application</p> }
                                    {token &&
                                        <Button
                                        variant="contained"
                                        startIcon={<FeedIcon />}
                                        style={{backgroundColor:'rgb(62,132,116)', width: '75%'}}
                                        onClick={()=> {
                                            handleApplyHere();
                                        }}
                                        >Apply Here</Button>
                                    }
                                </Paper>
                                }
                            </div>
                        
                        </div>
                    </div>
                </div>

            );
        }
        return null;
    };


    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex - 1);
    };
    
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
        console.log('showform', showForm)
    })

    return (
        <>
            <div className='display-form-container'>
                <div className="top-bar"></div>
                {renderDogDetails()}
            {showForm && (
                <div ref={formWrapperRef}>
                    <Form selectedDog={selectedDog} showForm={showForm} setShowForm={setShowForm} />
                </div>
            )}
            </div>
        </>
    );
}

export default DisplayOne;
