import React, { useState, useEffect } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import './dog.css';

function Dog() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    const getDogs = async () => {
      const url = "http://127.0.0.1:4000/dog/";
      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });

      const data = await response.json();
      setDogs(data);
    };

    getDogs();
  }, []);

  const displayDogDetails = (dog) => {
    setSelectedDog(dog);
  };

  const handleBackToAllDogs = () => {
    setSelectedDog(null);
  }

  const renderGenderIcon = (gender) => {
    return gender === "Female" ? <FemaleIcon /> : <MaleIcon />
  }

  const renderDogDetails = () => {
    if (selectedDog) {
      return (
        <div id='one-dog-container'>
          <div id='button-container'>
            <button onClick={handleBackToAllDogs} id='back-to-all-dogs-btn'>Back to All Dogs</button>
          </div>
          <div id='dog-details-container'>
            <div id='img-dog-container'>
              <img src={selectedDog.image} alt={selectedDog.name} />
            </div>
            <div id='dog-details'>
              <h1>{selectedDog.name}</h1>
              <div id='basic-info'>
                <h3>Age: {selectedDog.age}</h3>
                <div id='dog-gender'>
                  {renderGenderIcon(selectedDog.gender)}
                  <h3>{selectedDog.gender}</h3>
                </div>
              </div>
              <p>
                Bio: {selectedDog.bio}
              </p>
              {/* Add any other additional information you want to display here */}
            </div>
          </div>
        </div>

      );
    }
    return null;
  };

  const displayDogs = () => {
    return (
      dogs && dogs.map((dog) => (
        <div id='dog-card' key={dog._id} onClick={() => displayDogDetails(dog)}>
          <div id='img-container'>
            <img src={dog.image} alt={dog.name} />
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
    );
  };

  return (
    <>
      <div id='contain-home'>
        {!selectedDog && <h1 id='welcome-msg'>Meet Our Dogs</h1>}
        <div id='dog-container'>
          {renderDogDetails()}
          {!selectedDog && displayDogs()}
        </div>
      </div>
    </>
  );
}

export default Dog;
