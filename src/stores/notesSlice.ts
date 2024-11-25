import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  time: string;
}

const notesSlice = createSlice({
  name: "notes",
  initialState: [] as Note[],
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((note) => note.id === action.payload);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const { id, title, content, summary, time } = action.payload;
      const note = state.find((note) => note.id === id);

      if (note) {
        note.title = title;
        note.content = content;
        note.summary = summary;
        note.time = time;
      }
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export default notesSlice.reducer;
