import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import useNoteContext from "./useNoteContext"; // Import useNoteContext hook

const NoteEditor = () => {
  const { addNote, updateNote } = useNoteContext(); // Use useNoteContext hook to access context functions
  const [note, setNote] = useState({ header: "", content: "", star: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      ...note,
      id: Math.floor(Date.now() / 1000), // Generate unique ID based on current time in seconds
    };
    if (newNote.id) {
      addNote(newNote); // Add the new note
    } else {
      updateNote(newNote); // Update the existing note
    }
    setNote({ header: "", content: "", star: 0 });
  };

  return (
    <div className="note-editor">
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
        />
        <Button type="submit" variant="contained" color="primary">
          Add Note
        </Button>
      </form>
    </div>
  );
};

export default NoteEditor;
