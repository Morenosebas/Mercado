import { configureStore } from "@reduxjs/toolkit";
import { persistedState, reducer } from "./slice/user";

export const store = configureStore({
  reducer: {
    session: reducer,
  },
  preloadedState: persistedState,
});
