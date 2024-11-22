import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/authReducer.ts";

const store = configureStore({
  reducer: {
    isAuthenticated:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

