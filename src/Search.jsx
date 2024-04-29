import React from 'react';
import { TextField } from '@material-ui/core';

function Search() {
  return (
    <div className="search">
      <TextField label="Search notes..." variant="outlined" fullWidth />
    </div>
  );
}

export default Search;
