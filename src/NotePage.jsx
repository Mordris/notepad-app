// NotePage.jsx
import React, { useState } from "react";
import {
  Typography,
  IconButton,
  makeStyles,
  TextField,
  Button,
  ListItemIcon,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import useNoteContext from "./useNoteContext";
import SaveToDevice from "./SaveToDevice";

const useStyles = makeStyles((theme) => ({
  typography: {
    marginBottom: theme.spacing(2),
    display: "block",
    marginRight: theme.spacing(2),
  },
  orangeStar: {
    color: "orange",
  },
}));

const NotePage = ({ notes, note, onClose }) => {
  const classes = useStyles();
  const { updateNote, deleteNote } = useNoteContext();
  const [editing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    header: note.header,
    content: note.content,
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({ ...editedNote, [name]: value });
  };

  const handleSubmit = () => {
    const updatedNote = {
      ...note,
      header: editedNote.header,
      content: editedNote.content,
      lastUpdated: new Date().getTime(), // Update last updated time
    };
    console.log("Updated Note:", updatedNote); // Log updated note
    updateNote(updatedNote);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteNote(note.id);
    onClose();
  };

  const handleStarToggle = () => {
    const updatedNote = { ...note, starred: !note.starred };
    updateNote(updatedNote);
  };

  return (
    <div>
      {editing ? (
        <div>
          <TextField
            label="Note Title"
            name="header"
            value={editedNote.header}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Note Content"
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            minRows={10}
            required
          />
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom className={classes.typography}>
            {note.header}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.typography}
          >
            {note.content}
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.typography}
          >
            First Created: {new Date(note.createdAt).toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.typography}
          >
            Last Updated: {new Date(note.lastUpdated).toLocaleString()}
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            className={classes.typography}
          >
            Star: {note.starred ? "Starred" : "Not Starred"}
          </Typography>
          <IconButton onClick={handleEditToggle}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleStarToggle}>
            {note.starred ? (
              <StarIcon className={classes.orangeStar} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
          <SaveToDevice notes={notes} filename={note.header} />{" "}
        </div>
      )}
    </div>
  );
};

export default NotePage;
