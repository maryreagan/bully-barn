import React, { useState, useEffect } from 'react'
import './dog.css'

function Dog() {
  const [dogs, setDogs ] = useState([])

  useEffect(() => { // Getting all the dog data
    const getDogs =  async () => {
      const url = "http://127.0.0.1:4000/dog/"
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
      
      const data = await response.json()
      console.log(data)
      setDogs(data)
    }

    getDogs()
  }, [])

  const displayDogs = () => {
    return (
      dogs && dogs.map((dog) => (
        <div id='dog-card' key={dog._id}>
          <div id='img-container'>
          <img src={dog.image}/>
          </div> 
          <div id='dog-details'>
          <h2>{dog.name}</h2>
          <p>
            <span>{dog.gender}</span>
             Age: {dog.age}
          </p>
          </div> 
        </div>
      ))
    )
  }

  return (
    <>
    <div id='contain-home'>
    <h1 id='welcome-msg'>Meet Our Dogs</h1>
    <div id='dog-container'>
    {displayDogs()}
    </div>
    </div>
    </>
  )
}

export default Dog