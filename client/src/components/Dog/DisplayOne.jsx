import React from 'react'
import DeleteDog from './DeleteDog';
import EditDog from './EditDog';
import { useLocation, useNavigate } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Form from "../Form/Form";
import './DisplayOne.css'
import { adminCheck } from '../../helpers/adminCheck'

function DisplayOne() {
    const location = useLocation();
    const selectedDog = location.state
    const navigate = useNavigate();
    const isAdmin = adminCheck()

    const handleBackToAllDogs = () => {
        navigate('/')
    }

    const handleDonateClick = async () => {
        try {
            const response = await fetch('http://localhost:4000/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fee: selectedDog.adoptionFee }), // Send the selected dog's adoption fee to the backend
            });
            const session = await response.json();
            window.location = session.url; // Redirect to the Stripe checkout page
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    const renderGenderIcon = (gender) => {
        return gender === "Female" ? <FemaleIcon /> : <MaleIcon />
    }

    const renderDogDetails = () => {
        if (selectedDog) {
            return (
                <div id='one-dog-container'>

                    <div id='button-container'>
                        <button onClick={handleBackToAllDogs} id='back-to-all-dogs-btn'>Back</button>
                    </div>

                    <div id='all-details-wrapper'>

                        <div id='dog-details-container'>
                            <div id='img-dog-container'>
                                <img src={selectedDog.image} alt={selectedDog.name} />
                            </div>
                            <p id='adoption-status'>Available{selectedDog.adoptionSatus}</p>

                            <div id='dog-details'>
                                <h1>{selectedDog.name}</h1>
                                <section id='basic-info'>
                                    <p>Age {selectedDog.age}</p>
                                    <div id='dog-gender'>
                                        {renderGenderIcon(selectedDog.gender)}
                                        <p>{selectedDog.gender}</p>
                                    </div>
                                </section>
                                <section id='additional-info'>
                                    <p>Bio: <span>{selectedDog.bio}</span></p>
                                    <div>
                                        <h4>Energy Level</h4>
                                        <p><span>{selectedDog.energyLevel}</span></p>
                                        <h4>Family-Friendly Traits</h4>
                                        <p>Other dogs: <span>{selectedDog.goodwDog ? 'yes' : '-'}</span></p>
                                        <p>Cats: <span>{selectedDog.goodwCat ? 'yes' : '-'}</span></p>
                                        <p>Children: <span>{selectedDog.goodwKid ? 'yes' : '-'}</span></p>
                                    </div>
                                    <div>
                                        <h4>Training and Behavior</h4>
                                        <p>Crate Trained: <span>{selectedDog.crateTrained ? 'yes' : 'No'}</span></p>
                                        <p>House Trained: <span>{selectedDog.houseTrained ? 'yes' : 'No'}</span></p>
                                        <p>Reactivity to Objects: <span>{selectedDog.objAggression ? 'yes' : 'No'}</span></p>
                                    </div>
                                    <div>
                                        <h4>Special Needs</h4>
                                        <p><span>{selectedDog.specialNeeds}</span></p>
                                        <p><span>{selectedDog.specialNeedsDesc}</span></p>
                                        <h4>Medication:</h4>
                                        <p><span>{selectedDog.medication}</span></p>
                                    </div>
                                    <h4>Adoption Fee <span>{selectedDog.adoptionFee}</span></h4>
                                </section>
                            </div>
                        </div>
                        <div id='payments'>
                            <button onClick={handleDonateClick} >Adoption Fee</button>
                            <button onClick={handleDonateClick} ><VolunteerActivismIcon id='donate-icon' />Sponsor</button>
                        </div>

                    </div>

                </div>

            );
        }
        return null;
    };

    return (
        <>
            
            {renderDogDetails()}
            {isAdmin && <DeleteDog selectedDog={selectedDog} />}
            {isAdmin && <EditDog selectedDog={selectedDog} />}
            <Form selectedDog={selectedDog}/>
        </>



    )
}

export default DisplayOne