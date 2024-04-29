// App.jsx
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteEditor from "./NoteEditor";
import SaveToDevice from "./SaveToDevice";
import NotePage from "./NotePage";
import { Container } from "@material-ui/core";
import useNoteContext from "./useNoteContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { notes, updateNote } = useNoteContext();
  const [selectedNote, setSelectedNote] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (selectedNote) {
      const updatedNote = notes.find((note) => note.id === selectedNote.id);
      setSelectedNote(updatedNote);
    }
  }, [notes, selectedNote]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNotePage = () => {
    setSelectedNote(null);
  };

  const handleSearch = (query) => {
    const filteredNotes = notes.filter(
      (note) =>
        note.header.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  };

  const handleSave = () => {
    // Pass notes to SaveToDevice component for saving
  };

  return (
    <div className="app">
      <Header
        toggleSidebar={handleSidebarToggle}
        onSearch={handleSearch}
        onSave={handleSave} // Pass onSave handler to Header component
      />
      <Container className="app__body">
        <div className="app__container" onClick={handleSidebarClose}>
          <Sidebar
            isOpen={sidebarOpen}
            notes={filteredNotes.length > 0 ? filteredNotes : notes} // Use filteredNotes if it's not empty, otherwise use all notes
            onNoteClick={handleNoteClick}
          />

          {selectedNote ? (
            <NotePage
              notes={notes}
              note={selectedNote}
              onClose={handleCloseNotePage}
              updateNote={updateNote} // Pass updateNote function to NotePage
            />
          ) : (
            <NoteEditor />
          )}
        </div>
      </Container>
      {/* Pass notes to SaveToDevice component */}
    </div>
  );
}

export default App;
