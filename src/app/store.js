import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// reducers
import sessionSlice from "../features/sessionSlice";

const store = configureStore({
  reducer: {
    session: sessionSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
