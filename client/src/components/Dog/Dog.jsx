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
            <button onClick={handleBackToAllDogs} id='back-to-all-dogs-btn'>Back</button>
          </div>
          <div id='dog-details-container'>
            <div id='img-dog-container'>
              <img src={selectedDog.image} alt={selectedDog.name} />
            </div>
            <div id='dog-details'>
              <h1>{selectedDog.name}</h1>
              <section id='basic-info'>
                <p>Age {selectedDog.age}</p>
                <div id='dog-gender'>
                  {renderGenderIcon(selectedDog.gender)}
                  <p>{selectedDog.gender}</p>
                </div>
              </section>
              <section id='additional-info'>
                <p>Bio: <span>{selectedDog.bio}</span></p>
                <p>Energy Level: <span>{selectedDog.energyLevel}</span></p>
                <div>
                  <h4>Family-Friendly Traits</h4>
                  <p>Other dogs: <span>{selectedDog.goodwDog ? 'yes' : '-'}</span></p>
                  <p>Cats: <span>{selectedDog.goodwCat ? 'yes' : '-'}</span></p>
                  <p>Children: <span>{selectedDog.goodwKid ? 'yes' : '-'}</span></p>
                </div>
                <div>
                  <h4>Training and Behavior</h4>
                  <p>Crate Trained: <span>{selectedDog.crateTrained ? 'yes' : 'No'}</span></p>
                  <p>House Trained: <span>{selectedDog.houseTrained ? 'yes' : 'No'}</span></p>
                  <p>Reactivity to Objects: <span>{selectedDog.objAggression ? 'yes' : 'No'}</span></p>
                </div>
                <div>
                  <h4>Special Needs</h4>
                  <p><span>{selectedDog.specialNeeds}</span></p>
                  <p><span>{selectedDog.specialNeedsDesc}</span></p>
                  <h4>Medication:</h4>
                  <p><span>{selectedDog.medication}</span></p>
                </div>
                <h4>Adoption Fee <span>{selectedDog.adoptionFee}</span></h4>
              </section>
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
