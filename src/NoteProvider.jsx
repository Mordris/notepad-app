// NoteProvider.jsx
import React, { useReducer, useEffect } from "react";
import NoteContext from "./NoteContext";

const initialState = {
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      const newNote = {
        ...action.payload,
        createdAt: new Date().getTime(), // Store creation time
        lastUpdated: new Date().getTime(), // Initialize last updated time
      };
      const updatedNotes = [...state.notes, newNote];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes };
    case "UPDATE_NOTE":
      const updatedNoteIndex = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      const updatedNote = {
        ...action.payload,
        lastUpdated: new Date().getTime(), // Update last updated time
      };
      const updatedNotesAfterUpdate = [...state.notes];
      updatedNotesAfterUpdate[updatedNoteIndex] = updatedNote;
      localStorage.setItem("notes", JSON.stringify(updatedNotesAfterUpdate));
      return { ...state, notes: updatedNotesAfterUpdate };
    case "DELETE_NOTE":
      const updatedNotesAfterDelete = state.notes.filter(
        (note) => note.id !== action.payload
      );
      localStorage.setItem("notes", JSON.stringify(updatedNotesAfterDelete));
      return { ...state, notes: updatedNotesAfterDelete };
    default:
      return state;
  }
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    dispatch({ type: "LOAD_NOTES", payload: savedNotes });
  }, []);

  const addNote = (note) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const updateNote = (note) => {
    dispatch({ type: "UPDATE_NOTE", payload: note });
  };

  const deleteNote = (id) => {
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  return (
    <NoteContext.Provider
      value={{ notes: state.notes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
