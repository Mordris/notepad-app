// Note.jsx
import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import useNoteContext from "./useNoteContext"; // Import useNoteContext hook

const Note = ({ note }) => {
  const { updateNote } = useNoteContext(); // Use useNoteContext hook to access context functions

  const handleStarClick = () => {
    const updatedNote = { ...note, star: note.star < 3 ? note.star + 1 : 0 }; // Toggle star rating
    updateNote(updatedNote); // Update note with new star rating
  };

  const renderStarIcon = () => {
    switch (note.star) {
      case 1:
        return <StarIcon color="primary" />;
      case 2:
        return <StarIcon color="secondary" />;
      case 3:
        return <StarIcon color="action" />;
      default:
        return <StarIcon />;
    }
  };

  return (
    <ListItem button>
      <ListItemText
        primary={note.header}
        secondary={`Last Updated: ${new Date(
          note.lastUpdated
        ).toLocaleString()}`}
      />
      <ListItemSecondaryAction>
        <Tooltip title="Toggle Star">
          <IconButton onClick={handleStarClick}>{renderStarIcon()}</IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Note;
