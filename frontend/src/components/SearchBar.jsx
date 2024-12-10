import React, { useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = forwardRef(({ onSearch, ...props }, ref) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (onSearch) {
      onSearch(value); // Invoke the search callback with the current input value
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
      <TextField
        label="Search"
        variant="standard"
        value={value}
        onChange={handleChange}
        inputRef={ref} // Still forwarding the ref if needed
        fullWidth
        {...props}
      />
    </form>
  );
});

export default SearchBar;
