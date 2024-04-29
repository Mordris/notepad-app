// Sidebar.jsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  TextField,
  ListItemIcon,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import moment from "moment"; // Import moment library for date formatting

function Sidebar({ isOpen, onClose, notes, onNoteClick }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputClick = (e) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
  };

  const filteredNotes = searchQuery
    ? notes.filter((note) =>
        note.header.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

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
        <TextField
          label="Search notes..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchInputChange}
          onClick={handleSearchInputClick} // Prevent the click event from bubbling up
          style={{ marginBottom: "8px" }}
        />
        <List>
          {filteredNotes.map((note) => (
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
              <ListItemIcon>
                {note.starred ? (
                  <StarIcon style={{ color: "orange" }} />
                ) : (
                  <StarBorderIcon />
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default Sidebar;
