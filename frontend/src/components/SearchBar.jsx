import React, { useState, forwardRef, useContext } from 'react';
import TextField from '@mui/material/TextField';
import ItemsContext from '../contexts/ItemsContext';

const SearchBar = forwardRef(({ onSearch, ...props }, ref) => {
  const [value, setValue] = useState('');
  const items = useContext(ItemsContext);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    if (onSearch) {
      const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      onSearch(filteredItems); // Invoke the search callback with filtered items
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
      <TextField
        label="Search"
        variant="standard"
        value={value}
        onChange={handleChange}
        inputRef={ref}
        fullWidth
        {...props}
      />
    </form>
  );
});

export default SearchBar;
