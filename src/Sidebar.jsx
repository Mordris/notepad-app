// Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment"; // Import moment library for date formatting

function Sidebar({ isOpen, onClose, notes, onNoteClick }) {
  const handleNoteClick = (note) => {
    onNoteClick(note); // Pass the selected note to the parent component
  };

  return (
    <Drawer open={isOpen} onClose={onClose} variant="persistent">
      <div style={{ width: "300px" }}>
        {" "}
        {/* Adjust width of sidebar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <Typography variant="h6">Notes</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {notes.map((note) => (
            <ListItem
              key={note.id}
              button
              onClick={() => handleNoteClick(note)}
            >
              <ListItemText
                primary={note.header}
                secondary={`Last Updated: ${moment(note.lastUpdated).format(
                  "MMM DD, YYYY hh:mm A"
                )}`} // Format last updated date
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
