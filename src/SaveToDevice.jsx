import React from "react";
import { Button } from "@material-ui/core";

const SaveToDevice = ({ content, filename }) => {
  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });
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
