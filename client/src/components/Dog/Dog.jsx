import React, { useState, useEffect } from 'react'
import { Chip, Menu, MenuItem, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import './dog.css'

function Dog() {
  const [dogs, setDogs ] = useState([])
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredDogs, setFilteredDogs] = useState([])

  const filterMapping = {
    '{"goodwCat": true}': 'Cat Friendly',
    '{"goodwDog": true}': 'Dog Friendly',
    '{"gender": "Male"}': 'Male',
    '{"gender": "Female"}': 'Female',
    '{"goodwKid": true}': 'Kid Friendly',
    '{"minAge": 3, "maxAge": 5}': '3-5 years old',
    '{"minAge": 1, "maxAge": 2}': '1-2 years old',
    '{"minAge": 6, "maxAge": 10}': '6-10 years old',
    '{"minAge": 11, "maxAge": 50}': '11+ years old',
    '{"minWeight": 1, "maxWeight": 10}': '1-10 lbs',
    '{"minWeight": 11, "maxWeight": 25}': '11-25 lbs',
    '{"minWeight": 26, "maxWeight": 50}': '25-50 lbs',
    '{"minWeight": 51, "maxWeight": 70}': '51-70 lbs',
    '{"minWeight": 71, "maxWeight": 400}': '70+ lbs',
  }

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

  useEffect(() => { // Filtering + updating the dog data
    const filtered = dogs && dogs.filter((dog) => {
      return filters.every((filter) => {
        const filterObj = JSON.parse(filter) // Turns the string into an object
        if (filterObj.minAge && filterObj.maxAge) {
          // Handle age range filters
          return dog.age >= filterObj.minAge && dog.age <= filterObj.maxAge
        } else if (filterObj.minWeight && filterObj.maxWeight) {
          return dog.weight >= filterObj.minWeight && dog.weight <= filterObj.maxWeight
        } else {
          // Handle other filters
          return Object.entries(filterObj).every(([key, value]) => dog[key] === value)
        }
      })
    })

   setFilteredDogs(filtered)
  }, [dogs, filters])

  const displayDogs = () => {
    return (
      dogs && filteredDogs.map((dog) => ( 
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

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;

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
                    checked={filters.includes('{"minAge": 1, "maxAge": 2}')}
                    onChange={handleFilterChange}
                    value='{"minAge": 1, "maxAge": 2}'
                  />
                }
                label="1-2 yrs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minAge": 3, "maxAge": 5}')}
                    onChange={handleFilterChange}
                    value='{"minAge": 3, "maxAge": 5}'
                  />
                }
                label="3-5 yrs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minAge": 6, "maxAge": 10}')}
                    onChange={handleFilterChange}
                    value='{"minAge": 6, "maxAge": 10}'
                  />
                }
                label="6-10 yrs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minAge": 11, "maxAge": 50}')}
                    onChange={handleFilterChange}
                    value='{"minAge": 11, "maxAge": 50}'
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
                    checked={filters.includes('{"minWeight": 1, "maxWeight": 10}')}
                    onChange={handleFilterChange}
                    value='{"minWeight": 1, "maxWeight": 10}'
                  />
                }
                label="5-10 lbs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minWeight": 11, "maxWeight": 25}')}
                    onChange={handleFilterChange}
                    value='{"minWeight": 11, "maxWeight": 25}'
                  />
                }
                label="11-25 lbs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minWeight": 26, "maxWeight": 50}')}
                    onChange={handleFilterChange}
                    value='{"minWeight": 26, "maxWeight": 50}'
                  />
                }
                label="26-50 lbs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minWeight": 51, "maxWeight": 70}')}
                    onChange={handleFilterChange}
                    value='{"minWeight": 51, "maxWeight": 70}'
                  />
                }
                label="51-70 lbs"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.includes('{"minWeight": 71, "maxWeight": 400}')}
                    onChange={handleFilterChange}
                    value='{"minWeight": 71, "maxWeight": 400}'
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
    <div id='contain-home'>
    <h1 id='welcome-msg'>Meet Our Dogs</h1>
    <div className='filter-label'>{displayFilters()} Filter</div> 
    <div id='chip-box'>
     {displayChips()}
      </div>
      <div id='dog-container'>
      {displayDogs()}
      </div>
    </div>
    </>
  )
}

export default Dog