import React, { forwardRef } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = forwardRef((props, ref) => (
  <TextField
    label="Search"
    variant="standard"
    inputRef={ref}  // Attach the ref here
    {...props}
    style={{ width: '100%', maxWidth: '600px' }}
  />
));

export default SearchBar;