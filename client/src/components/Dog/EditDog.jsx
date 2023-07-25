import React, {useState} from 'react'
import {Button} from '@mui/material'
import EditForm from './EditForm'
import { Link } from 'react-router-dom'


function EditDog({selectedDog}) {

    const handleUpdate = (editedDog) => {
        let url = `https://127.0.0.1:4000/dog/update/${selectedDog._id}`
        fetch (url, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                // "authorization": sessionToken
            }),
            body: JSON.stringify(editedDog)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

        })
        .catch(err => {
            console.log(err)
        })
    }

    <EditForm handleUpdate={handleUpdate} />

return (
    <>
    <Link to={`/edit-form/${selectedDog._id}`}>
        <Button variant='contained'>Edit</Button>
    </Link>

    </>
)
}

export default EditDog