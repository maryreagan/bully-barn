import React, {useState} from 'react'
import './AddDog.css'
import ImageCropper from './ImageCropper'
import getCroppedImg from './getCroppedImg'


function AddDog() {
    const [dogData, setDogData] = useState({
        name: '',
        age: '',
        bio: '',
        gender: '',
        weight: '',
        energyLevel: '',
        goodwDog: '',
        goodwCat: '',
        goodwKid: '',
        crateTrained: '',
        houseTrained: '',
        objAggression: '',
        objAggressionDesc: '',
        specialNeeds: '',
        specialNeedsDesc: '',
        medication: '',
        caseworker: '',
        adoptionStatus: '',
        sponsorshipStatus: '',
        intakeType: '',
        intakeDate: '',
        adoptionFee: '',
        image: null,
        croppedImage: null,
    })

    // define states for handling image cropping
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);

    // Function to update the crop state when the user modifies the crop area
    const onCropChange = (crop) => {
        setCrop(crop);
    };

    // function updates zoom state when user modifies zoom levels
    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    // function handles changes to form fields and updates dogData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDogData((prevDogData) => ({
            ...prevDogData,
            [name]: value,
        }));
        };

    // handles the image upload and updates dogData
    const handleImageChange = (e) => {
        setDogData({
            ...dogData,
            image: e.target.files[0],
        });
    };

    // Function to handle the completion of image cropping and set the croppedImage state
    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        // This function is triggered when the user finishes cropping the image
        //  use the 'getCroppedImg' function to get the cropped image
        const croppedImagePromise = getCroppedImg(dogData.image, croppedAreaPixels);
        croppedImagePromise.then((croppedImage) => {
            setCroppedImage(croppedImage);
            setDogData((prevDogData) => ({
            ...prevDogData,
            croppedImage: croppedImage,           
            }));
        });
        };


    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = 'http://127.0.0.1:4000/dog/create'

        const formData = new FormData();
        formData.append('name', dogData.name);
        formData.append('age', dogData.age);
        formData.append('bio', dogData.bio);
        formData.append('gender', dogData.gender);
        formData.append('weight', dogData.weight);
        formData.append('energyLevel', dogData.energyLevel)
        formData.append('goodwDog', dogData.goodwDog)
        formData.append('goodwCat', dogData.goodwCat)
        formData.append('goodwKid', dogData.goodwKid)
        formData.append('crateTrained', dogData.crateTrained)
        formData.append('houseTrained', dogData.houseTrained)
        formData.append('objAggression', dogData.objAggression)
        formData.append('objAggressionDesc', dogData.objAggressionDesc)
        formData.append('specialNeeds', dogData.specialNeeds)
        formData.append('specialNeedsDesc', dogData.specialNeedsDesc)
        formData.append('medication', dogData.medication)
        formData.append('caseworker', dogData.caseworker)
        formData.append('adoptionStatus', dogData.adoptionStatus)
        formData.append('sponsorshipStatus', dogData.sponsorshipStatus)
        formData.append('intakeType', dogData.intakeType)
        formData.append('intakeDate', dogData.intakeDate)
        formData.append('adoptionFee', dogData.adoptionFee)
        formData.append('image', dogData.image);



        try{
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if(!response.ok){
                alert("Error Occured. Dog not added to database")
            } else {
                alert('Dog Addedd Successfully')}
        } catch (err) {
            console.log(err)
        }
    }
    
    function renderFormInputs() {

        return (
            <form id="add-dog-form" onSubmit={handleSubmit}>
            
            <h4>Dog Information</h4>
            <input
                className='form-input'
                type="text"
                name = 'name'
                placeholder="Name"
                value={dogData.name}
                onChange={handleChange}
            />

            <input
                className='form-input'
                type="number"
                name = 'age'
                placeholder="Age"
                value={dogData.age}
                onChange={handleChange}
            />
            
            <input
                className='form-input'
                type="text"
                name='bio'
                placeholder="Bio"
                value={dogData.bio}
                onChange={handleChange}
            />

            <input
                className='form-input'
                type="text"
                placeholder="Gender"
                name='gender'
                value={dogData.gender}
                onChange={handleChange}
            />              

            <input
                className='form-input'
                type="number"
                name="weight"
                placeholder="Weight"
                value={dogData.weight}
                onChange={handleChange}
            />

            <input
                className='form-input'
                type="text"
                name="energyLevel"
                placeholder="Energy Level"
                value={dogData.energyLevel}
                onChange={handleChange}
            />

            <select
                className='form-dropdown'
                name="goodwDog"
                value={dogData.goodwDog}
                onChange={handleChange}>
                <option value="">Good with Dogs</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <select
                className='form-dropdown'
                name="goodwCat"
                value={dogData.goodwCat}
                onChange={handleChange}>
                <option value="">Good with Cats</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <select
                className='form-dropdown'
                name="goodwKid"
                value={dogData.goodwKid}
                onChange={handleChange}>
                <option value="">Good with Kids</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <select
                className='form-dropdown'
                name="crateTrained"
                value={dogData.crateTrained}
                onChange={handleChange}>
                <option value="">Crate Trained</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <select
                className='form-dropdown'
                name="houseTrained"
                value={dogData.houseTrained}
                onChange={handleChange}>
                <option value="">House Trained</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <h5>Does the dog have object aggression? If yes, please explain.</h5>
            <select
                className='form-dropdown'
                name="objAggression"
                value={dogData.objAggression}
                onChange={handleChange}>
                <option value="">Object Aggression</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <input
                className='form-input'
                type="text"
                name="objAggressionDesc"
                placeholder="Object Aggression..."
                value={dogData.objAggressionDesc}
                onChange={handleChange}
            />

        <h5>Does the dog have special needs? If yes, please explain.</h5>
            <select
                className='form-dropdown'
                name="specialNeeds"
                value={dogData.specialNeeds}
                onChange={handleChange}>
                <option value="">Special Needs</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>

            <input
                className='form-input'
                type="text"
                name="specialNeedsDesc"
                placeholder="Special Needs..."
                value={dogData.specialNeedsDesc}
                onChange={handleChange}
            />

            <input
                className='form-input'
                type="text"
                name="medication"
                placeholder="Medication"
                value={dogData.medication}
                onChange={handleChange}
            />  

            <input
                className='form-input'
                type="text"
                name="caseworker"
                placeholder="Caseworker Name"
                value={dogData.caseworker}
                onChange={handleChange}
            />  

            <select
                className='form-dropdown'
                name="adoptionStatus"
                value={dogData.adoptionStatus}
                onChange={handleChange}>
                <option value="">Adoption Status</option>
                <option value="available">Available For Adoption</option>
                <option value="pending">Pending Adoption</option>
                <option value="adopted">Adopted</option>
            </select>

            <select
                className='form-dropdown'
                name="sponsorshipStatus"
                value={dogData.sponsorshipStatus}
                onChange={handleChange}>
                <option value="">Sponsorship Status</option>
                <option value="true">Sponsored</option>
                <option value="false">Not Sponsored</option>
            </select>

            <input
                className='form-input'
                type="text"
                name="intakeType"
                placeholder="Intake Type"
                value={dogData.intakeType}
                onChange={handleChange}
            />  

            <h5>Intake Date:</h5>
            <input
                className='form-input'
                type="date"
                name="intakeDate"
                value={dogData.intakeDate}
                onChange={handleChange}
            />

            <input
                className='form-input'
                type="number"
                name="adoptionFee"
                placeholder= 'Adoption Fee'
                value={dogData.adoptionFee}
                onChange={handleChange}
            />  

            <input
                className='form-input'
                type="file"
                name="image"
                onChange={handleImageChange}
            />

        {dogData.image && (
            <ImageCropper
                image={dogData.image}
                crop={crop}
                zoom={zoom}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={handleCropComplete}
            />
            )}

        <button 
            id="add-dog-btn"
            type="submit"
            >Submit</button>
        </form>
        )
        
    }


    return (
    <>
    {renderFormInputs()}

    </>

    )
    }

export default AddDog;
