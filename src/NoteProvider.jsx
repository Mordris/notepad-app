import React, { useReducer, useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import Notification from "./Notification";

// Define initial state
const initialState = {
  notes: [], // Initial notes array
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "UPDATE_NOTE":
      const updatedNoteIndex = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      const updatedNotesAfterUpdate = [...state.notes];
      updatedNotesAfterUpdate[updatedNoteIndex] = action.payload;
      return { ...state, notes: updatedNotesAfterUpdate };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    dispatch({ type: "LOAD_NOTES", payload: savedNotes });
  }, []);

  const addNote = (note) => {
    const newNote = {
      ...note,
      createdAt: new Date().getTime(), // Store creation time
      lastUpdated: new Date().getTime(), // Initialize last updated time
    };
    const updatedNotes = [...state.notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    dispatch({ type: "ADD_NOTE", payload: newNote });
    setNotification("Note added successfully!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const updateNote = (note) => {
    const updatedNoteIndex = state.notes.findIndex(
      (existingNote) => existingNote.id === note.id
    );
    const updatedNote = {
      ...note,
      lastUpdated: new Date().getTime(), // Update last updated time
    };
    const updatedNotesAfterUpdate = [...state.notes];
    updatedNotesAfterUpdate[updatedNoteIndex] = updatedNote;
    localStorage.setItem("notes", JSON.stringify(updatedNotesAfterUpdate));
    dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    setNotification("Note updated successfully!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const deleteNote = (id) => {
    const updatedNotesAfterDelete = state.notes.filter(
      (note) => note.id !== id
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotesAfterDelete));
    dispatch({ type: "DELETE_NOTE", payload: id });
    setNotification("Note deleted successfully!");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <NoteContext.Provider
      value={{ notes: state.notes, addNote, updateNote, deleteNote }}
    >
      {notification && <Notification message={notification} />}
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
