import React, {useState} from 'react'
import {Button} from '@mui/material'
import EditForm from './EditForm'
import { Link } from 'react-router-dom'


function EditDog({selectedDog}) {


return (
    <>
    <Link to={`/edit-form/${selectedDog._id}`}>
        <Button variant='contained'>Edit</Button>
    </Link>

    </>
)
}

export default EditDog