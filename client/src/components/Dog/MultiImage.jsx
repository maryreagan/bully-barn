import React, {useEffect, useState} from 'react'
import './MultiImage.css'

function MultiImage() {
    const [dogs, setDogs] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            console.log(data)
            setDogs(data);
        };

        getDogs();
        }, []);

        const handlePreviousImage = () => {
            setCurrentImageIndex((prevIndex) => prevIndex -1)
        }

        const handleNextImage = () => {
            setCurrentImageIndex((prevIndex) => prevIndex +1)
        }

        const displayDogs = () => {
            return (
            dogs.map((dog) => (
                <div key={dog._id}>
                    <div className='img-container'>
                    <img id='dog-image' src={dog.image} alt={dog.name} />
                    </div>
                    {dog.multipleImages && dog.multipleImages.map((url, index) => (
                    <div className='img-container' key={index} style={{display:index === currentImageIndex ? 'block' : 'none'}}>
                        <img id='multi-image' src={url} alt={`Dog ${index + 1}`} />
                    </div>
                    ))}
                </div>
                ))
            );
            };


    return (
        <div>
            {displayDogs()}
            <button onClick={handlePreviousImage} disabled={currentImageIndex === 0} >
                Previous
            </button>

            <button onClick={handleNextImage} disabled={currentImageIndex === dogs.length -1}>
                Next
            </button>
        </div>
    )   
}

export default MultiImage