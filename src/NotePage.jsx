import React from "react";
import { Typography, IconButton, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useNoteContext from "./useNoteContext";

const useStyles = makeStyles((theme) => ({
  typography: {
    marginBottom: theme.spacing(2), // Add margin bottom between typographies
    display: "block",
    marginRight: theme.spacing(2), // Add margin right between typographies
  },
}));

const NotePage = ({ note, onClose }) => {
  const classes = useStyles();
  const { updateNote, deleteNote } = useNoteContext(); // Use useNoteContext hook to access context functions

  const handleEdit = () => {
    // Implement edit functionality
  };

  const handleDelete = () => {
    deleteNote(note.id); // Delete the note
    onClose(); // Close the note page
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom className={classes.typography}>
        {note.header}
      </Typography>
      <Typography variant="body1" gutterBottom className={classes.typography}>
        {note.content}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.typography}>
        First Created: {new Date(note.createdAt).toLocaleString()}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.typography}>
        Last Updated: {new Date(note.lastUpdated).toLocaleString()}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.typography}>
        Star: {note.star}
      </Typography>
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default NotePage;
