import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

const reducer = combineReducers({
  notes: notesReducer,
});

const setupStore = () =>
  configureStore({
    reducer,
  });

export type RootState = ReturnType<typeof reducer>;

export default setupStore;
