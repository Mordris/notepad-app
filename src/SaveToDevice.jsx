// SaveToDevice.jsx
import React from "react";
import { Button } from "@material-ui/core";

const SaveToDevice = ({ notes, filename }) => {
  const formatNotes = () => {
    return notes
      .map((note) => `${note.header}\n\n${note.content}`)
      .join("\n\n\n");
  };

  const handleSave = () => {
    const text = formatNotes(); // Format notes as desired
    const blob = new Blob([text], { type: "text/plain" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${filename}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleSave}>
      Save to Device
    </Button>
  );
};

export default SaveToDevice;
