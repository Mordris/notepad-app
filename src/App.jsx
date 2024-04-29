// App.jsx
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NoteEditor from "./NoteEditor";
import Search from "./Search";
import SaveToDevice from "./SaveToDevice";
import NotePage from "./NotePage"; // Import NotePage component
import { Container } from "@material-ui/core";
import useNoteContext from "./useNoteContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar closed by default
  const { notes } = useNoteContext();
  const [selectedNote, setSelectedNote] = useState(null); // State to manage selected note

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false); // Close sidebar when clicked away
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note); // Set the selected note
  };

  const handleCloseNotePage = () => {
    setSelectedNote(null); // Close the note page
  };

  return (
    <div className="app">
      <Header toggleSidebar={handleSidebarToggle} />

      <Container className="app__body">
        <div className="app__container" onClick={handleSidebarClose}>
          <Sidebar
            isOpen={sidebarOpen}
            notes={notes}
            onNoteClick={handleNoteClick}
          />
          {selectedNote ? ( // Render NotePage if a note is selected
            <NotePage note={selectedNote} onClose={handleCloseNotePage} />
          ) : (
            // Otherwise, render NoteEditor
            <NoteEditor />
          )}
        </div>
      </Container>
      <Search />
      <SaveToDevice />
    </div>
  );
}

export default App;
