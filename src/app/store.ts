// src/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";

const store = configureStore({
  reducer: {
    projectState: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

