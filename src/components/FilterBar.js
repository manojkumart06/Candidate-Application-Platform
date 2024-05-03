
import React from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { setFilters } from '../Redux/Actions/fetchAction';

const FilterBar = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleApplyFilters = () => {
    
  };

  return (
    <div>
      <TextField name="minExperience" label="Min Experience" onChange={handleChange} />
      {}
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterBar;
