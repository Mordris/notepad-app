// useNoteContext.jsx

import { useContext } from "react";
import NoteContext from "./NoteContext";

const useNoteContext = () => {
  return useContext(NoteContext);
};

export default useNoteContext;
