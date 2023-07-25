import React, {useState} from 'react'
import './AddDog.css'
import ImageCropper from './ImageCropper'
import getCroppedImg from './getCroppedImg'
import {TextField, MenuItem, InputAdornment, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button} from '@mui/material'


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
    const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
        const croppedImageBlob = await getCroppedImg(dogData.image, croppedAreaPixels);
        const reader = new FileReader();
        reader.readAsDataURL(croppedImageBlob);
        reader.onloadend = () => {
            //const croppedImageBase64 = reader.result;
            //console.log('Cropped Image Base64:', croppedImageBase64); // Add this console log to check the cropped image data
            setDogData((prevDogData) => ({
            ...prevDogData,
            croppedImage: reader.result,
            }));
        };
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
        formData.append('croppedImage', dogData.croppedImage)


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

        const genderOptions = [
            {value: 'Male', label: 'Male'},
            {value: 'Female', label: 'Female'}
        ]

        const energyOptions= [
            {value: 'Low', label: 'Low'},
            {value: 'Medium', label: 'Medium'},
            {value: 'High', label: 'High'}
        ]

        const trueFalseOptions= [
            {value: 'true', label: 'Yes'},
            {value: 'false', label: 'No'}
            
        ]

        const adoptionOptions = [
            {value: 'available', label: "Available For Adoption"},
            {value:'pending', label:'Pending Adoption'},
            {value:'adopted', label:'Adopted'}
        ]

        const sponsorshipOptions = [
            {value:'true', label:'Sponsored'},
            {value:'false', label:'Not Sponsored'}
        ]

        return (
            <form id="add-dog-form" onSubmit={handleSubmit}>
            
            <h3 className='form-header'>Please Enter All Necessary Information</h3>
            <h4 className='form-header'> Note: once the form is submitted the dog will be added to the site for adoption</h4>

            <h4 className='form-header'>GENERAL DETAILS</h4>
            <TextField
                className='form-input'
                type="text"
                name ='name'
                label="Name"
                size="small"
                required
                value={dogData.name}
                onChange={handleChange}
            />

            <TextField
                className='form-input'
                type="number"
                name = 'age'
                label="Age"
                size='small'
                required
                value={dogData.age}
                onChange={handleChange}
            />
            
            <TextField
                className='form-input'
                type="text"
                name='bio'
                label="Bio"
                style={{width:600}}
                required
                multiline
                size='large'
                value={dogData.bio}
                onChange={handleChange}
            />

            <TextField
                select
                className='form-input'
                label="Gender"
                name='gender'
                style={{width:223}}
                size='small'
                required
                value={dogData.gender}
                onChange={handleChange}
                >
                {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>              

            <TextField
                className='form-input'
                name="weight"
                label="Weight"
                size='small'
                required
                style={{width:223}}
                value={dogData.weight}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">lbs</InputAdornment>
                }}
            />

            <TextField
                select
                className='form-input'
                type="text"
                name="energyLevel"
                label="Energy Level"
                value={dogData.energyLevel}
                onChange={handleChange}
                style={{width:223}}
                size='small'
                required
                >
                {energyOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <h4 className='form-header'>BEHAVIOR TRAITS</h4>
            <FormControl component='fieldset'>
                <FormLabel>Good with other Dogs?*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="goodwDog"
                    value={dogData.goodwDog}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <FormControl component='fieldset'>
                <FormLabel>Good with Cats?*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="goodwCat"
                    value={dogData.goodwCat}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <FormControl component='fieldset'>
                <FormLabel>Good with Kids?*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="goodwKid"
                    value={dogData.goodwKid}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <FormControl component='fieldset'>
                <FormLabel>Crate Trained?*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="crateTrained"
                    value={dogData.crateTrained}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <FormControl component='fieldset'>
                <FormLabel>House Trained?*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="houseTrained"
                    value={dogData.houseTrained}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <FormControl component='fieldset'>
                <FormLabel>Object Aggression*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="objAggression"
                    value={dogData.objAggression}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <TextField
                className='form-input'
                type="text"
                name='objAggressionDesc'
                label="Object Aggression.."
                multiline
                helperText='Does the dog have object aggression? If yes, please explain.'
                size='small'
                value={dogData.objAggressionDesc}
                onChange={handleChange}
            />

        <FormControl component='fieldset'>
                <FormLabel>Special Needs*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="specialNeeds"
                    value={dogData.specialNeeds}
                    onChange={handleChange}
                >
                {trueFalseOptions.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
                </RadioGroup>
            </FormControl>

            <TextField
                className='form-input'
                type="text"
                name='specialNeedsDesc'
                label="Special Needs.."
                multiline
                helperText='Does the dog have special needs? If yes, please explain.'
                size='small'
                value={dogData.specialNeedsDesc}
                style={{width:375}}
                onChange={handleChange}
            />

            <TextField
                className='form-input'
                type="text"
                name='medication'
                label="Medication"
                multiline
                helperText='List all relevant medication dog is taking or will need to take.'
                size='small'
                value={dogData.medication}
                onChange={handleChange}
            />

            <h4 className='form-header'>ADMINISTRATIVE</h4>
            <TextField
                className='form-input'
                type="text"
                name='caseworker'
                label="Caseworker Name"
                size='small'
                value={dogData.caseworker}
                required
                onChange={handleChange}
            />

            <TextField
                select
                className='form-input'
                label="Adoption Status"
                name='adoptionStatus'
                style={{width:223}}
                size='small'
                required
                value={dogData.adoptionStatus}
                onChange={handleChange}
                >
                {adoptionOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                className='form-input'
                label="Sponsorship Status"
                name='sponsorshipStatus'
                style={{width:223}}
                size='small'
                required
                value={dogData.sponsorshipStatus}
                onChange={handleChange}
                >
                {sponsorshipOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                className='form-input'
                type="text"
                name='intakeType'
                label="Intake Type"
                size='small'
                value={dogData.intakeType}
                required
                onChange={handleChange}
            />  

            <TextField
                className='form-input'
                type="date"
                name='intakeDate'
                value={dogData.intakeDate}
                required
                helperText="Intake Date"
                onChange={handleChange}
            />

            <TextField
                className='form-input'
                name="adoptionFee"
                label="Adoption Fee"
                size='small'
                required
                style={{width:223}}
                value={dogData.adoptionFee}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
            />

            <TextField
                className='form-input'
                id='image-input'
                type="file"
                name="image"
                helperText='Image Upload'
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

        <Button 
            id="add-dog-btn"
            type="submit"
            variant='contained'
            >Submit</Button>
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
