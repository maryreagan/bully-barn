import React, {useState} from 'react'
import {Button} from '@mui/material'
import EditForm from './EditForm'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'


function EditDog({selectedDog}) {


return (
    <>
    <Link to={`/edit-form/${selectedDog._id}`}>
        <Button 
        variant='contained'
        startIcon={<EditIcon />}
        style={{paddingRight: '45px', paddingLeft: '45px'}}

        >Edit</Button>
    </Link>

    </>
)
}

export default EditDog