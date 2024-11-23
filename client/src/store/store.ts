import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../reducers/authReducer.ts";
import errorReducer from "../reducers/errorReducer.ts";

const store = configureStore({
  reducer: {
    isAuthenticated:authReducer,
    error: errorReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

