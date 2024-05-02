import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import useNoteContext from "./useNoteContext";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles((theme) => ({
  noteEditor: {
    position: "relative",
  },
  uploadButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const NoteEditor = () => {
  const { addNote, updateNote } = useNoteContext();
  const [note, setNote] = useState({ header: "", content: "", star: 0 });
  const [uploadedContent, setUploadedContent] = useState("");
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result.trim(); // Trim content before appending
        setUploadedContent(content); // Store uploaded content
        setNote((prevNote) => ({
          ...prevNote,
          content: prevNote.content + "\n" + content, // Always add a new line before appending content
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      ...note,
      id: Math.floor(Date.now() / 1000),
    };
    if (newNote.id) {
      addNote(newNote);
    } else {
      updateNote(newNote);
    }
    setNote({ header: "", content: "", star: 0 });
    setUploadedContent("");
  };

  return (
    <div className={classes.noteEditor}>
      <Typography variant="h5" gutterBottom>
        Note Editor
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Note Title"
          name="header"
          value={note.header}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Note Content"
          name="content"
          value={note.content}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          minRows={10}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <input
                  accept=".txt"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleUpload}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="default"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}
                  >
                    Upload
                  </Button>
                </label>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Note
        </Button>
      </form>
    </div>
  );
};

export default NoteEditor;
