import React, { useState, useEffect } from 'react'
import { adminCheck } from '../../helpers/adminCheck'
import { useNavigate } from 'react-router-dom'
import './dog.css'
import DrawerNav from '../Admin-Dash/DrawerNav'

function AdoptedDogs() {
  const [adoptedDogs, setAdoptedDogs ] = useState([])
  const [selectedDog, setSelectedDog] = useState([])
  const navigate = useNavigate()
  const isAdmin = adminCheck()
  if (!isAdmin) navigate('/')

  useEffect(() => {
    const getAdoptedDogs = async () => {
      const url = "http://127.0.0.1:4000/dog/adopted-dogs"
      const token = localStorage.getItem('token')
      
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        })
      });

      const data = await response.json();
      console.log(data);
      setAdoptedDogs(data);
    };

    getAdoptedDogs();
  }, []);

  const getOneDog = (dog) => {
    setSelectedDog(dog)
    navigate('/display-one', {state: dog})
  }

  const displayAdopted = () => {
    return (
      adoptedDogs && adoptedDogs.map((dog) => (
        <div className='dog-container' key={dog._id} >
        <div className='dog-card adopted-card' onClick={() => {getOneDog(dog)}}>
        <div className='head-adopted-card'>ADOPTED</div>
        <div className='img-container'>
          <img src={dog.image} alt={dog.name} />
        </div>
        <div className='dog-details'>
          <h2>{dog.name}</h2>
          <p>
            <span>{dog.gender}</span>
            Age: {dog.age}
          </p>
        </div>
      </div>
      </div>
      ))
    );
  }

  return (
    <>
    <DrawerNav />
    <h1 className='adopted-header'>Adopted Dogs</h1>
    {displayAdopted()}
    </>
  )
}

export default AdoptedDogs