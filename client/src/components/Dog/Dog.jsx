import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Menu, MenuItem, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { motion } from 'framer-motion';
import './dog.css';
import { scrollToTop } from '../../helpers/scrollToTop';

function Dog() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredDogs, setFilteredDogs] = useState([])
  const navigate = useNavigate();

  const filterMapping = {
    '{"goodwCat": true}': "Cat Friendly",
    '{"goodwDog": true}': "Dog Friendly",
    '{"gender": "Male"}': "Male",
    '{"gender": "Female"}': "Female",
    '{"goodwKid": true}': "Kid Friendly",
    '{"ageRange": [0, 1]}': "0-1 yrs old",
    '{"ageRange": [2, 5]}': "2-5 yrs old",
    '{"ageRange": [1, 2]}': "1-2 yrs old",
    '{"ageRange": [6, 10]}': "6-10 yrs old",
    '{"ageRange": [11, 50]}': "11+ yrs old",
    '{"weightRange": [1, 10]}': "1-10 lbs",
    '{"weightRange": [11, 25]}': "11-25 lbs",
    '{"weightRange": [26, 50]}': "25-50 lbs",
    '{"weightRange": [51, 70]}': "51-70 lbs",
    '{"weightRange": [71, 400]}': "70+ lbs",
  }

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

  useEffect(() => {
    scrollToTop()
  },[])


  useEffect(() => {
    // Filtering + updating the dog data
    const filtered = dogs && dogs.filter((dog) => {
      return filters.every((filter) => {
        const filterObj = JSON.parse(filter); // Turns the string into an object
        if (filterObj.hasOwnProperty('ageRange')) {
          // Handle age range filters
          const [minAge, maxAge] = filterObj.ageRange;
          return dog.age >= minAge && dog.age < maxAge;
        } else if (filterObj.hasOwnProperty('weightRange')) {
          // Handle weight range filters
          const [minWeight, maxWeight] = filterObj.weightRange;
          return dog.weight >= minWeight && dog.weight <= maxWeight;
        } else {
          // Handle other filters
          return Object.entries(filterObj).every(([key, value]) => dog[key] === value);
        }
      });
    });
  
    setFilteredDogs(filtered);
  }, [dogs, filters]);

  const bannerSwitch = (dog) => {
    if (dog.adoptionStatus === 'pending') return 'pending-card'
    if (dog.sponsorshipStatus) return 'sponsored-card'
    return undefined
  }

  const displayBanner = (dog) => {
    if (dog.adoptionStatus === "pending") return 'PENDING ADOPTION!'
    if (dog.sponsorshipStatus) return 'SPONSORED!'
  }

  const displayDogs = () => {
    return (
      dogs && filteredDogs.map((dog) => (
        <div className={`dog-card ${bannerSwitch(dog)}`} key={dog._id} onClick={() => {getOneDog(dog)}}>
          {bannerSwitch(dog) && <div className={`head-${bannerSwitch(dog)}`}>{displayBanner(dog)}</div>}
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
      ))
    );
  };

  // handles moving to the DisplayOne page when a dog is selected 
  const getOneDog = (dog) => {
    setSelectedDog(dog)
    navigate('/display-one', {state: dog})
  }

  const handleFilterChange = (event) => {
    const filterValue = event.target.value

    if (event.target.checked) {
      // Add filter to the array if checkbox is checked
      setFilters((prevFilters) => [...prevFilters, filterValue]);
    } else {
      // Remove filter from the array if checkbox is unchecked
      setFilters((prevFilters) => prevFilters.filter((filter) => filter !== filterValue));
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const displayChips = () => {
    return (
      <>
        {/* Filter Chips */}
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filterMapping[filter]}
            onDelete={() => handleFilterChange({ target: { checked: false, value: filter } })}
          />
        ))}
      </>
    );
  }

  const displayFilters = () => {
    return (
      <div>
        {/* Filter Dropdown */}
        <IconButton onClick={handleMenuClick}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >

          {/* Gender: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Gender:</div>
            {/* Female */}
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"gender": "Female"}')} />}
              label="Female"
              value='{"gender": "Female"}'
              onChange={handleFilterChange}
            />
            {/* Male */}
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"gender": "Male"}')} />}
              label="Male"
              value='{"gender": "Male"}'
              onChange={handleFilterChange}
            />
          </MenuItem>

          {/* Age: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Age:</div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes(`{"ageRange": [0, 1]}`)}
                  onChange={handleFilterChange}
                  value={`{"ageRange": [0, 1]}`}
                />
              }
              label="0-1 yr"
            />

<FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"ageRange": [1, 2]}')}
                  onChange={handleFilterChange}
                  value={`{"ageRange": [1, 2]}`}
                />
              }
              label="1-2 yrs"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes(`{"ageRange": [2, 5]}`)}
                  onChange={handleFilterChange}
                  value={`{"ageRange": [2, 5]}`}
                />
              }
              label="2-5 yrs"
            />
    
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes(`{"ageRange": [6, 10]}`)}
                  onChange={handleFilterChange}
                  value={`{"ageRange": [6, 10]}`}
                />
              }
              label="6-10 yrs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"ageRange": [11, 50]}')}
                  onChange={handleFilterChange}
                  value={`{"ageRange": [11, 50]}`}
                />
              }
              label="11+ yrs"
            />
          </MenuItem>

          {/* Weight: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Weight:</div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"weightRange": [1, 10]}')}
                  onChange={handleFilterChange}
                  value={`{"weightRange": [1, 10]}`}
                />
              }
              label="1-10 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"weightRange": [11, 25]}')}
                  onChange={handleFilterChange}
                  value={`{"weightRange": [11, 25]}`}
                />
              }
              label="11-25 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"weightRange": [26, 50]}')}
                  onChange={handleFilterChange}
                  value={`{"weightRange": [26, 50]}`}
                />
              }
              label="26-50 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"weightRange": [51, 70]}')}
                  onChange={handleFilterChange}
                  value={`{"weightRange": [51, 70]}`}
                />
              }
              label="51-70 lbs"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.includes('{"weightRange": [71, 400]}')}
                  onChange={handleFilterChange}
                  value={`{"weightRange": [71, 400]}`}
                />
              }
              label="70+ lbs"
            />
          </MenuItem>

          {/* Friendly With: ------------------------------------------------ */}
          <MenuItem>
            <div className='attr-label'>Friendly With:</div>
            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwCat": true}')} />}
              label="Cats"
              value='{"goodwCat": true}'
              onChange={handleFilterChange}
            />

            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwDog": true}')} />}
              label="Dogs"
              value='{"goodwDog": true}'
              onChange={handleFilterChange}
            />

            <FormControlLabel
              control={<Checkbox checked={filters.includes('{"goodwKid": true}')} />}
              label="Kids"
              value='{"goodwKid": true}'
              onChange={handleFilterChange}
            />
          </MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <>
      <div className='contain-home'>
        <div className='adopt-msg'>
        <div className='dark-overlay'></div>
        <motion.h1
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ duration: 1.2 }}
        >
          Ready to<br/>Adopt?
      </motion.h1>
        </div>
        { <h1 className='welcome-msg'>Meet Our Dogs</h1>}
        { <div className='filter-label'>{displayFilters()} Filter</div>}
        <div id='chip-box'>
          { displayChips()}
        </div>
        <div className='dog-container'>
          {displayDogs()}
        </div>
      </div>
    </>
  );
}

export default Dog;