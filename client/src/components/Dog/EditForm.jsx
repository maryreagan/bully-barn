import React, {useState, useEffect}  from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import './EditForm.css'
import {TextField, MenuItem, InputAdornment, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Button} from '@mui/material'



function EditForm({selectedDog, handleUpdate}) {

    const navigate = useNavigate();

    const {dogId} = useParams();
    const [editedDog, setEditedDog] = useState({
        adoptionStatus: 'available',
        energyLevel: 'Low',
        
    })

    useEffect(() => {
        let url = `http://127.0.0.1:4000/dog/${dogId}`

        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
        }),
    })
        .then(res => res.json())
        .then(data => {
            setEditedDog(data)
        })
        .catch(err => {
            console.log(err)
        })
    },[dogId])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedDog((prevDog)=> ({...prevDog, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let url = `http://127.0.0.1:4000/dog/update/${dogId}`
        const token = localStorage.getItem('token')
        fetch (url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(editedDog)
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === 'Dog successfully updated'){
                alert('Dog Updated Successfully!')
            } else {
                alert("Error Occured. Dog Not Updated.")
            }
            navigate('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

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
        <>
        <form id='edit-dog-form' onSubmit={handleSubmit}>
        <TextField
            className='form-input'
            helperText="Name"
            name="name"
            value={editedDog.name}
            onChange={handleChange}
            required
            />

            <TextField
                className='form-input'
                type="number"
                name = 'age'
                helperText="Age"
                size='small'
                required
                value={editedDog.age}
                onChange={handleChange}
            />
            
            <TextField
                className='form-input'
                type="text"
                name='bio'
                helperText="Bio"
                style={{width:600}}
                required
                multiline
                size='large'
                value={editedDog.bio}
                onChange={handleChange}
            />

            <TextField
                select
                className='form-input'
                helperText="Gender"
                name='gender'
                style={{width:223}}
                size='small'
                required
                value={editedDog.gender === 'Female' ? 'Female' : 'Male'}
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
                helperText="Weight"
                size='small'
                required
                style={{width:223}}
                value={editedDog.weight}
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
                helperText="Energy Level"
                value={editedDog.energyLevel}
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
                    value={editedDog.goodwDog ? 'true' : 'false'}
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
                    value={editedDog.goodwCat ? 'true' : 'false'}
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
                    value={editedDog.goodwKid ? 'true' : 'false'}
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
                    value={editedDog.crateTrained ? 'true' : 'false'}
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
                    value={editedDog.houseTrained ? 'true' : 'false'}
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
                    value={editedDog.objAggression ? 'true' : 'false'}
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
                multiline
                helperText='Does the dog have object aggression? If yes, please explain.'
                size='small'
                value={editedDog.objAggressionDesc}
                onChange={handleChange}
            />

        <FormControl component='fieldset'>
                <FormLabel>Special Needs*</FormLabel>
                <RadioGroup
                    row
                    required
                    className='form-dropdown'
                    name="specialNeeds"
                    value={editedDog.specialNeeds ? 'true' : 'false'}
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
                multiline
                helperText='Does the dog have special needs? If yes, please explain.'
                size='small'
                value={editedDog.specialNeedsDesc}
                style={{width:375}}
                onChange={handleChange}
            />

            <TextField
                className='form-input'
                type="text"
                name='medication'
                multiline
                helperText='List all relevant medication dog is taking or will need to take.'
                size='small'
                value={editedDog.medication}
                onChange={handleChange}
            />

            <h4 className='form-header'>ADMINISTRATIVE</h4>
            <TextField
                className='form-input'
                type="text"
                name='caseworker'
                helperText="Caseworker Name"
                size='small'
                value={editedDog.caseworker}
                required
                onChange={handleChange}
            />

            <TextField
                select
                className='form-input'
                helperText="Adoption Status"
                name='adoptionStatus'
                style={{width:223}}
                size='small'
                required
                value={editedDog.adoptionStatus}
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
                helperText="Sponsorship Status"
                name='sponsorshipStatus'
                style={{width:223}}
                size='small'
                required
                value={editedDog.sponsorshipStatus === 'Sponsored' ? 'true' : 'false' }
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
                helperText="Intake Type"
                size='small'
                value={editedDog.intakeType}
                required
                onChange={handleChange}
            />  

            <TextField
                className='form-input'
                name="adoptionFee"
                helperText="Adoption Fee"
                size='small'
                required
                style={{width:223}}
                value={editedDog.adoptionFee}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
            />

            <Button type="submit" variant="contained">
            Update
            </Button>

        </form>
        </>
    )
}


export default EditForm