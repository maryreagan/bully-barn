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

  return (
    <>
    <div id='container'>
    <h1>Welcome to Bully Barn</h1>
    <div id='dog-container'>
    {dogs && dogs.map((dog) => (
      <div id='dog-card' key={dog._id}>
        <h2>{dog.dogInfo.name}</h2>
        <p>
          <span>{dog.dogInfo.gender}</span>
           Age: {dog.dogInfo.age}
        </p>
      </div>
    ))}
    </div>
    </div>
    </>
  )
}

export default Dog