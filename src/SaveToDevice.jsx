import React from 'react';
import { Button } from '@material-ui/core';

function SaveToDevice() {
  const handleSave = () => {
    // Functionality to save notes to device as a txt file
  };

  return (
    <div className="save-to-device">
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save to Device
      </Button>
    </div>
  );
}

export default SaveToDevice;
